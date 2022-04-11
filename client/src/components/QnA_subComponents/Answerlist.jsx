import React from 'react';
import axios from 'axios';
import moment from 'moment';
import { Linkbutton, Answerdiv } from './QnAStyledComponents.style.js';

class Answerlist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answersData: [],
      answerCount: 2,
    };
    this.sortAnswers = this.sortAnswers.bind(this);
    this.handleAreport = this.handleAreport.bind(this);
    this.handleAClick = this.handleAClick.bind(this);
    this.handleAhelp = this.handleAhelp.bind(this);
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
    this.setState({answerCount: this.state.answerCount += 2});
  }

  handleAreport (aid) {
    axios.put('/qa/answers/:answer_id/report',
      null,
      {
        params: {
          answer_id	: aid
        }
      }
    )
      .then(() => {
        console.log('success');
      });
  }

  handleAhelp (aid) {
    axios.put('/qa/answers/:answer_id/helpful',
      null,
      {
        params: {
          answer_id: aid
        }
      }
    )
      .then(() => {
        let helpObj = {};
        helpObj[aid] = this.state[aid] += 1;
        console.log(helpObj);
        this.setState( helpObj );
      });
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
        {this.sortAnswers(this.state.answersData).map((obj) => (
          <Answerdiv key={obj.answer_id}>
            A: {obj.body} <br />
            by {obj.answerer_name},
            {moment(obj.date).format('LL')}
            | Helpful?<Linkbutton onClick={() => { this.handleAhelp(obj.answer_id); }}>Yes</Linkbutton> ({obj.helpfulness})
            | <Linkbutton onClick={()=> { this.handleAreport(obj.answer_id); }}>Report</Linkbutton>
          </Answerdiv>
        ))
        }{
          this.state.answersData.length > this.state.answerCount
            ? <button onClick={this.handleAClick}>MORE ANSWERS</button>
            : <button hidden='hidden' onClick={this.handleAClick}>MORE ANSWERS</button>
        }
      </div>
    );
  }
}

export default Answerlist;