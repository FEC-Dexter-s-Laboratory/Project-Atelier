import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import StarButtons from '../library/StarButtons.jsx';
import StarDisplay from '../library/StarDisplay.jsx';

// ALL STYLED COMPONENTS
// Overview container
const DivContainer = styled.div`
  background-color: white;
  display: grid;
  margin-bottom: 5%;
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
  height: 65vh;
  width: 15vw;
  overflow-wrap: break-word;
  z-index: 10;
  top: 15%;
  left: 0;
  margin-left: 1%;
`;

const ThumbUpArrow = styled.button`
  font-size: 2rem;
  color: black;
  border-radius: 12px;
  border: 2px ridge black;
  position: absolute;
  z-index: 12;
  width: fit-content;
  top: 5%;
  left: 5%;
  display: none;
`;

const ThumbDownArrow = styled.button`
  font-size: 2rem;
  color: black;
  border-radius: 12px;
  border: 2px ridge black;
  position: absolute;
  z-index: 12;
  width: fit-content;
  bottom: 11%;
  left: 5%;
  display: block;
`;

// For selecting styles
const SelectStyleDiv = styled.div`
  grid-column: 2;
  grid-row: 1;
  width: 30vw;
  height: 80vh;
  font-family: 'Comfortaa';
`;

const ReviewsDiv = styled.div`
  display: flex;
  justify-content: start;
  margin-top: 13%;
`;

const ReadReviewsLink = styled.a`
  margin-left: 2%;
  margin-top: 1%;
`;

const ProductCategory = styled.h3`
  color: #3d3c3c;
  margin-top: 13%
`;

const ProductTitle = styled.h1`
  color: #3d3c3c;
  margin-top: 13%;
`;

const Price = styled.div`
  color: #3d3c3c;
  margin-top: 13%;
`;

const SelectedStyle = styled.h2`
  color: #3d3c3c;
  margin-top: 13%;
`;

const ChooseStyle = styled.div`
  display: grid;
  position: relative;
  margin-top: 5%;
`;

const DropdownDiv = styled.div`
  display: grid;
  position: relative;
  margin-top: 10%;
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
  font-family: 'Comfortaa';
`;

const DescriptionTitle = styled.h1`
  font-family: 'Lobster Two', cursive;
  color: #3d3c3c;
`;

