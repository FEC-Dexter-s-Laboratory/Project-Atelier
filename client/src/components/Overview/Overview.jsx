import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import axios from 'axios';

// ALL STYLED COMPONENTS
// Overview container
const DivContainer = styled.div`
  border: 6px ridge darkblue;
  background-image: linear-gradient(to bottom right, cyan, deepskyblue);
  display: grid;
`;

// For images and thumbnails
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
  width: 55vw;
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
  width: 15vw;
  overflow-wrap: break-word;
  z-index: 10;
  top: 15%;
  left: 0;
  margin-left: 1%;
`;

// For selecting styles
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

const DropdownDiv = styled.div`
  display: grid;
  position: relative;
`;

const SelectSize = styled.select`
  grid-column: 1;
  grid-row: 1;
  margin: 3%;
`;

const SelectQuantity = styled.select`
  grid-column: 2;
  grid-row: 1;
  margin: 3%;
`;

const AddToCart = styled.button`
  grid-column: 1;
  grid-row: 2;
  margin: 3%;
`;

const Favorite = styled.button`
  grid-column: 2;
  grid-row: 2;
  margin: 3%;
`;

// For description
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
  // * this is subject to change still, I will clean up my state and try useReducer *
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
  const [styleResults, setStyleResults] = useState([]);
  const [checkMarkStyle, setCheckMarkStyle] = useState(0);
  const [isHighlighted, setIsHighlighted] = useState(false);
  const [thumbDisplayChange, setThumbDisplayChanged] = useState('contents');
  const [isLiked, setIsLiked] = useState(false);
  const [inCart, setInCart] = useState(false);
  const [skus, setSkus] = useState({});
  const [xsQuantity, setXsQuantity] = useState(1);
  const [sQuantity, setSQuantity] = useState(1);
  const [mQuantity, setMQuantity] = useState(1);
  const [lQuantity, setLQuantity] = useState(1);
  const [xlQuantity, setXlQuantity] = useState(1);
  const [xxlQuantity, setXxlQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('Select Size');
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [qProps, setQProps] = useState({});
  const [qList, setQList] = useState([1]);
  const [selectedItem, setSelectedItem] = useState(1);
  // const [checkStyle, setCheckStyle] = useState('none')

  // Non-state variables used for initial rendering
  let stylesColCounter = 0;
  let stylesRowCounter = 0;
  let styleResultsColCounter = 0;
  let styleResultsRowCounter = 1;
  let thumbDisplay = 'flex';
  let checkStyle = '';
  let checkStyleIndex = 0;

  // Mouseover animation functions
  const enterThumb = (e) => {
    e.target.style.transition = '.2s';
    e.target.style.transform = 'scale(1.25)';
    e.target.style.zIndex = '20';
  };

  const leaveThumb = (e) => {
    e.target.style.transition = '.2s';
    e.target.style.transform = 'scale(1.00)';
  };

  // for highlighting selected thumbnail
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

  // for all main image rendering, including when switching between images
  const displayImage = (e) => {
    let newImage = '';
    styleResults.forEach(style => {
      if (style.style_id === e) {
        newImage = style.photos[0].url;
      }
    });
    setMainImage(newImage);
  };

  const displayThumb = (e) => {
    let newImage = '';
    console.log('styles be like ', styleResults)
    styles.forEach(style => {
      console.log('stylin... ', style)
      if (style.id === Number(e.target.classList[0])) {
        newImage = style.srcUrl;
      }
    });
    setMainImage(newImage);
  };

  // for updating main image, thumbnails, and all relevant state when switching between styles
  const changeStyle = (e) => {
    if (e.target) {
      e = Number(e.target.classList[0]);
    }
    setSelectedItem(e);
    displayImage(e);
    let newStyleImages = [];
    let xlCount = 0;
    for (let i = 0; i < styleResults.length; i++) {
      if (styleResults[i].style_id === e) {
        document.getElementById(e).style.display = 'block';
        for (let j = 0; j < styleResults[i].photos.length; j++) {
          newStyleImages.push({
            srcThumb: styleResults[i].photos[j].thumbnail_url,
            srcUrl: styleResults[i].photos[j].url,
            id: j,
          });
        }
        setSelectedStyle(styleResults[i].name);
        setOriginalPrice(styleResults[i].original_price);
        if (styleResults[i].sale_price) {
          setSalePrice(styleResults[i].sale_price);
          setIsOnSale(true);
        } else {
          setSalePrice(null);
          setIsOnSale(false);
        }
        let skus = styleResults[i].skus;
        for (const sku in skus) {
          if (skus[sku].size === 'XS') {
            console.log('xs test')
            setXsQuantity(skus[sku].quantity);
          } else if (skus[sku].size === 'S') {
            console.log('s test')
            setSQuantity(skus[sku].quantity);
          } else if (skus[sku].size === 'M') {
            console.log('m test')
            setMQuantity(skus[sku].quantity);
          } else if (skus[sku].size === 'L') {
            console.log('l test')
            setLQuantity(skus[sku].quantity);
          } else if (skus[sku].size === 'XL') {
            if (xlCount > 0) {
              console.log('changed second xl caught')
              setXxlQuantity(skus[sku].quantity);
            } else {
              xlCount += 1;
              console.log('xl test')
              setXlQuantity(skus[sku].quantity);
            }
          } else if (skus[sku].size === 'XXL') {
            console.log('xxl test')
            setXxlQuantity(skus[sku].quantity);
          }
        }
      } else {
        console.log('non style ', styleResults[i].style_id)
        document.getElementById(styleResults[i].style_id).style.display = 'none';
      }
    }
    setStyles(newStyleImages);
  };

  const chooseQuantity = (e) => {
    console.log('qty being chosen ', e.target.value);
    setSelectedQuantity(e.target.value);
  };

  // for selecting a size, changes quantity accordingly
  const checkSkus = (e) => {
    let q = [];
    if (e.target.value === 'Select Size') {
      setQList([1]);
    }
    if (e.target.value === 'XS') {
      if (xsQuantity >= 15) {
        for (let i = 1; i <= 15; i++) {
          q.push(i);
        }
        setQList(q);
        return;
      } else {
        for (let i = 1; i <= xsQuantity; i++) {
          q.push(i);
        }
        setQList(q);
        return;
      }
    } else if (e.target.value === 'S') {
      if (sQuantity >= 15) {
        for (let i = 1; i <= 15; i++) {
          q.push(i);
        }
        setQList(q);
        return;
      } else {
        for (let i = 1; i <= sQuantity; i++) {
          q.push(i);
        }
        setQList(q);
        return;
      }
    } else if (e.target.value === 'M') {
      if (mQuantity >= 15) {
        for (let i = 1; i <= 15; i++) {
          q.push(i);
        }
        setQList(q);
        return;
      } else {
        for (let i = 1; i <= mQuantity; i++) {
          q.push(i);
        }
        setQList(q);
        return;
      }
    } else if (e.target.value === 'L') {
      if (lQuantity >= 15) {
        for (let i = 1; i <= 15; i++) {
          q.push(i);
        }
        setQList(q);
        return;
      } else {
        for (let i = 1; i <= lQuantity; i++) {
          q.push(i);
        }
        setQList(q);
        return;
      }
    } else if (e.target.value === 'XL') {
      if (xlQuantity >= 15) {
        for (let i = 1; i <= 15; i++) {
          q.push(i);
        }
        setQList(q);
        return;
      } else {
        for (let i = 1; i <= xlQuantity; i++) {
          q.push(i);
        }
        setQList(q);
        return;
      }
    } else if (e.target.value === 'XXL') {
      if (xxlQuantity >= 15) {
        for (let i = 1; i <= 15; i++) {
          q.push(i);
        }
        setQList(q);
        return;
      } else {
        for (let i = 1; i <= xxlQuantity; i++) {
          q.push(i);
        }
        setQList(q);
        return;
      }
    }
  };

  // for toggling the like button and the add to cart button
  const toggleLike = (e) => {
    if (!isLiked) {
      setIsLiked(true);
    } else {
      setIsLiked(false);
    }
  };

  const saveToCart = (sku, qty) => {
    console.log('skuzz me ', sku)
    if (window.localStorage.getItem('cart')) {
      // do stuff
      let item = JSON.parse(window.localStorage.getItem('cart'));
      console.log(item);
      for (let i = 0; i < item.length; i++) {
        let itemCount = item[i].count;
        itemCount = Number(itemCount);
        console.log('sku type ', item[i].skuId)
        if (item[i].skuId === sku) {
          itemCount += Number(qty);
          console.log('item count ', itemCount)
          item[i].count = itemCount;
          window.localStorage.setItem('cart', JSON.stringify(item));
          break;
        } else {
          let newItem = item.slice();
          newItem.push({skuId: sku, count: qty});
          window.localStorage.setItem('cart', JSON.stringify(newItem));
        }
      }
    } else {
      window.localStorage.setItem('cart', JSON.stringify([{
        skuId: sku,
        count: qty,
      }]));
    }
  };

  const addToCart = (e) => {
    if (!inCart) {
      setInCart(true);
      saveToCart(selectedItem, selectedQuantity);
    } else {
      setInCart(false);
    }
  };

  // axios call for getting product data
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

  // axios call for getting style data on selected product
  const getStyles = (id, p) => {
    axios({
      url: `/products/${id}/styles`,
      method: 'GET',
    })
      .then(res => {
        setMainImage(res.data.results[0].photos[0].url);
        setSelectedStyle(res.data.results[0].name);
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
        setSelectedItem(res.data.results[0].style_id);
      })
      .catch(err => console.error(err));
  };

  // for initial rendering, similar to componentDidMount
  useEffect(() => {
    getData(props.productId);
    getStyles(props.productId, props.qtys);
    setQProps(props.qtys);
    let qArr = [];
    let qs = Object.values(props.qtys);
    setQProps(qs);
    if (qs.length > 0) {
      let xlCount = 0;
      for (let i = 0; i < qs.length; i++) {
        if (qs[i].size === 'XS') {
          setXsQuantity(qs[i].quantity);
        } else if (qs[i].size === 'S') {
          setSQuantity(qs[i].quantity);
        } else if (qs[i].size === 'M') {
          setMQuantity(qs[i].quantity);
        } else if (qs[i].size === 'L') {
          setLQuantity(qs[i].quantity);
        } else if (qs[i].size === 'XL') {
          if (xlCount > 0) {
            console.log('second xl caught');
            setXxlQuantity(qs[i].quantity);
          } else {
            xlCount += 1;
            setXlQuantity(qs[i].quantity);
          }
        } else if (qs[i].size === 'XXL') {
          setXxlQuantity(qs[i].quantity);
        }
      }
    }
  }, [isClicked, props.qtys]);

  return (
    <DivContainer>
      <ImageContainer>
        <TestDiv>
          {
            styles.map((style, index) => {
              stylesRowCounter += 1;
              stylesColCounter = 1;
              if (stylesRowCounter === 5) {
                thumbDisplay = 'none';
              }
              return (
                <div key={index} style={{gridColumn: stylesColCounter, gridRow: stylesRowCounter, display: thumbDisplay, justifyContent: 'end', alignItems: 'center'}}>
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
              checkStyleIndex += 1;
              styleResultsColCounter += 1;
              if (styleResultsColCounter > 4) {
                styleResultsColCounter = 1;
                styleResultsRowCounter += 1;
              }
              if (index === 0) {
                checkStyle = 'block';
              } else {
                checkStyle = 'none';
              }
              return (
                <div key={style.style_id} style={{gridColumn: styleResultsColCounter, gridRow: styleResultsRowCounter, margin: '4%', position: 'relative', width: 'fit-content'}} onClick={() => changeStyle(style.style_id)} className={style.style_id}>
                  <img className={style.style_id} src={style.photos[0].thumbnail_url} style={{borderRadius: '50%', width: '80px', height: '80px'}}
                    onMouseEnter={enterThumb} onMouseLeave={leaveThumb} />
                  <img src="https://media.istockphoto.com/vectors/check-vector-id871478670?b=1&k=20&m=871478670&s=170667a&w=0&h=z-dZAr0bn8-IlGirxjJjqJcATVZWsHHr8UgEKxl1gtg=" style={{position: 'absolute', top: '0', right: '0', width: '30px', height: '30px', zIndex: '30', borderRadius: '50%', display: checkStyle}} id={style.style_id} />
                </div>
              );
            })
          }
        </ChooseStyle>
        <DropdownDiv>
          <SelectSize onChange={checkSkus}>
            <option>Select Size</option>
            <option>XS</option>
            <option>S</option>
            <option>M</option>
            <option>L</option>
            <option>XL</option>
            <option>XXL</option>
          </SelectSize>
          <SelectQuantity onChange={chooseQuantity}>
            {
              qList.map((q, index) => {
                return (
                  <option key={index}>{q}</option>
                );
              })
            }
          </SelectQuantity>
          <AddToCart onClick={addToCart}>{!inCart ? 'Add To Cart ➕ ' : 'Added To Cart ✅ '}</AddToCart>
          <Favorite onClick={toggleLike}>{!isLiked ? '  ⭐  ' : '  ❤️  '}</Favorite>
        </DropdownDiv>
      </SelectStyleDiv>
      <DescriptionDiv>
        <DescriptionTitle>
          {slogan}
        </DescriptionTitle>
        <DescriptionSpan>
          {description}
        </DescriptionSpan>
      </DescriptionDiv>
    </DivContainer>
  );
};

export default Overview;
