import React, {useState} from 'react';
import styled from 'styled-components';
import Modal from './Modal.jsx';
import StarDisplay from '../library/StarDisplay.jsx';
import Carousel from './Carousel.jsx';

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
`;

const CompareStar = styled.img`
  position: relative;
  top: 0;
  right: 0;
`;

const RemoveButton = styled.button`
  font-weight: bold;
  border: none;
  background-color: white;
`;

const ButtonAlign = styled.div`
  text-align: right;
`;

const Clickable = styled.div`

`;

const RelatedCard = (props) => {

  let {product} = props;

  const [isOpen, setIsOpen] = useState(false);
  const [mouseOn, setMouseOn] = useState(false);

  // create star rating
  let ratings = product.ratings;
  let sumRatings = 0;
  let countRatings = 0;
  for (let key in ratings) {
    sumRatings += Number(key) * Number(ratings[key]);
    countRatings += Number(ratings[key]);
  }
  const averageRating = sumRatings / countRatings;

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
    if (product.photos[0].thumbnail_url === null) {
      image = <img style={{display: 'block', width: '100%'}} src="https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg" alt="No image found" />;
    } else {
      image = <img src={product.photos[0].thumbnail_url} width="200"/>;
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
      <CardStyle >
        {modal}
        {removeOutfit}
        <Clickable onClick={() => props.handleCardClick(product.id)}>
          <Image onMouseEnter={() => setMouseOn(true)} onMouseLeave={() => setMouseOn(false)}>
            {image}
            {/* {mouseOn && (
              <div style={{position: 'absolute', bottom: '20%'}}>
                <Carousel images={product.photos}/>
              </div>
            )} */}
          </Image>
          <div>{product.category}</div>
          <b>{product.name}</b>
          {price}
          <StarDisplay font={30} rating={averageRating}/>
        </Clickable>
      </CardStyle>
    );
  }
};

export default RelatedCard;
