import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import questions from './QnA_subComponents/HardCodedData.js';
import IndividualQuestion from './QnA_subComponents/IndiviualQuestion.jsx';

const QnAContainer = styled.div`
  margin-left: 20%;
  margin-right: 20%;
  display: grid;
`;

const QnAHeader = styled.h1`
  font-size: 15px;
  font-weight: lighter;
`;

const SearchInput = styled.input`
  width: 100%;
  height: 50px;
  font-weight: bold;
  background-image: url(https://cdn2.hubspot.net/hubfs/4004166/bioticresearch_website_assets/images/search_icon.png);
  background-repeat: no-repeat;
  background-position: right center;
`;

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
