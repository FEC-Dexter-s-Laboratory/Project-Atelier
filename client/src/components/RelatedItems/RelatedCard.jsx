import React from 'react';
import styled from 'styled-components';

const CardStyle = styled.div`
  width: 20px;
  height: 100px;
`;

const RelatedCard = (props) => {
  return (
    <CardStyle>
      <img src={props.product.thumbnail} width=200/>
      {props.product.category}
      {props.product.name}
    </CardStyle>
  )
};

export default RelatedCard;
