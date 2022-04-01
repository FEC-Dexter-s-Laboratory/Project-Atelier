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
      <img src={props.product.thumbnail} width="200"/>
      {props.product.category}
      {props.product.name}
    </CardStyle>
  );
};

export default RelatedCard;
