import React from 'react';
import axios from 'axios';
import { Listcontainer, Linkbutton, Orderlist, Questionlist, Questiondiv, Innerquestiondiv} from './QnAStyledComponents.style.js';
import Answerlist from './Answerlist.jsx';
import QuestionModal from './QuestionModal.jsx';
import AnswerModal from './AnswerModal.jsx';

class IndividualQuestion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questionCount: 2,
      questions: [],
      qhelpful: {},
      Qmodalactive: false,
      Amodalactive: false,
      answerid: '',
    };
    this.sortQuestions = this.sortQuestions.bind(this);
    this.handleQClick = this.handleQClick.bind(this);
    this.handleQhelp = this.handleQhelp.bind(this);
  }

  componentDidMount() {
    this.setState({
      questions: this.props.data.results,
    });
    this.props.data.results.map((obj) => {
      let helpfulness = {};
      helpfulness[obj.question_id] = obj.question_helpfulness;
      this.setState(helpfulness);
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

  //event handlers
  handleQClick (e) {
    e.preventDefault();
    this.setState({questionCount: this.state.questionCount += 2});
  }

  handleQhelp (qid) {
    axios.put('/qa/questions/:question_id/helpful',
      null,
      {
        params: {
          question_id: qid
        }
      }
    )
      .then(() => {
        let helpObj = {};
        helpObj[qid] = this.state[qid] += 1;
        this.setState( helpObj );
      });
  }

  //sorting
  sortQuestions (questObj) {
    let sortedQuest = questObj.sort((a, b) => b.question_helpfulness - a.question_helpfulness);
    return sortedQuest.slice(0, this.state.questionCount);
  }

  render() {
    if (!this.state.questions.length) {
      return (
        <div>No Matching Results</div>
      );
    } else {
      return (
        <Listcontainer>
          <Orderlist>
            {this.sortQuestions(this.state.questions).map((qobj, index) =>{
              return (
                <Questionlist key={qobj.question_id}>
                  <Questiondiv>Q: {qobj.question_body}
                    <Innerquestiondiv>Helpful? <Linkbutton onClick={() => { this.handleQhelp(qobj.question_id); }}>Yes</Linkbutton>
                    ({this.state[qobj.question_id]})
                    | <Linkbutton onClick={()=> this.setState({Amodalactive: true, answerid: qobj.question_id})}>Add Answer</Linkbutton>
                    </Innerquestiondiv></Questiondiv>
                  <Answerlist id={qobj.question_id} />
                </Questionlist>
              );
            })}{
              this.state.questions.length > this.state.questionCount
                ? <button onClick={this.handleQClick}>MORE ANSWERED QUESTIONS</button>
                : <button hidden='hidden' onClick={this.handleQClick}>MORE ANSWERED QUESTIONS</button>
            }
            <QuestionModal active={this.state.Qmodalactive} close={() => this.setState({Qmodalactive: false})} id={this.props.productid} />
            <AnswerModal active={this.state.Amodalactive} close={() => this.setState({Amodalactive: false})} id={this.state.answerid}/>
          </Orderlist>
          <button style={{float: 'right'}} onClick={()=> this.setState({Qmodalactive: true})}>Add Question</button>
        </Listcontainer>
      );
    }
  }
}
export default IndividualQuestion;