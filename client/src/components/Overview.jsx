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
  grid-template-rows: 25% 25% 25% 25%;
  background-color: transparent;
  color: black;
  height: 65vh;
  width: 12vw;
  overflow-wrap: break-word;
  z-index: 10;
  top: 15%;
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

const Price = styled.div`
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
  const [originalPrice, setOriginalPrice] = useState('Price');
  const [salePrice, setSalePrice] = useState(null);
  const [isOnSale, setIsOnSale] = useState(false);
  const [slogan, setSlogan] = useState('Slogan');
  const [description, setDescription] = useState('Description');
  const [mainImage, setMainImage] = useState('img');
  const [selectedStyle, setSelectedStyle] = useState('Style 1');
  const [styles, setStyles] = useState([]);
  const [resultsLength, setResultsLength] = useState(0);
  const [styleResults, setStyleResults] = useState([]);
  const [checkMarkStyle, setCheckMarkStyle] = useState(0);
  const [isHighlighted, setIsHighlighted] = useState(false);
  const [thumbDisplayChange, setThumbDisplayChanged] = useState('contents');
  let stylesColCounter = 0;
  let stylesRowCounter = 0;
  let styleResultsColCounter = 0;
  let styleResultsRowCounter = 1;
  let thumbDisplay = 'flex';
  // const { currentProductId } = useContext(ProductIdContext);
  // console.log('product ID yo! -> ', currentProductId);

  const enterThumb = (e) => {
    e.target.style.transition = '.2s';
    e.target.style.transform = 'scale(1.25)';
    e.target.style.zIndex = '20';
  };

  const leaveThumb = (e) => {
    e.target.style.transition = '.2s';
    e.target.style.transform = 'scale(1.00)';
  };

  const highlight = (e) => {
    if (!isHighlighted) {
      setIsHighlighted(true);
      e.target.style.border = '2px ridge white';
      displayImage(e);
    } else {
      setIsHighlighted(false);
      e.target.style.border = null;
    }
  };

  const displayImage = (e) => {
    let newImage = '';
    styleResults.forEach(style => {
      if (style.style_id === Number(e.target.classList[0])) {
        newImage = style.photos[0].url;
      }
    });
    setMainImage(newImage);
  };

  const displayThumb = (e) => {
    let newImage = '';
    styles.forEach(style => {
      if (style.id === Number(e.target.classList[0])) {
        newImage = style.srcUrl;
      }
    });
    setMainImage(newImage);
  };

  const changeStyle = (e) => {
    displayImage(e);
    let newStyleImages = [];
    for (let i = 0; i < styleResults.length; i++) {
      if (styleResults[i].style_id === Number(e.target.classList[0])) {
        for (let j = 0; j < styleResults[i].photos.length; j++) {
          newStyleImages.push({
            srcThumb: styleResults[i].photos[j].thumbnail_url,
            srcUrl: styleResults[i].photos[j].url,
            id: j,
          });
          setSelectedStyle(styleResults[i].name);
          setOriginalPrice(styleResults[i].original_price);
          if (styleResults[i].sale_price) {
            setSalePrice(styleResults[i].sale_price);
            setIsOnSale(true);
          } else {
            setSalePrice(null);
            setIsOnSale(false);
          }
        }
        break;
      }
    }
    setStyles(newStyleImages);
  };

  const getData = (id) => {
    axios({
      url: `/products/${id}`,
      method: 'GET',
    })
      .then(res => {
        setCategory(res.data.category);
        setTitle(res.data.name);
        setOriginalPrice(res.data.default_price);
        setSlogan(res.data.slogan);
        setDescription(res.data.description);
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
        let index = 0;
        res.data.results[0].photos.forEach(photo => {
          styleArr.push({
            srcThumb: photo.thumbnail_url,
            srcUrl: photo.url,
            id: index,
          });
          index += 1;
        });
        setStyles(styleArr);
        setStyleResults(res.data.results);
        setOriginalPrice(res.data.results[0].original_price);
        if (res.data.results[0].sale_price) {
          setSalePrice(res.data.results[0].sale_price);
          setIsOnSale(true);
        }
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
              stylesRowCounter += 1;
              stylesColCounter = 1;
              if (stylesRowCounter === 5) {
                thumbDisplay = 'none';
              }
              // return (
              // <img
              //   style={{display: thumbDisplay, height: '200px', width: '200px', position: 'absolute', zIndex: '12', gridColumn: colCounter, gridRow: rowCounter}}
              //   src={style} />
              // );
              return (
                <div style={{gridColumn: stylesColCounter, gridRow: stylesRowCounter, display: thumbDisplay, justifyContent: 'end', alignItems: 'center'}}>
                  <img
                    style={{height: '100px', width: '100px', position: 'absolute', zIndex: '12', border: '1px solid black', float: 'right'}}
                    src={style.srcThumb}
                    className={style.id}
                    onMouseEnter={enterThumb} onMouseLeave={leaveThumb} onClick={displayThumb} />
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
        <Price>
          {
            !isOnSale ? <h4>{`$${originalPrice}`}</h4> : (
              <>
                <h4 style={{textDecoration: 'line-through'}}>{`$${originalPrice}`}</h4>
                <h4 style={{color: 'red'}}>{`Now only $${salePrice}!`}</h4>
              </>
            )
          }
        </Price>
        <SelectedStyle>{`STYLE > ${selectedStyle}`}</SelectedStyle>
        <ChooseStyle>
          {
            styleResults.map((style, index) => {
              styleResultsColCounter += 1;
              if (styleResultsColCounter > 4) {
                styleResultsColCounter = 1;
                styleResultsRowCounter += 1;
              }
              return (
                <div key={style.style_id} style={{gridColumn: styleResultsColCounter, gridRow: styleResultsRowCounter}}>
                  <img className={style.style_id} src={style.photos[0].thumbnail_url} style={{borderRadius: '50%', width: '80px', height: '80px'}}
                    onClick={changeStyle} onMouseEnter={enterThumb} onMouseLeave={leaveThumb} />
                  {/* <i className="fa-solid fa-circle-check" style={{display: checkMarkStyle === 0 ? 'absolute' : 'none', color: 'green', top: '0%', right: '100%'}}></i> DO DIV with checkmark background possibly */}
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