const DescriptionSpan = styled.span`
  color: #3d3c3c;
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
  const [rating, setRating] = useState(1);
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
    let newE;
    if (typeof e === 'object') {
      newE = Number(e.target.classList[0]);
    } else {
      newE = e;
    }
    let newImage = '';
    styles.forEach((style, index) => {
      if (newE > 0) {
        document.getElementById('thumbUpArrow').style.display = 'block';
      }
      if (style.id === newE) {
        newImage = style.srcUrl;
        document.getElementById(`${index}thumb`).style.border = '4px solid white';
      } else {
        document.getElementById(`${index}thumb`).style.border = null;
      }
    });
    setMainImage(newImage);
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

  const thumbUp = (e) => {
    // move up through thumbnails
    if (document.getElementById(`${styles.length - 1}thumb`).style.border === '4px solid white') {
      document.getElementById('thumbDownArrow').style.display === 'block';
    } else if (document.getElementById('1thumb').style.border === '4px solid white') {
      document.getElementById('thumbUpArrow').style.display = 'none';
      displayThumb(0);
    } else if (document.getElementById('2thumb').style.border === '4px solid white') {
      displayThumb(1);
      document.getElementById('0thumb').style.transform = 'translateY(10%)';
      document.getElementById('1thumb').style.transform = 'translateY(10%)';
      document.getElementById('2thumb').style.transform = 'translateY(10%)';
      document.getElementById('3thumb').style.transform = 'translateY(10%)';
      document.getElementById('4thumb').style.transform = 'translateY(50%)';
      document.getElementById('4thumbDiv').style.display = 'flex';
      document.getElementById('4thumbDiv').style.alignItems = 'center';
    } else if (document.getElementById('3thumb').style.border === '4px solid white') {
      displayThumb(2);
    } else if (document.getElementById('4thumb').style.border === '4px solid white') {
      displayThumb(3);
    }
  };

  const thumbDown = (e) => {
    // move down through thumbnails
    console.log('checking the style yo ', document.getElementById('0thumb').style.border);
    if (document.getElementById('0thumb').style.border === '4px solid white') {
      document.getElementById('thumbUpArrow').style.display = 'block';
      displayThumb(1);
    } else if (document.getElementById('1thumb').style.border === '4px solid white') {
      displayThumb(2);
    } else if (document.getElementById('2thumb').style.border === '4px solid white') {
      displayThumb(3);
    } else if (document.getElementById('3thumb').style.border === '4px solid white') {
      displayThumb(4);
      document.getElementById('0thumb').style.transform = 'translateY(-120%)';
      document.getElementById('1thumb').style.transform = 'translateY(-120%)';
      document.getElementById('2thumb').style.transform = 'translateY(-120%)';
      document.getElementById('3thumb').style.transform = 'translateY(-120%)';
      document.getElementById('4thumb').style.transform = 'translateY(-50%)';
      document.getElementById('4thumbDiv').style.display = 'flex';
      document.getElementById('4thumbDiv').style.alignItems = 'center';
    }


    /* if (document.getElementById('0thumb').style.border === '4px solid white') {
      document.getElementById('thumbUpArrow').style.display = 'block';
      displayThumb(1);
      document.getElementById('0thumbDiv').style.display = 'none';
      document.getElementById('0thumb').style.transform = 'translateY(-110%)';
      document.getElementById('1thumb').style.transform = 'translateY(-110%)';
      document.getElementById('2thumb').style.transform = 'translateY(-110%)';
      document.getElementById('3thumb').style.transform = 'translateY(-110%)';
      document.getElementById('4thumbDiv').style.display = 'block';
      document.getElementById('4thumb').style.transform = 'translateY(-110%)';
    } else if (document.getElementById('1thumb').style.border === '4px solid white') {
      displayThumb(2);
      document.getElementById('0thumb').style.transform = 'translateY(-110%)';
      document.getElementById('1thumbDiv').style.display = 'none';
      document.getElementById('1thumb').style.transform = 'translateY(-110%)';
      document.getElementById('2thumb').style.transform = 'translateY(-110%)';
      document.getElementById('3thumb').style.transform = 'translateY(-110%)';
      document.getElementById('4thumb').style.transform = 'translateY(-110%)';
      document.getElementById('5thumbDiv').style.transform = 'translateY(-110%)';
      document.getElementById('5thumb').style.transform = 'translateY(-110%)';
    } else if (document.getElementById('2thumb').style.border === '4px solid white') {
      displayThumb(3);
      document.getElementById('0thumb').style.transform = 'translateY(-110%)';
      document.getElementById('1thumb').style.transform = 'translateY(-110%)';
      document.getElementById('2thumb').style.transform = 'translateY(-110%)';
      document.getElementById('3thumb').style.transform = 'translateY(-110%)';
    } else if (document.getElementById('3thumb').style.border === '4px solid white') {
      displayThumb(4);
      document.getElementById('0thumb').style.transform = 'translateY(-110%)';
      document.getElementById('1thumb').style.transform = 'translateY(-110%)';
      document.getElementById('2thumb').style.transform = 'translateY(-110%)';
      document.getElementById('3thumb').style.transform = 'translateY(-110%)';
    } */
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
            setXsQuantity(skus[sku].quantity);
          } else if (skus[sku].size === 'S') {
            setSQuantity(skus[sku].quantity);
          } else if (skus[sku].size === 'M') {
            setMQuantity(skus[sku].quantity);
          } else if (skus[sku].size === 'L') {
            setLQuantity(skus[sku].quantity);
          } else if (skus[sku].size === 'XL') {
            if (xlCount > 0) {
              console.log('changed second xl caught')
              setXxlQuantity(skus[sku].quantity);
            } else {
              xlCount += 1;
              setXlQuantity(skus[sku].quantity);
            }
          } else if (skus[sku].size === 'XXL') {

            setXxlQuantity(skus[sku].quantity);
          }
        }
      } else {
        document.getElementById(styleResults[i].style_id).style.display = 'none';
      }
    }
    setStyles(newStyleImages);
  };

  const chooseQuantity = (e) => {
    setSelectedQuantity(e.target.value);
  };

  // for selecting a size, changes quantity accordingly
  const checkSkus = (e) => {
    let q = [];
    if (e.target.value === 'Select Size') {
      setQList([1]);
      setSelectedSize(e.target.value);
    }
    if (e.target.value === 'XS') {
      if (xsQuantity >= 15) {
        for (let i = 1; i <= 15; i++) {
          q.push(i);
        }
        setQList(q);
        setSelectedSize(e.target.value);
        return;
      } else {
        for (let i = 1; i <= xsQuantity; i++) {
          q.push(i);
        }
        setQList(q);
        setSelectedSize(e.target.value);
        return;
      }
    } else if (e.target.value === 'S') {
      if (sQuantity >= 15) {
        for (let i = 1; i <= 15; i++) {
          q.push(i);
        }
        setQList(q);
        setSelectedSize(e.target.value);
        return;
      } else {
        for (let i = 1; i <= sQuantity; i++) {
          q.push(i);
        }
        setQList(q);
        setSelectedSize(e.target.value);
        return;
      }
    } else if (e.target.value === 'M') {
      if (mQuantity >= 15) {
        for (let i = 1; i <= 15; i++) {
          q.push(i);
        }
        setQList(q);
        setSelectedSize(e.target.value);
        return;
      } else {
        for (let i = 1; i <= mQuantity; i++) {
          q.push(i);
        }
        setQList(q);
        setSelectedSize(e.target.value);
        return;
      }
    } else if (e.target.value === 'L') {
      if (lQuantity >= 15) {
        for (let i = 1; i <= 15; i++) {
          q.push(i);
        }
        setQList(q);
        setSelectedSize(e.target.value);
        return;
      } else {
        for (let i = 1; i <= lQuantity; i++) {
          q.push(i);
        }
        setQList(q);
        setSelectedSize(e.target.value);
        return;
      }
    } else if (e.target.value === 'XL') {
      if (xlQuantity >= 15) {
        for (let i = 1; i <= 15; i++) {
          q.push(i);
        }
        setQList(q);
        setSelectedSize(e.target.value);
        return;
      } else {
        for (let i = 1; i <= xlQuantity; i++) {
          q.push(i);
        }
        setQList(q);
        setSelectedSize(e.target.value);
        return;
      }
    } else if (e.target.value === 'XXL') {
      if (xxlQuantity >= 15) {
        for (let i = 1; i <= 15; i++) {
          q.push(i);
        }
        setQList(q);
        setSelectedSize(e.target.value);
        return;
      } else {
        for (let i = 1; i <= xxlQuantity; i++) {
          q.push(i);
        }
        setQList(q);
        setSelectedSize(e.target.value);
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

  const saveToCart = (sku, qty, name, style, size, price) => {
    // AXIOS CALLS FOR CART: NOT BEING USED
    // axios.get('/cart')
    //   .then(({ data }) => {
    //     // save data to array
    //     cartItems = data;
    //     console.log('card items api ', cartItems);
    //     if (cartItems.length > 0) {
    //       console.log('cart items length >', cartItems.length);
    //       let inItems = false;
    //       for (let i = 0; i < cartItems.length; i++) {
    //         console.log('incoming sku ', sku);
    //         console.log('test for loop ', cartItems[i]['sku_id']);
    //         if (cartItems[i]['sku_id'] === sku) {
    //           console.log('cart item i sku = ', cartItems[i].sku);
    //           let count = Number(cartItems[i].count) + Number(qty);
    //           cartItems[i].count = String(count);
    //           cartItems[i]['sku_id'] = sku;
    //           inItems = true;
    //           break;
    //         }
    //       }
    //       if (!inItems) {
    //         item['sku_id'] = sku;
    //         item['count'] = String(qty);
    //         cartItems.push(item);
    //       }
    //     } else {
    //       item['sku_id'] = sku;
    //       item['count'] = String(qty);
    //       cartItems.push(item);
    //     }

    //     axios.post('/cart', {
    //       items: cartItems,
    //     })
    //       .then((res) => {
    //         // do something with the response
    //         console.log('save to cart post res ', res.data);
    //       })
    //       .catch((err) => {
    //         console.error(err);
    //       });
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //   });


    console.log('skuzz me ', sku);
    console.log('gettin items ', window.localStorage.getItem('cart'));
    if (window.localStorage.getItem('cart')) {
      // do stuff
      let items = JSON.parse(window.localStorage.getItem('cart'));
      if (items.length === 0) {
        window.localStorage.setItem('cart', JSON.stringify([{
          skuId: sku,
          name: name,
          style: style,
          size: size,
          count: Number(qty),
          price: Number(price),
        }]));
      }
      for (let i = 0; i < items.length; i++) {
        let itemCount = items[i].count;
        itemCount = Number(itemCount);
        console.log('itemCount be like ', itemCount);
        console.log('sku type ', items[i].skuId);
        if (items[i].skuId === sku) {
          console.log('inside if getitem')
          itemCount += Number(qty);
          items[i].count = itemCount;
          window.localStorage.setItem('cart', JSON.stringify(items));
          break;
        } else {
          let newItem = items.slice();
          newItem.push({skuId: sku, name: name, style: style, size: size, count: Number(qty), price: Number(price)});
          window.localStorage.setItem('cart', JSON.stringify(newItem));
        }
      }
    } else {
      window.localStorage.setItem('cart', JSON.stringify([{
        skuId: sku,
        name: name,
        style: style,
        size: size,
        count: Number(qty),
        price: Number(price),
      }]));
    }
  };

  const addToCart = (e) => {
    let price;
    if (!inCart) {
      if (salePrice) {
        price = salePrice;
      } else {
        price = originalPrice;
      }
      setInCart(true);
      saveToCart(selectedItem, selectedQuantity, title, selectedStyle, selectedSize, price);
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

  const getRating = (id) => {
    axios.get(`/reviews/meta/${id}`)
      .then((response) => {
        let ratings = response.data.ratings;
        let sumRatings = 0;
        let countRatings = 0;
        for (let key in ratings) {
          sumRatings += Number(key) * Number(ratings[key]);
          countRatings += Number(ratings[key]);
        }
        const averageRating = sumRatings / countRatings;
        setRating(averageRating);
        // do something with averageRating here (return || setState || assign to global variable)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // for initial rendering, similar to componentDidMount
  useEffect(() => {
    getData(props.productId);
    getStyles(props.productId, props.qtys);
    getRating(props.productId);
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
  }, [isClicked, props.qtys, props.productId]);

  return (
    <DivContainer>
      <ImageContainer>
        <ThumbUpArrow id="thumbUpArrow" onMouseEnter={enterThumb} onMouseLeave={leaveThumb} onClick={thumbUp}> 🔼 </ThumbUpArrow>
        <TestDiv>
          {
            styles.map((style, index) => {
              stylesRowCounter += 1;
              stylesColCounter = 1;
              if (stylesRowCounter === 5) {
                thumbDisplay = 'none';
              }
              return (
                <div key={index} style={{gridColumn: stylesColCounter, gridRow: stylesRowCounter, display: thumbDisplay, justifyContent: 'end', alignItems: 'center'}} id={`${style.id}thumbDiv`}>
                  <img
                    style={{height: '100px', width: '100px', position: 'absolute', zIndex: '12', border: '1px solid black', float: 'right', border: index === 0 ? '4px solid white' : null, transition: '.2s'}}
                    src={style.srcThumb}
                    className={style.id}
                    id={`${style.id}thumb`}
                    onClick={displayThumb} />
                </div>
              );
            })
          }
        </TestDiv>
        <ThumbDownArrow id="thumbDownArrow" onMouseEnter={enterThumb} onMouseLeave={leaveThumb} onClick={thumbDown}> 🔽 </ThumbDownArrow>
        <MainImage src={mainImage} alt="style" />
      </ImageContainer>
      <SelectStyleDiv>
        <ReviewsDiv>
          <StarDisplay rating={rating} style={{gridColumn: '1'}} />
          <ReadReviewsLink href="#reviews-module">Read All Reviews</ReadReviewsLink>
        </ReviewsDiv>
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
                <div key={style.style_id} style={{gridColumn: styleResultsColCounter, gridRow: styleResultsRowCounter, margin: '4%', position: 'relative', width: 'fit-content'}} onClick={(event) => changeStyle(style.style_id)} className={style.style_id}>
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
