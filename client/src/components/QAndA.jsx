import React from 'react';
import axios from 'axios';
import QuestionList from './QnA_subComponents/QuestionList.jsx';
import { QnAContainer, QnAHeader, SearchInput } from '././QnA_subComponents/QnAStyledComponents.style.js';

class QandA extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchKey: '',
      questionData: [],
    };
  }

  componentDidMount() {
    axios.get('/qa/questions', {
      params: {
        product_id: this.props.currentId,
      }
    })
      .then((res) => {
        this.setState({
          questionData: res.data
        });
      })
      .catch((err) => {
        console.log('err: ', err);
      });
  }
  componentDidUpdate(prevProps) {
    if (prevProps.currentId !== this.props.currentId) {
      axios.get('/qa/questions', {
        params: {
          product_id: this.props.currentId,
        }
      })
        .then((res) => {
          this.setState({
            questionData: res.data
          });
        })
        .catch((err) => {
          console.log('err: ', err);
        });
    }

  }

  handleChange (e) {
    e.preventDefault();
    if (e.target.value.length >= 3) {
      this.setState ({
        searchKey: e.target.value,
      });
    } else {
      this.setState({
        searchKey: '',
      });
    }
  }

  render () {
    if (Array.isArray(this.state.questionData)) {
      return (<div>Loading...</div>);
    } else {
      return (
        <QnAContainer>
          <QnAHeader>QUESTIONS &amp; ANSWERS</QnAHeader>
          <SearchInput type="search" onChange={this.handleChange.bind(this)} placeholder="Have a question? Search for answers…" />
          <QuestionList data={this.state.questionData} search={this.state.searchKey} productid={this.props.currentId} />
        </QnAContainer>
      );
    }
  }

}

export default QandA;