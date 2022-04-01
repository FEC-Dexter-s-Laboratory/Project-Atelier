import React from 'react';
import styled from 'styled-components';

const CardStyle = styled.div`
  width: 150px;
  height: 100px;
`;

const RelatedCard = (props) => {
  return (
    <CardStyle>
      <img src={props.product.photos[0].thumbnail_url} width="140" />
      {props.product.category}
      {props.product.name}
    </CardStyle>
  )
};

export default RelatedCard;
