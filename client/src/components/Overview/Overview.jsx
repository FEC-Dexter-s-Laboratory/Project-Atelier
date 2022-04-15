import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import StarButtons from '../library/StarButtons.jsx';
import StarDisplay from '../library/StarDisplay.jsx';
import ImageContainerComponent from './ImageContainerComponent.jsx';
import PriceComponent from './PriceComponent.jsx';
import ReviewsDivComponent from './ReviewsDivComponent.jsx';
import ChooseStyleComponent from './ChooseStyleComponent.jsx';
import DropdownDivComponent from './DropdownDivComponent.jsx';
import Search from './Search.jsx';

// ALL STYLED COMPONENTS
// Overview container
const DivContainer = styled.div`
  display: grid;
  margin-bottom: 5%;
`;

// For selecting styles
const SelectStyleDiv = styled.div`
  grid-column: 2;
  grid-row: 1;
  width: 30vw;
  height: 80vh;
  font-family: 'Comfortaa';
`;

const ProductCategory = styled.h3`
  color: #3d3c3c;
  margin-top: 3%;
`;

const ProductTitle = styled.h1`
  color: #3d3c3c;
  margin-top: 3%;
`;

const SelectedStyle = styled.h2`
  color: #3d3c3c;
  margin-top: 3%;
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
  grid-row: 1;
  grid-column: 1;
  margin-left: 2%;
`;


const DescriptionSpan = styled.span`
  color: #3d3c3c;
  padding: 1%;
  grid-row: 2;
  grid-column: 1;
  margin-left: 1%;
  width: 45%;
  `;

const FeaturesDiv = styled.div`
  grid-column: 2;
  display: grid;
`;

const FeaturesTitle = styled.h1`
  font-family: 'Lobster Two', cursive;
  color: #3d3c3c;
  grid-row: 1;
  margin-left: 3%;
`;

const FeatureList = styled.ul`
  font-family: 'Comfortaa';
  color: #3d3c3c;
  grid-row: 2;
`;

