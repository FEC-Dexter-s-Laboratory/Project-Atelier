import React from 'react';
import styled from 'styled-components';

const CardStyle = styled.div`
  width: auto;
`;

const RelatedCard = ({ product }) => {
  let image;
  let price;
  if (product.photos[0].thumbnail_url === null) {
    image = <img src="https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg" width="200"/>;
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
    <CardStyle>
      {image}
      <div>{product.category}</div>
      {product.name}
      {price}
    </CardStyle>
  );
};

export default RelatedCard;
