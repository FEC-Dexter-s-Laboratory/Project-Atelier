import styled from 'styled-components';

// for lists
const DivContainer = styled.div`
  margin: auto;
  width: 60%;
  font-family: Comfortaa;
`;

// for modal
const ModalStyle = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 50px;
  z-index: 1000;
  height: 200px;
  overflow-y: auto;
  border-radius: 5px;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(128,128,128,0.7);
  z-index: 1000;
`;

const ModalButton = styled.button`
  position: fixed;
  top: 0;
  right: 0;
  background-color: white;
  font-size: 20px;
`;

// for comparison table
const Table = styled.div`
  width: 100%;
  margin: auto;
  text-align: center;
  font-family: Comfortaa;
  height: 200px;
  overflow-y: auto;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`;

const GridHeader = styled.div`
  text-align: center;
  display: grid;
  font-weight: bold;
  position: sticky;
  top: 0;
  z-index: 20;
  background: white;
`;

const GridItem = styled.div`
  text-align: center;
  border: 1px solid black;
  z-index: 10;
`;

// for carousel
const CaroContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  font-family: Comfortaa;
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
  flex-shrink: 0;
  flex-grow: 1;
  justify-content: center;
  align-items: center;
`;

const Arrow = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 48px;
  height: 48px;
  border-radius: 24px;
  background-color: white;
  border: 1px solid #ddd;
  z-index: 20;
`;

const PreviewContainer = styled.div`
  width: 340px;
  display: flex;
  flex-direction: row;
  font-family: Comfortaa;
  z-index: 800;
  overflow: hidden;
  left: 20px;
`;

const PreviewImage = styled.div`
  position: relative;
  left: 10%;
  background: white;
  display: flex;
  flex-direction: row;
  padding: 2px;
  width: 25%;
  border: 1px solid grey;
  justify-content: center;
  z-index: 800;
`;

// for cards
const CardStyle = styled.div`
  padding: 8;
  border: 1px solid black;
`;
const Image = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
  width: 200px;
  z-index: 20;
`;

const Preview = styled.div`
  position: absolute;
  bottom: 20%;
  width: 400px;
  left: -5px;
  z-index: 200;
`;

const CompareStar = styled.img`
  position: relative;
  top: 0;
  right: 0;
  height: 20px;
`;

const RemoveButton = styled.button`
  font-size: 20px;
  border: none;
  background-color: white;
`;

const ButtonAlign = styled.div`
  text-align: right;
`;

export {DivContainer, ModalStyle, Overlay, ModalButton};
export {CaroContainer, CaroWrapper, ContentWrapper, ContentStyle, Arrow, PreviewContainer, PreviewImage};
export {Table, Grid, GridHeader, GridItem};
export {CardStyle, Image, Preview, CompareStar, RemoveButton, ButtonAlign};