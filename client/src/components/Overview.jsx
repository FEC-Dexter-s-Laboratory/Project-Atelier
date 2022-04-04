import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import axios from 'axios';
// import { ProductIdContext } from './Contexts/ProductIdContext.jsx';

const DivContainer = styled.div`
  border: 6px ridge darkblue;
  background-image: linear-gradient(to bottom right, cyan, deepskyblue);
  display: grid;
`;

const ImageContainer = styled.div`
  position: relative;
  grid-column: 1;
  grid-row: 1;
  width: 60vw;
  height: 100vh;
`;

const MainImage = styled.img`
  position: absolute;
  grid-column: 1;
  width: 50vw;
  height: 100vh;
`;

const TestDiv = styled.div`
  position: absolute;
  overflow: hidden;
  display: grid;
  grid-template-columns: 50% 50%;
  grid-template-rows: 20% 20% 20% 20% 20%;
  background-color: transparent;
  color: black;
  height: 80vh;
  width: 15vw;
  overflow-wrap: break-word;
  z-index: 10;
  top: 0;
  left: 0;
`;

const SelectStyleDiv = styled.div`
  grid-column: 2;
  grid-row: 1;
  width: 30vw;
  height: 80vh;
`;

const ProductCategory = styled.h3`
  color: white;
`;

const ProductTitle = styled.h1`
  color: white;
`;

const Price = styled.h4`
  color: white;
`;

const SelectedStyle = styled.h2`
  color: white;
`;

const ChooseStyle = styled.div`
  display: grid;
  position: relative;
`;

const DescriptionDiv = styled.div`
  grid-row: 2;
  display: grid;
`;

const DescriptionTitle = styled.h1`
  font-family: 'Lobster Two', cursive;
  color: white;
`;

const DescriptionSpan = styled.span`
  color: white;
  padding: 1%;
`;

const Overview = (props) => {
  // State variables and functions
  const [isClicked, setIsClicked] = useState(false);
  const [category, setCategory] = useState('Category');
  const [title, setTitle] = useState('Title');
  const [price, setPrice] = useState('Price');
  const [slogan, setSlogan] = useState('Slogan');
  const [description, setDescription] = useState('Description');
  const [mainImage, setMainImage] = useState('img');
  const [selectedStyle, setSelectedStyle] = useState('Style 1');
  const [styles, setStyles] = useState([]);
  const [resultsLength, setResultsLength] = useState(0);
  const [styleResults, setStyleResults] = useState([]);
  const [checkMarkStyle, setCheckMarkStyle] = useState(0);
  const [isHighlighted, setIsHighlighted] = useState(false);
  let colCounter = 0;
  let rowCounter = 1;
  let thumbDisplay = 'contents';
  // const { currentProductId } = useContext(ProductIdContext);
  // console.log('product ID yo! -> ', currentProductId);

  const enterThumb = (e) => {
    e.target.style.transition = '.2s';
    e.target.style.transform = 'scale(1.25)';
    e.target.style.zIndex = '20';
    console.log('z index -> ', e.target.style.zIndex);
  };

  const leaveThumb = (e) => {
    e.target.style.transition = '.2s';
    e.target.style.transform = 'scale(1.00)';
  };

  const highlight = (e) => {
    if (!isHighlighted) {
      setIsHighlighted(true);
      e.target.style.border = '2px ridge white';
    } else {
      setIsHighlighted(false);
      e.target.style.border = null;
    }
  };

  const getData = (id) => {
    axios({
      url: `/products/${id}`,
      method: 'GET',
    })
      .then(res => {
        console.log('result data -> ', res.data);
        console.log('before -> ', category);
        setCategory(res.data.category);
        setTitle(res.data.name);
        setPrice(res.data.default_price);
        setSlogan(res.data.slogan);
        setDescription(res.data.description);
        console.log('after -> ', category);
      })
      .catch(err => console.error(err));
  };

  const getStyles = (id) => {
    axios({
      url: `/products/${id}/styles`,
      method: 'GET',
    })
      .then(res => {
        setMainImage(res.data.results[0].photos[0].url);
        setSelectedStyle(res.data.results[0].name);
        setResultsLength(res.data.results.length);
        let styleArr = [];
        res.data.results[0].photos.forEach(photo => {
          styleArr.push(photo.thumbnail_url);
        });
        setStyles(styleArr);
        setStyleResults(res.data.results);
      })
      .catch(err => console.error(err));
  };

  useEffect(() => {
    getData(props.productId);
    getStyles(props.productId);
  }, [isClicked]);

  return (
    <DivContainer>
      <ImageContainer>
        <TestDiv>
          {
            styles.map(style => {
              rowCounter += 1;
              colCounter = 1;
              if (rowCounter >= 4) {
                thumbDisplay = 'none';
              }
              // return (
              // <img
              //   style={{display: thumbDisplay, height: '200px', width: '200px', position: 'absolute', zIndex: '12', gridColumn: colCounter, gridRow: rowCounter}}
              //   src={style} />
              // );
              return (
                <div style={{gridColumn: colCounter, gridRow: rowCounter, display: 'flex', justifyContent: 'end'}}>
                  <img
                    style={{height: '100px', width: '100px', position: 'absolute', zIndex: '12', border: '1px solid black', float: 'right'}}
                    src={style}
                    onMouseEnter={enterThumb} onMouseLeave={leaveThumb} />
                </div>
              );
            })
          }
        </TestDiv>
        <MainImage src={mainImage} alt="style" />
      </ImageContainer>
      <SelectStyleDiv>
        <ProductCategory>{category}</ProductCategory>
        <ProductTitle><b>{title}</b></ProductTitle>
        <Price>{`$${price}`}</Price>
        <SelectedStyle>{`STYLE > ${selectedStyle}`}</SelectedStyle>
        <ChooseStyle>
          {
            styleResults.map((style, index) => {
              colCounter += 1;
              return (
                <div key={style.style_id}>
                  <img src={style.photos[0].thumbnail_url} style={{borderRadius: '50%', width: '80px', height: '80px', gridColumn: colCounter}}
                    onClick={highlight} onMouseEnter={enterThumb} onMouseLeave={leaveThumb} />
                  {/* <i className="fa-solid fa-circle-check" style={{display: checkMarkStyle === 0 ? 'absolute' : 'none', color: 'green', top: '0%', right: '100%'}}></i> */}
                </div>
              );
            })
          }
        </ChooseStyle>
      </SelectStyleDiv>
      <DescriptionDiv>
        <DescriptionTitle>{slogan}</DescriptionTitle>
        <DescriptionSpan>
          {description}
        </DescriptionSpan>
      </DescriptionDiv>
      {/* <img src={mainImage} /> */}
    </DivContainer>
  );
};

export default Overview;
