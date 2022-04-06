import React from 'react';
import moment from 'moment';
import axios from 'axios';
import { Linkbutton, Orderlist, Questiondiv, Innerquestiondiv} from './QnAStyledComponents.style.js';


class IndividualQuestion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questionCount: 2,
      answerCount: 2,
      questions: [],
    };
    this.sortAnswers.bind(this);
    this.sortQuestions.bind(this);
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
  }

  handleQClick (e) {
    e.preventDefault();
    this.setState({questionCount: this.state.questionCount += 2});
  }

  handleAClick (e) {
    e.preventDefault();
    this.setState({answerCount: this.state.answerCount += 2});
  }

  sortQuestions (questObj) {
    return questObj.sort((a, b) => b.question_helpfulness - a.question_helpfulness);
  }

  sortAnswers (ansObj) {
    return Object.values(ansObj).sort((a, b) => {
      if (a.answerer_name === 'Seller') {
        return -1;
      }
      return b.helpfulness - a.helpfulness;
    });
  }

  render() {
    if (!this.state.questions.length) {
      return (
        <div>No Matching Results</div>
      );
    } else {
      return (
        <Orderlist>
          {this.sortQuestions(this.state.questions).map((obj, index) =>{
            while (index < this.state.questionCount) {
              return (
                <li key={obj.question_id}>
                  <Questiondiv>Q: {obj.question_body} <Innerquestiondiv>Helpful? <Linkbutton>Yes</Linkbutton> ({obj.question_helpfulness}) | <Linkbutton>Add Answer</Linkbutton></Innerquestiondiv></Questiondiv>
                  {this.sortAnswers(obj.answers).map((obj, index) => {
                    // while (index < this.state.answerCount) {
                    return (
                      <div key={obj.id}>
                        A: {obj.body} <br />
                        by {obj.answerer_name === 'Seller' ? (<b>{obj.answerer_name}</b>) : obj.answerer_name}, {moment(obj.date).format('LL')} | Helpful? <Linkbutton>Yes</Linkbutton> ({obj.helpfulness}) | <Linkbutton>Report</Linkbutton>
                        {

                        }
                      </div>
                    );
                    // }
                  })}
                </li>
              );
            }
          })}{
            this.state.questions.length > this.state.questionCount
              ? <button onClick={this.handleQClick.bind(this)}>MORE ANSWERED QUESTIONS</button>
              : <button hidden='hidden' onClick={this.handleQClick.bind(this)}>MORE ANSWERED QUESTIONS</button>
          }

        </Orderlist>
      );
    }
  }
}
export default IndividualQuestion;