import styled from 'styled-components';

//IndividualQuestion styled components
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
`;
const Innerquestiondiv = styled.div`
  font-weight: lighter;
  font-size: small;
`;

//QandA styled components
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

//QandA modal styled components
const Modalbackground = styled.div`
display: flex;
justify-content: center;
align-content: center;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(128,128,128,0.7);
  zIndex: 1000;
`;

const Questionform = styled.form`
width: 500px;
height: 500px;
border-radius: 12px;
background-color: white;
box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
display: flex;
flex-direction: column;
padding: 25px;
`;

const Titlelabel = styled.label`
display: flex;
justify-content: space-around;
font-size: large;
font-weight: bold;
`;

const Modaltitle = styled.h1`
display: flex;
justify-content: center;
`;

const Xmodalbutton = styled.button`
display: flex;
justify-content: flex-end;
background: none;
border: none;
margin: 0;
padding: 0;
cursor: pointer;
`;

export { Linkbutton, Orderlist, Questiondiv, Innerquestiondiv, QnAContainer, QnAHeader, SearchInput, Modalbackground, Questionform, Titlelabel, Modaltitle, Xmodalbutton };