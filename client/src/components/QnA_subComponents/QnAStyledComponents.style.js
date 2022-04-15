import styled from 'styled-components';

//IndividualQuestion styled components
const NavButton = styled.button`
  border-radius: 30px;
  font-size: 15px;
  font-family: Comfortaa;
  background: none;
  border: 1px solid #353935;
  margin-right: 10px;
  padding: 15px;
  cursor: pointer;
  &:hover {
    color: teal;
  }
`;

const Listcontainer = styled.div`
height: 75vh;
overflow-y: auto;
margin-bottom: 15px;
`;

const Linkbutton = styled.button`
  border-radius: 30px;
  font-family: Comfortaa;
  transition: .2s;
	text-align: center;
	background: none;
	margin: 0;
	padding: 0;
	border: none;
	cursor: pointer;
  &:hover {
    color: teal;
    z-index: 10;
    transform: scale(1.05);
  }
`;

const Orderlist = styled.ol`
  display: contents;
  list-style-type: none;
  font-family: Comfortaa;
`;

const Questionlist = styled.li`
  overflow-y: auto;
  border-bottom: 1px solid black;
  margin-bottom: 10px;
  min-height: 45%
`;

const Questiondiv = styled.span`
  width: 70%;
  font-weight: bold;
  font-size: large;
  margin-top: 10px;
  margin-bottom: 10px;
`;
const Innerquestiondiv = styled.span`
  width: 30%
  text-align: right;
  font-weight: lighter;
  font-size: small;
  margin-top: 20px;
`;

const Questionheader = styled.div`
  display: flex;
  justify-content: space-between;
`;

//IndiviualAnswer styled components
const Answerdiv = styled.div`
  margin-bottom: 10px;
`;

const Answerphotos = styled.div`
  margin: 10px 0;
`;

const Answerthumbnail = styled.img`
  object-fit: contain;
  height: 60px;
  width: auto;
  margin-right: 5px;
  cursor: pointer;
  border: .5px solid gray;
`;

const Byline = styled.div`
  color: #565959;
  margin-top: 10px;
`;

//QAndA styled components
const QnAContainer = styled.div`
  margin-left: 15%;
  margin-right: 15%;
  display: grid;
  font-family: Comfortaa;
`;

const QnAHeader = styled.h3`
  display: flex;
  font-weight: bold;
`;

const SearchInput = styled.input`
  background-color: white;
  opacity: 0.50;
  width: 100%;
  height: 50px;
  font-weight: bold;
  border-radius: 6px;
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
  background-color: #000;
  opacity: 0.75;
`;

const Modalborder = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #b0c4de;
  padding: 50px;
  height: 600px;
  width: 600px;
  z-index: 999;
  font-family: Comfortaa;
  border-radius: 12px;
`;

const Modalform = styled.form`
  width: 90%;
  height: 90%;
  border: 2px ridge grey;
  border-radius: 12px;
  background-color: white;
  box-shadow: 10px 5px 5px black;
  overflow-y: auto;
  padding: 5%;
  font-family: Comfortaa;
`;

const Titlelabel = styled.label`
  display: flex;
  justify-content: space-around;
  font-size: large;
  font-weight: bold;
  margin-top: 20px
  margin-bottom: 5px;
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
  border-radius: 30px;
  display: grid;
  margin-top: 40px;
`;

const Xmodalbutton = styled.button`
  position: fixed;
  top: 40px;
  right: 40px;
  font-size: 20px;
  background-color: white;
  border: 2px ridge grey;
  border-radius: 12px;
  cursor: pointer;
  box-shadow: 10px 5px 5px black;
  transition: 0.2s;
  &:hover {
    transform: scale(1.25);
  }
`;

export {
  NavButton, Listcontainer, Linkbutton, Orderlist, Questionlist, Questiondiv, Innerquestiondiv, Questionheader,
  Answerdiv, Answerphotos, Answerthumbnail, Byline,
  QnAContainer, QnAHeader, SearchInput,
  Modalbackground, Modalform, Titlelabel, Modaltitle, Modalinput, Disclaimer, Modalsubmit, Xmodalbutton, Modalborder
};
