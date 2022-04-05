import React from 'react';
import styled from 'styled-components';
import moment from 'moment';

const Linkbutton = styled.button`
  font-family: "Verdana" sans-serif;
	font-size: 1em;
	text-align: left;
	color: blue;
	background: none;
	margin: 0;
	padding: 0;
	border: none;
	cursor: pointer;

`;

const Orderlist = styled.ol`
list-style-type: none;
`;

let sortedQuest = [];

class IndividualQuestion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questionCount: 2,
      answerCount: 2,
      questions: [],
      questIsActive: false,
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
    if (prevProps.search !== this.props.search) {
      this.setState({
        questions: this.props.data.results.filter(obj => obj.question_body.toLowerCase().includes(this.props.search.toLowerCase())),
      });
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
            return (
              <li key={obj.question_id}>
                  Q: {obj.question_body} Helpful? <Linkbutton>Yes</Linkbutton> ({obj.question_helpfulness}) | <Linkbutton>Add Answer</Linkbutton>
                {this.sortAnswers(obj.answers).map((obj, index) => {
                  return (
                    <div key={obj.id}>
                        A: {obj.body} <br />
                        by {obj.answerer_name}, {moment(obj.date).format('LL')} | Helpful? <Linkbutton>Yes</Linkbutton> ({obj.helpfulness}) | <Linkbutton>Report</Linkbutton>
                    </div>
                  );
                })}
              </li>
            );
          })}
          <button onClick={this.handleQClick.bind(this)}>MORE ANSWERED QUESTIONS</button>
        </Orderlist>
      );
    }
  }
}
export default IndividualQuestion;