import React from 'react';
import styled from 'styled-components';
import Answers from './Answers.jsx';

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

class IndividualQuestion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questionCount: 2,
    };
  }

  handleClick (e) {
    e.preventDefault();
    this.setState({questionCount: this.state.questionCount += 2});
  }
  render() {
    return (
      <div>
        {this.props.data.results.map((obj, index) =>{
          while (index < this.state.questionCount) {
            return (
              <div>
                Q: {obj.question_body} <span>Helpful? <Linkbutton>Yes</Linkbutton><span> ({obj.question_helpfulness}) | </span><Linkbutton>Add Answer</Linkbutton> </span>
                <Answers ans={obj.answers}/>
              </div>
            );
          }
        })}
        <button onClick={this.handleClick.bind(this)}>MORE ANSWERED QUESTIONS</button>
      </div>
    );
  }
}
export default IndividualQuestion;