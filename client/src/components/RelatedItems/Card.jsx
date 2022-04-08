import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import Modal from './Modal.jsx';
import StarDisplay from '../library/StarDisplay.jsx';
import Carousel from './Carousel.jsx';
import {CardStyle, Image, Preview, CompareStar, RemoveButton, ButtonAlign} from './Related&OutfitStyles.js';

const Card = (props) => {
  let {product} = props;

  const [isOpen, setIsOpen] = useState(false);
  const [mouseOn, setMouseOn] = useState(false);
  const [previewClicked, setPreviewClicked] = useState(false);

  // create star rating
  let ratings = product.ratings;
  let sumRatings = 0;
  let countRatings = 0;
  for (let key in ratings) {
    sumRatings += Number(key) * Number(ratings[key]);
    countRatings += Number(ratings[key]);
  }
  const averageRating = sumRatings / countRatings;

  // onClick handler for preview pictures
  let clickedPreview;
  const previewClick = (event, url) => {
    event.stopPropagation();
    clickedPreview = url;
  };

  // conditional rendering of outfit default card
  if (product.id === 'default') {
    return (
      <CardStyle onClick={props.handleDefaultClick}>
        <Image><img style={{display: 'block', width: '100%'}} src="https://upload.wikimedia.org/wikipedia/commons/9/9e/Plus_symbol.svg" alt="Plus icon" /></Image>
        <b>Add to Outfit</b>
      </CardStyle>
    );
  } else {
    let image;
    let price;
    let source = clickedPreview || product.photos[0].thumbnail_url;
    if (product.photos[0].thumbnail_url === null) {
      image = <img style={{display: 'block', width: '100%'}} src="https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg" alt="No image found" />;
    } else {
      // need to change this to change src if preview picture is clicked - need to send the url back to here
      image = <img src={source} style={{display: 'block', width: '100%'}}/>;
    }
    if (product.sale_price === null) {
      price = <div>{product.original_price}</div>;
    } else {
      price =
      <div>
        <span style={{textDecoration: 'line-through'}}>{product.original_price}</span>{' '}
        <span style={{color: 'red'}}><b>{product.sale_price}</b></span>
      </div>;
    }
    // conditional rendering of related items or outfit action buttons (modal or X)
    let modal;
    let removeOutfit;
    if (props.use === 'compare') {
      modal =
      <ButtonAlign>
        <CompareStar src="https://upload.wikimedia.org/wikipedia/commons/7/71/Blank_star_%28fixed_width%29.svg" onClick={() => setIsOpen(true)}/>
        <Modal open={isOpen} onClose={() => setIsOpen(false)} comparedId={product.id} mainId={props.mainId} />
      </ButtonAlign>;
    }
    if (props.use === 'outfit') {
      removeOutfit =
      <ButtonAlign>
        <RemoveButton onClick={(e) => props.handleOutfitClick(e, product.id)} >X</RemoveButton>
      </ButtonAlign>;
    }

    return (
      <CardStyle onMouseLeave={() => setMouseOn(false)}>
        {modal}
        {removeOutfit}
        <div onClick={() => props.handleCardClick(product.id)}>
          <Image onMouseEnter={() => setMouseOn(true)} >
            {image}
          </Image>
          {mouseOn && (
            <Preview >
              <Carousel previewClick={previewClick} previewState={() => setPreviewClicked(true)} images={product.photos}/>
            </Preview>
          )}
          <div>{product.category}</div>
          <b>{product.name}</b>
          {price}
          <StarDisplay font={30} rating={averageRating}/>
        </div>
      </CardStyle>
    );
  }
};

export default Card;
