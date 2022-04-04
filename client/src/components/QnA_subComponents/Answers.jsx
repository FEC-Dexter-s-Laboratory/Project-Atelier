import React from 'react';

class Answers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answerCount: 2,
    };
  }

  render() {
    return (<div>
      {this.props.ans.map((obj, index) =>{
        while (index < this.state.questionCount) {
          return (
            <div>
                Q: {obj.question_body} <span>Helpful? <Linkbutton>Yes</Linkbutton><span> ({obj.question_helpfulness}) | </span><Linkbutton>Add Answer</Linkbutton> </span>
              <Answers ans={obj.answers}/>
            </div>
          );
        }
      })}
    </div>);
  }
}

export default Answers;