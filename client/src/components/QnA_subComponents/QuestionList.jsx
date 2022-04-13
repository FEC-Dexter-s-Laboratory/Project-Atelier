import React from 'react';
import axios from 'axios';
import {NavButton, Listcontainer, Linkbutton, Orderlist, Questionlist, Questiondiv, Innerquestiondiv} from './QnAStyledComponents.style.js';
import IndividualQuestion from './IndividualQuestion.jsx';
import Answerlist from './Answerlist.jsx';
import QuestionModal from './QuestionModal.jsx';
import AnswerModal from './AnswerModal.jsx';

class QuestionList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questionCount: 2,
      questions: [],
      Qmodalactive: false,
      Amodalactive: false,
      selectedQuestion: 0,
    };
    this.sortQuestions = this.sortQuestions.bind(this);
    this.handleQClick = this.handleQClick.bind(this);
    this.handleAModalClick = this.handleAModalClick.bind(this);
    this.handleQModalClick = this.handleQModalClick.bind(this);
    this.submitAnswer = this.submitAnswer.bind(this);
  }

  componentDidMount() {
    this.setState({
      questions: this.props.data.results,
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.search !== prevProps.search) {
      if (!this.props.search.length) {
        this.setState({
          questions: this.props.data.results,
        });
      } else {
        this.setState({
          questions: this.props.data.results.filter(obj => obj.question_body.toLowerCase().includes(this.props.search.toLowerCase())),
        });
      }
    }
    if (this.props.data !== prevProps.data) {
      this.setState({
        questions: this.props.data.results,
      });
    }
  }

  handleQClick (e) {
    e.preventDefault();
    this.setState({questionCount: this.state.questionCount += 2});
  }

  handleQModalClick (e) {
    e.preventDefault();
    this.setState({Qmodalactive: true});
  }

  handleAModalClick (qid) {
    this.setState({
      Amodalactive: true,
      selectedQuestion: qid,
    });
  }

  //sorting
  sortQuestions (questObj) {
    let sortedQuest = questObj.sort((a, b) => b.question_helpfulness - a.question_helpfulness);
    return sortedQuest.slice(0, this.state.questionCount);
  }

  //axios
  submitAnswer (answer) {
    axios.post('/qa/questions/:question_id/answers',
      answer,
      {
        params: {
          question_id: this.state.selectedQuestion
        }
      })
      .then(() => {
        this.setState({
          Amodalactive: false
        });
        alert('successfully posted your answer');
      })
      .catch(() => {
        alert('there was a problem with your request');
      });
  }

  render() {
    if (!this.state.questions.length) {
      return (
        <div>No Matching Results</div>
      );
    } else {
      return (
        <div>
          <Listcontainer>
            <Orderlist>
              {this.sortQuestions(this.state.questions).map((obj, index) =>{
                return (
                  <Questionlist key={obj.question_id}>
                    <IndividualQuestion body={obj.question_body} id={obj.question_id} help={obj.question_helpfulness} modalF={this.handleAModalClick} />
                    <Answerlist id={obj.question_id} />
                  </Questionlist>
                );
              })}
              <QuestionModal active={this.state.Qmodalactive} close={() => this.setState({Qmodalactive: false})} id={this.props.productid} />
              <AnswerModal active={this.state.Amodalactive} close={() => this.setState({Amodalactive: false})} submitAnswer={this.submitAnswer} />
            </Orderlist>
          </Listcontainer>
          {
            this.state.questions.length > this.state.questionCount
              ? <NavButton onClick={this.handleQClick}>MORE ANSWERED QUESTIONS</NavButton>
              : <button hidden='hidden' onClick={this.handleQClick}>MORE ANSWERED QUESTIONS</button>
          }
          <NavButton style={{float: 'right'}} onClick={()=> this.setState({Qmodalactive: true})}>ADD QUESTION</NavButton>
        </div>
      );
    }
  }
}
export default QuestionList;