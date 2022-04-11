import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';

const Price = styled.div`
  color: #3d3c3c;
  margin-top: 3%;
`;

const PriceComponent = (props) => {
  const { isOnSale, originalPrice, salePrice } = props;

  useEffect(() => {
    // watch props
  }, [props]);

  return (
    <>
      <Price>
        {
          !isOnSale ? <h4>{`$${originalPrice}`}</h4> : (
            <>
              <h4 style={{textDecoration: 'line-through'}}>{`$${originalPrice}`}</h4>
              <h4 style={{color: 'red'}}>{`Now only $${salePrice}!`}</h4>
            </>
          )
        }
      </Price>
    </>
  );
};

export default PriceComponent;