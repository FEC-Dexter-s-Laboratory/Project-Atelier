import React from 'react';
import styled from 'styled-components';

const CardStyle = styled.div`
  padding: 8;
`;
const Image = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
`

const RelatedCard = ({ product }) => {
  let image;
  let price;
  if (product.photos[0].thumbnail_url === null) {
    image = <img style={{display: 'block', width: '40%'}}src="https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg" />;
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
      <Image>{image}</Image>
      <div>{product.category}</div>
      {product.name}
      {price}
    </CardStyle>
  );
};

export default RelatedCard;
