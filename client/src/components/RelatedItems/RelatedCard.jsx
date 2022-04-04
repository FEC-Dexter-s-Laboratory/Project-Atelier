import React from 'react';
import styled from 'styled-components';

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

const RelatedCard = (props) => {
  let {product} = props;
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
    return (
      // add onclick for card, will need to send product.id back to App to change state
      <CardStyle>
        <Image>{image}</Image>
        <div>{product.category}</div>
        <b>{product.name}</b>
        {price}
      </CardStyle>
    );
  }
};

export default RelatedCard;
