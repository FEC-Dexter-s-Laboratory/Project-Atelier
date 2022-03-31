import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

// styles need adjusting, search input and button still on left despite using flexbox, needs to be adjusted, low priority
const DivContainer = styled.div`
  width: 100%;
  position: fixed;
  height: 5%;
  background-image: linear-gradient(to right, deepskyblue, cyan);
  display: flex;
`;

// styles need adjusting, search input and button still on left despite using flexbox, needs to be adjusted, low priority
const SearchInput = styled.input`
  justify-content: flex-end;
  border: 1px solid blue;
  border-radius: 12px;
`;

// styles need adjusting, search input and button still on left despite using flexbox, needs to be adjusted, low priority
const SearchButton = styled.button`
  background-image: url(https://st.depositphotos.com/1630589/4799/v/950/depositphotos_47996391-stock-illustration-magnifying-glass-icon.jpg);
  background-size: cover;
  background-position: center;
  width: 5%;
  height: 3%;
  justify-content: flex-end;
`

const Search = (props) => {
  const [searchTerm, setSearchTerm] = useState('');

  const submitSearch = (query) => {
    axios({
      url: 'tbd',
      method: 'POST',
      data: {
        query: query
      }
    })
      .then(res => console.log('Successful Search POST -> ', res))
      .catch(err => console.error('Submit Search Error -> ', err));
  };

  useEffect(() => {
    submitSearch(searchTerm);
  }, [searchTerm]);

  return (
    <DivContainer>
      <SearchInput type='text' value={searchTerm} placeHolder='search here...' />
      <SearchButton onClick={submitSearch} ></SearchButton>
    </DivContainer>
  )
}

export default Search;