const Overview = (props) => {
  // State variables and functions
  // * this is subject to change still, I will clean up my state and try useReducer *
  const { setStyle } = props;
  const [isClicked, setIsClicked] = useState(false);
  const [productId, setProductId] = useState(0);
  const [category, setCategory] = useState('Category');
  const [title, setTitle] = useState('Title');
  const [originalPrice, setOriginalPrice] = useState('Price');
  const [salePrice, setSalePrice] = useState(null);
  const [isOnSale, setIsOnSale] = useState(false);
  const [slogan, setSlogan] = useState('Slogan');
  const [description, setDescription] = useState('Description');
  const [features, setFeatures] = useState([]);
  const [mainImage, setMainImage] = useState('https://i0.wp.com/obeygiant.com/images/2016/02/Zoolander_Blue-Steel-18X24-01-602x800-1.jpg?fit=602%2C800&ssl=1');
  const [currentThumb, setCurrentThumb] = useState(0);
  const [selectedStyle, setSelectedStyle] = useState('Style 1');
  const [styles, setStyles] = useState([]);
  const [styleResults, setStyleResults] = useState([]);
  const [checkMarkStyle, setCheckMarkStyle] = useState(0);
  const [isHighlighted, setIsHighlighted] = useState(false);
  const [thumbDisplayChange, setThumbDisplayChanged] = useState('contents');
  const [isLiked, setIsLiked] = useState(false);
  const [inCart, setInCart] = useState(false);
  const [skus, setSkus] = useState({});
  const [quantities, setQuantities] = useState([]);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [selectedSize, setSelectedSize] = useState('Select Size');
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [qProps, setQProps] = useState({});
  const [qList, setQList] = useState(['-']);
  const [selectedItem, setSelectedItem] = useState(1);
  const [rating, setRating] = useState(1);
  const [totalReviews, setTotalReviews] = useState(0);
  const [likedStyles, setLikedStyles] = useState([]);
  const [currentLikedStyle, setCurrentLikedStyle] = useState(false);
  const [cart, setCart] = useState([]);
  const [currentCartItem, setCurrentCartItem] = useState(false);
  const [addToCartDisplay, setAddToCartDisplay] = useState('block');
  // const [checkStyle, setCheckStyle] = useState('none')

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
    console.log('styleResults ', styleResults);
    let newImage = '';
    styleResults.forEach(style => {
      if (style.style_id === e) {
        console.log('one style be like ', style.photos);
        console.log('currentThumb ', currentThumb);
        newImage = style.photos[currentThumb].url;
      }
    });
    setMainImage(newImage);
  };

  // for updating main image, thumbnails, and all relevant state when switching between styles
  const changeStyle = (e) => {
    if (e.target) {
      e = Number(e.target.classList[0]);
    }
    setStyle(e);
    for (let j = 0; j < likedStyles.length; j++) {
      if (likedStyles[j].styleId === e) {
        setCurrentLikedStyle(likedStyles[j].liked);
        break;
      }
    }
    if (cart.length > 0) {
      let isInCart = false;
      for (let k = 0; k < cart.length; k++) {
        if (cart[k].skuId === e) {
          isInCart = true;
          setCurrentCartItem(true);
        }
      }
      if (!isInCart) {
        setCurrentCartItem(false);
      }
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
        setSelectedStyle({
          styleId: styleResults[i].style_id,
          name: styleResults[i].name,
        });
        setOriginalPrice(styleResults[i].original_price);
        if (styleResults[i].sale_price) {
          setSalePrice(styleResults[i].sale_price);
          setIsOnSale(true);
        } else {
          setSalePrice(null);
          setIsOnSale(false);
        }
        if (totalQuantities > 0) {
          let skus = styleResults[i].skus;
          let newQ = [];
          for (const sku in skus) {
            newQ.push(skus[sku]);
          }
          setQuantities(newQ);
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
      setQList(['-']);
      setSelectedSize(e.target.value);
    }
    document.getElementById('pleaseSelectSizeDiv').style.display = 'none';
    if (quantities.length > 0) {
      for (let i = 0; i < quantities.length; i++) {
        if (quantities[i].size === e.target.value) {
          if (quantities[i].quantity > 0) {
            if (quantities[i].quantity > 15) {
              for (let j = 1; j <= 15; j++) {
                q.push(j);
              }
              setQList(q);
              setSelectedSize(e.target.value);
            } else {
              for (let j = 1; j <= quantities[i].quantity; j++) {
                q.push(j);
              }
              setQList(q);
              setSelectedSize(e.target.value);
            }
          }
        }
      }
    }
  };

  // for toggling the like button and the add to cart button
  const toggleLike = (e) => {
    let updated = likedStyles;
    for (let i = 0; i < updated.length; i++) {
      if (updated[i].styleId === selectedItem) {
        if (!updated[i].liked) {
          updated[i].liked = true;
          setCurrentLikedStyle(true);
        } else {
          updated[i].liked = false;
          setCurrentLikedStyle(false);
        }
      }
    }
    setLikedStyles(updated);
    window.localStorage.setItem('likes', JSON.stringify(likedStyles));
  };

  const saveToCart = (sku, qty, name, style, size, price) => {
    let newCart = cart.slice();
    let isInCart = false;
    if (newCart.length > 0) {
      for (let i = 0; i < newCart.length; i++) {
        if (newCart[i].skuId === sku) {
          isInCart = true;
          newCart[i].count += Number(qty);
        }
      }
      if (!isInCart) {
        newCart.push({
          skuId: sku,
          name: name,
          style: style,
          size: size,
          count: Number(qty),
          price: price,
        });
        window.localStorage.setItem('cart', JSON.stringify(newCart));
        setCart(newCart);
      } else {
        window.localStorage.setItem('cart', JSON.stringify(newCart));
        setCart(newCart);
      }
    } else {
      newCart.push({
        skuId: sku,
        name: name,
        style: style,
        size: size,
        count: Number(qty),
        price: price,
      });
      window.localStorage.setItem('cart', JSON.stringify(newCart));
      setCart(newCart);
    }
  };

  const addToCart = (e) => {
    let price;
    if (!currentCartItem) {
      if (salePrice) {
        price = salePrice;
      } else {
        price = originalPrice;
      }
      if (selectedSize === 'Select Size') {
        document.getElementById('pleaseSelectSizeDiv').style.display = 'block';
        return;
      }
      setCurrentCartItem(true);
      saveToCart(selectedItem, selectedQuantity, title, selectedStyle, selectedSize, price);
    } else {
      if (salePrice) {
        price = salePrice;
      } else {
        price = originalPrice;
      }
      if (selectedSize === 'Select Size') {
        document.getElementById('pleaseSelectSizeDiv').style.display = 'block';
        return;
      }
      saveToCart(selectedItem, selectedQuantity, title, selectedStyle, selectedSize, price);
    }
  };

  // axios call for getting product data
  const getData = (id) => {
    axios({
      url: `/products/${id}`,
      method: 'GET',
    })
      .then(({ data }) => {
        setCategory(data.category);
        setTitle(data.name);
        setOriginalPrice(data.default_price);
        setSlogan(data.slogan);
        setDescription(data.description);
        setFeatures(data.features);
        setProductId(id);
      })
      .catch(err => console.error(err));
  };

  // axios call for getting style data on selected product
  const getStyles = (id, p, likes, cart) => {
    axios({
      url: `/products/${id}/styles`,
      method: 'GET',
    })
      .then(({ data }) => {
        //handle cart
        if (cart) {
          if (cart.length > 0) {
            cart.forEach(item => {
              if (item.skuId === data.results[0].style_id) {
                setCurrentCartItem(true);
              }
            });
          }
        }
        let idx = 0;
        data.results.forEach((style, i) => {
          if (style['default?']) {
            idx = i;
          }
        });

        // handle images and style
        setMainImage(data.results[idx].photos[0].url);
        setSelectedStyle({
          styleId: data.results[idx].style_id,
          name: data.results[idx].name,
        });
        let styleArr = [];
        let index = 0;
        data.results[idx].photos.forEach(photo => {
          styleArr.push({
            srcThumb: photo.thumbnail_url,
            srcUrl: photo.url,
            id: index,
          });
          index += 1;
        });

        // handle likes
        if (likes !== undefined) {
          let isNewProduct = false;
          for (let i = 0; i < likes.length; i++) {
            if (data.results[i] === undefined) {
              break;
            } else if (likes[i].styleId === data.results[i].style_id) {
              isNewProduct = true;
            }
          }
          if (!isNewProduct) {
            data.results.forEach((style, index) => {
              for (let i = 0; i < likes.length; i++) {
                if (likes[i].styleId === style.style_id) {
                  setCurrentLikedStyle(likes[i].liked);
                  return;
                }
              }
              let like = {
                liked: false,
                name: style.name,
                styleId: style.style_id,
                productId: data.product_id,
              };
              likes.push(like);
            });
            window.localStorage.setItem('likes', JSON.stringify(likes));
            setLikedStyles(likes);
          } else {
            setCurrentLikedStyle(likes[0].liked);
            setLikedStyles(likes);
          }
        } else {
          likes = [];
          data.results.forEach(style => {
            let like = {
              liked: false,
              name: style.name,
              styleId: style.style_id,
              productId: data.product_id,
            };
            likes.push(like);
          });
          window.localStorage.setItem('likes', JSON.stringify(likes));
          setLikedStyles(likes);
          setCurrentLikedStyle(likes[0].liked);
        }
        setStyles(styleArr);
        setStyleResults(data.results);

        // handle price
        setOriginalPrice(data.results[idx].original_price);
        if (data.results[idx].sale_price) {
          setSalePrice(data.results[idx].sale_price);
          setIsOnSale(true);
        }
        setSelectedItem(data.results[idx].style_id);
      })
      .catch(err => console.error(err));
  };

  const getRatings = (id) => {
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
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const getReviews = (id) => {
    axios.get(`/reviews/${id}`, {
      params: {
        productId: id,
        count: 1000,
        sort: 'relevant'
      }
    })
      .then(({data}) => {
        setTotalReviews(data.results.length);
      })
      .catch(err => console.error(err));
  };

  // for initial rendering, similar to componentDidMount
  useEffect(() => {
    getData(props.productId);
    getRatings(props.productId);
    getReviews(props.productId);
    setQProps(props.qtys);
    let qs = Object.values(props.qtys);
    setQProps(qs);
    if (qs.length > 0) {
      let qArr = [];
      let total = 0;
      for (let i = 0; i < qs.length; i++) {
        total += qs[i].quantity;
        let q = {
          size: qs[i].size,
          quantity: qs[i].quantity,
        };
        qArr.push(q);
      }
      setQuantities(qArr);
      setTotalQuantities(total);
      if (total === 0) {
        setAddToCartDisplay('none');
      }
    }
    let cart = JSON.parse(window.localStorage.getItem('cart'));
    if (cart) {
      if (cart.length > 0) {
        setCart(cart);
      }
    }
    let likes = JSON.parse(window.localStorage.getItem('likes'));
    if (likes) {
      if (likes.length > 0) {
        setCurrentLikedStyle(likes[0].liked);
        getStyles(props.productId, props.qtys, likes, cart);
      } else {
        getStyles(props.productId, props.qtys, likes, cart);
      }
    } else {
      getStyles(props.productId, props.qtys, undefined, cart);
    }
  }, [isClicked, props.qtys, props.productId, window.localStorage.getItem('cart')]);

  return (
    <>
      <Search productId={props.productId} />
      <DivContainer>
        <ImageContainerComponent mainImage={mainImage} isHighlighted={isHighlighted} styles={styles} styleResults={styleResults} setMainImage={(image) => {
          setMainImage(image);
        }} setCurrentThumb={(thumb) => { setCurrentThumb(thumb); }} enterThumb={enterThumb} leaveThumb={leaveThumb} />
        <SelectStyleDiv>
          <ReviewsDivComponent rating={rating} totalReviews={totalReviews} />
          <ProductCategory>{category}</ProductCategory>
          <ProductTitle><b>{title}</b></ProductTitle>
          <PriceComponent isOnSale={isOnSale} originalPrice={originalPrice} salePrice={salePrice} />
          <SelectedStyle>{`STYLE > ${selectedStyle.name}`}</SelectedStyle>
          <ChooseStyleComponent styleResults={styleResults} enterThumb={enterThumb} leaveThumb={leaveThumb} changeStyle={(e) => {
            changeStyle(e);
          }} />
          <DropdownDivComponent qList={qList} addToCart={(item) => { addToCart(item); }} checkSkus={(choice) => { checkSkus(choice); }}
            chooseQuantity={(choice) => { chooseQuantity(choice); }} toggleLike={(item) => { toggleLike(item); }}
            inCart={inCart} currentLikedStyle={currentLikedStyle} currentCartItem={currentCartItem} quantities={quantities} totalQuantities={totalQuantities} addToCartDisplay={addToCartDisplay} />
        </SelectStyleDiv>
        <DescriptionDiv>
          <DescriptionTitle>
            <u>{slogan}</u>
          </DescriptionTitle>
          <DescriptionSpan>
            {description}
          </DescriptionSpan>
        </DescriptionDiv>
        <FeaturesDiv>
          <FeaturesTitle>
            <u>Features:</u>
          </FeaturesTitle>
          <FeatureList>
            {
              features.map((feature, i) => {
                return (
                  <li key={i}>{`${feature.feature}  |  ${feature.value}`}</li>
                );
              })
            }
          </FeatureList>
        </FeaturesDiv>
      </DivContainer>
    </>
  );
};

export default Overview;
