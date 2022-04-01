import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

// styles need adjusting, search input and button still on left despite using flexbox, needs to be adjusted, low priority
const NavContainer = styled.nav`
  width: 100%;
  background-image: linear-gradient(to right, deepskyblue, cyan);
  display: flex;
  justify-content: space-between;
`;

const Logo = styled.h1`
  font-family: 'Lobster Two', cursive;
  font-weight: 700;
  font-size: 3rem;
  color: white;
  margin-left: 4%;
`;

const SearchDiv = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  margin-right: 2%;
`;

// styles need adjusting, search input and button still on left despite using flexbox, needs to be adjusted, low priority
const SearchInput = styled.input`
  border: 1px solid blue;
  border-radius: 12px;
  background-image: url(https://cdn2.hubspot.net/hubfs/4004166/bioticresearch_website_assets/images/search_icon.png);
  background-repeat: no-repeat;
  background-position: right center;
  background-size: contain;
  height: fit-content;
  width: fit-content;
`;

// styles need adjusting, search input and button still on left despite using flexbox, needs to be adjusted, low priority
const SearchButton = styled.button`
  border: 1px solid blue;
  border-radius: 12px;
  height: fit-content;
  width: fit-content;
`;

function Search(props) {
  const [searchTerm, setSearchTerm] = useState('');

  const submitSearch = (query) => {
    axios({
      url: 'tbd',
      method: 'POST',
      data: {
        query,
      },
    })
      .then((res) => console.log('Successful Search POST -> ', res))
      .catch((err) => console.error('Submit Search Error -> ', err));
  };

  const handleInput = (e) => {
    console.log('Setting SearchTerm state!');
    setSearchTerm(e.target.value);
  };

  return (
    <NavContainer>
      <Logo><b>Project Atelier</b></Logo>
      <SearchDiv>
        <SearchInput onChange={handleInput} type="text" value={searchTerm} placeHolder="search here..." />
        <SearchButton onClick={submitSearch}>Search</SearchButton>
      </SearchDiv>
    </NavContainer>
  );
}

export default Search;
