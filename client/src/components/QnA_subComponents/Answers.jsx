import React from 'react';
import moment from 'moment';
import styled from 'styled-components';

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

let sortedAns = [];

class Answers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answerCount: 2,
    };
  }

  componentDidMount() {
    sortedAns = Object.values(this.props.ans).sort((a, b) => b.helpfulness - a.helpfulness);
  }

  render() {
    return (<div>
      {sortedAns.map((obj, index) => {
        return (
          <div key={obj.id}>
            A: {obj.body} <br />
            by {obj.answerer_name}, {moment(obj.date).format('LL')} | Helpful? <Linkbutton>Yes</Linkbutton> ({obj.helpfulness}) | <Linkbutton>Report</Linkbutton>
          </div>
        );
      })}
    </div>);
  }
}

export default Answers;