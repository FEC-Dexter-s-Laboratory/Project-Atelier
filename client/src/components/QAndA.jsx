import React, { useState, useRef } from 'react';
import styled from 'styled-components';

const QnAContainer = styled.div`
  border: 6px ridge darkblue;
  display: grid;
`;

const QnAHeader = styled.h1`
  font-size: 20px;
  font-weight: lighter;
`;

const SearchInput = styled.input`
  width: 100%;
`

function QAndA(props) {
  const searchRef = useRef(null);
  const [searchInp, setSearchInp] = useState("");

  return (
    <div className="QNA-Container">
      <QnAHeader>QUESTIONS & ANSWERS</QnAHeader>
      <SearchInput type="search" placeholder="Have a question? Search for answers…" ref={searchRef} />
    </div>
  );
}

export default QAndA;