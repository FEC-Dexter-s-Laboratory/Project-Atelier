import styled from 'styled-components';

//IndividualQuestion component styles
const Linkbutton = styled.button`
  font-family: "Verdana" sans-serif;
	font-size: 1em;
	text-align: left;
	color: blue;
	background: none;
	margin: 0;
	padding: 0;
	border: none;
	cursor: pointer;
`;

const Orderlist = styled.ol`
  display: contents;
  list-style-type: none;
`;

const Questiondiv = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  font-size: large;
  margin-top: 10px;
  margin-bottom: 10px;
`
const Innerquestiondiv = styled.div`
  font-weight: lighter;
  font-size: small;
`

//QandA component styles
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

export { Linkbutton, Orderlist, Questiondiv, Innerquestiondiv, QnAContainer, QnAHeader, SearchInput };