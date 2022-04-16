import styled from 'styled-components';

// for lists
const DivContainer = styled.div`
  margin: auto;
  width: 60%;
  height: 100%;
  font-family: Comfortaa;
`;

// for modal
const ModalStyle = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #b0c4de;
  opacity: 1;
  padding: 50px;
  z-index: 1000;
  height: 30%;
  width: 40%;
  overflow-y: auto;
  border-radius: 12px;
  display: flex;
  justify-content: center;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: #000;
  opacity: 0.75;
  z-index: 600;
`;

const ModalButton = styled.button`
  position: fixed;
  top: 70px;
  right: 40px;
  background-color: white;
  font-size: 20px;
  border: 2px ridge grey;
  border-radius: 12px;
  cursor: pointer;
  box-shadow: 10px 5px 5px black;
  transition: 0.2s;
  &:hover {
    transform: scale(1.25);
  }
`;

// for comparison table
const Table = styled.div`
  width: 100%;
  margin: auto;
  text-align: center;
  font-family: Comfortaa;
  height: 75%;
  overflow-y: auto;
  background-color: white;
  border: 1px solid black;
  border-radius: 12px;
  padding: 0 5%;
  box-shadow: 10px 5px 5px black;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  background-color: white;
`;

const GridHeader = styled.div`
  text-align: center;
  display: grid;
  font-weight: bold;
  position: sticky;
  top: 0;
  z-index: 20;
  background-color: white;
`;

const GridItem = styled.div`
  text-align: center;
  border: 1px solid black;
  z-index: 10;
`;

// for carousel
const CaroContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  font-family: Comfortaa;
  position: relative;
  left: -5%;
`;

const CaroWrapper = styled.div`
  display: flex;
  width: 100%;
  position: relative;
`;

const ContentWrapper = styled.div`
  overflow: hidden;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
`;

const ContentStyle = styled.div`
  display: flex;
  transition: all 250ms linear;
  width: 35%;
  height: 100%;
  flex-shrink: 0;
  flex-grow: 0;
  justify-content: center;
  align-items: center;
`;

const Arrow = styled.button`
  position: absolute;
  top: 50%;
  width: 3%;
  height: 15%;
  background-color: #bfc5e8;
  border: 1px solid #353935;
  border-radius: 30px;
  z-index: 20;
  box-shadow: 10px 5px 5px black;
  transition: 0.2s;
  cursor: pointer;
  &:hover {
    transform: scale(1.25);
    background-color: #98a2cc;
  }
`;

const PreviewContainer = styled.div`
  width: 70%;
  position: relative;
  display: flex;
  flex-direction: row;
  font-family: Comfortaa;
  z-index: 800;
  overflow: hidden;
  left: 1%;
`;

const PreviewImage = styled.div`
  position: relative;
  left: 10%;
  background: white;
  display: flex;
  flex-direction: row;
  padding: 2px;
  width: 17%;
  height: 80%;
  border: 1px solid grey;
  justify-content: start;
  z-index: 800;
  border-radius: 12px;
`;

// for cards
const CardStyle = styled.div`
  padding: 8;
  border: 1px solid black;
  border-radius: 12px;
  height: 99%;
  width: 70%;
  overflow: hidden;
  cursor: pointer;
  background-color: white;
  box-shadow: 10px 5px 5px black;
`;

const Image = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  top: 50%;
  height: 50%;
  min-height: 40vh;
  width: 100%;
  z-index: 20;
`;

const Preview = styled.div`
  position: absolute;
  bottom: 20%;
  width: 30vw;
  z-index: 200;
  display: flex;
  left: 12%;
  flex-direction: row;
`;

const CompareStar = styled.img`
  position: relative;
  top: 0;
  right: 1%;
  height: 20px;
  width: 20px;
  &:hover {
    transform: scale(1.25);
  }
`;

const RemoveButton = styled.button`
  font-size: 20px;
  border: none;
  background-color: transparent;
  &:hover {
    transform: scale(1.25);
  }
`;

const ButtonAlign = styled.div`
  text-align: right;
`;

export {DivContainer, ModalStyle, Overlay, ModalButton};
export {CaroContainer, CaroWrapper, ContentWrapper, ContentStyle, Arrow, PreviewContainer, PreviewImage};
export {Table, Grid, GridHeader, GridItem};
export {CardStyle, Image, Preview, CompareStar, RemoveButton, ButtonAlign};