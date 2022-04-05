import React from 'react';
import questions from './QnA_subComponents/HardCodedData.js';
import IndividualQuestion from './QnA_subComponents/IndiviualQuestion.jsx';
import { QnAContainer, QnAHeader, SearchInput } from '././QnA_subComponents/QnAStyledComponents.style.js';

class QandA extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchKey: '',
    };
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
    return (
      <QnAContainer>
        <QnAHeader>QUESTIONS & ANSWERS</QnAHeader>
        <SearchInput type="search" onChange={this.handleChange.bind(this)} placeholder="Have a question? Search for answers…" />
        <IndividualQuestion data={questions} search={this.state.searchKey} />
      </QnAContainer>
    );
  }

}

export default QandA;
