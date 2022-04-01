import React from 'react';
import styled from 'styled-components';

const CardStyle = styled.div`
  width: 200px;
  height: 300px;
`;

const RelatedCard = ({ product }) => {
  // if sale price is not null
    // change price div
  return (
    <CardStyle>
      <img src={product.photos[0].thumbnail_url} width="140" height="200" alt="" />
      <div>{product.category}</div>
      <div>{product.name}</div>
    </CardStyle>
  )
};

export default RelatedCard;
