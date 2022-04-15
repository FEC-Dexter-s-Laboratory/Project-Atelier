import React from 'react';
import axios from 'axios';
import IndividualAnswer from './IndividualAnswer.jsx';
import { Answernav } from './QnAStyledComponents.style.js';

class Answerlist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answersData: [],
      answerCount: 1,
    };
    this.sortAnswers = this.sortAnswers.bind(this);
    this.handleAClick = this.handleAClick.bind(this);
  }

  componentDidMount() {
    axios.get('/qa/questions/:question_id/answers', {
      params: {
        question_id: this.props.id,
        page: 1,
        count: 200,
      }
    })
      .then((res) => {
        this.setState({
          answersData: res.data.results
        });
        res.data.results.map((obj) => {
          let helpfulness = {};
          helpfulness[obj.answer_id] = obj.helpfulness;
          this.setState(helpfulness);
        });
      })
      .catch((err) => {
        console.log('err: ', err);
      });
  }

  //event handlers
  handleAClick (e) {
    e.preventDefault();
    this.setState({answerCount: this.state.answerCount += 1});
  }

  //sorting
  sortAnswers (ans) {
    let sortedAns = ans.sort((a, b) => {
      if (a.answerer_name === 'Seller') {
        return -1;
      }
      b.helpfulness - a.helpfulness;
    });

    return sortedAns.slice(0, this.state.answerCount);
  }

  render() {
    return (
      <div key={`a${this.props.id}`}>
        {this.sortAnswers(this.state.answersData).map((obj) => {
          return <IndividualAnswer photos={obj.photos} id={obj.answer_id} body={obj.body} name={obj.answerer_name} date={obj.date} help={obj.helpfulness} key={`1${obj.answer_id}`}/>;
        })
        }{
          this.state.answersData.length > this.state.answerCount
            ? <Answernav onClick={this.handleAClick}>MORE ANSWERS</Answernav>
            : <button hidden='hidden' onClick={this.handleAClick}>MORE ANSWERS</button>
        }
      </div>
    );
  }
}

export default Answerlist;