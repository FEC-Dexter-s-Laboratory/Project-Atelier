import styled from 'styled-components';

//IndividualQuestion styled components
const Listcontainer = styled.div`
height: 500px;
overflow-y: auto;
`;

const Linkbutton = styled.button`
	font-size: 1em;
	text-align: left;
	color: blue;
	background: none;
	margin: 0;
	padding: 0;
	border: none;
	cursor: pointer;
  font-family: Comfortaa;
`;

const Orderlist = styled.ol`
  display: contents;
  list-style-type: none;
  font-family: Comfortaa;
`;

const Questionlist = styled.li`
  height: 40%;
  border-bottom: 1px solid black;
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
  margin-top: 20px;
`;

//Answerlist styled components
const Answerdiv = styled.div`
  margin-bottom: 10px;
`;

//QAndA styled components
const QnAContainer = styled.div`
  margin-left: 20%;
  margin-right: 20%;
  display: grid;
  font-family: Comfortaa;
`;

const QnAHeader = styled.h1`
  display: flex;
  justify-content: center;
  font-size: large;
  font-weight: bold;
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
  z-index: 1000;
`;

const Modalform = styled.form`
  width: 500px;
  height: 500px;
  border-radius: 12px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  display: block;
  flex-direction: column;
  padding: 25px;
  font-family: Comfortaa;
`;

const Titlelabel = styled.label`
  display: flex;
  justify-content: space-around;
  font-size: large;
  font-weight: bold;
  margin-top: 20px
`;

const Modaltitle = styled.h1`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const Modalinput = styled.input`
  width: 100%;
`;

const Disclaimer = styled.label`
  font-size: x-small;
  margin-bottom: 50px;
`;

const Modalsubmit = styled.button`
  display: grid;
  margin-top: 40px;
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

export {
  Listcontainer, Linkbutton, Orderlist, Questionlist, Questiondiv, Innerquestiondiv,
  Answerdiv,
  QnAContainer, QnAHeader, SearchInput,
  Modalbackground, Modalform, Titlelabel, Modaltitle, Modalinput, Disclaimer, Modalsubmit, Xmodalbutton
};
