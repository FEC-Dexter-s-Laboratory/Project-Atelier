import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

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

function QAndA(props) {
  const searchRef = useRef(null);
  const [searchInp, setSearchInp] = useState("");

  return (
    <QnAContainer>
      <QnAHeader>QUESTIONS & ANSWERS</QnAHeader>
      <SearchInput type="search" placeholder="Have a question? Search for answers…" ref={searchRef} />
    </QnAContainer>
  );
}

export default QAndA;