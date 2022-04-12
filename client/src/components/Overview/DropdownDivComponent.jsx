import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const DropdownDiv = styled.div`
  display: grid;
  position: relative;
  margin-top: 6%;
  font-family: 'Comfortaa';
`;

const PleaseSelectSizeDiv = styled.div`
  grid-column: 1;
  grid-row: 1;
  margin: 3%;
`;

const PleaseSelectSize = styled.h4`
  display: none;
  color: red;
`;

const SelectSize = styled.select`
  grid-column: 1;
  grid-row: 2;
  margin: 3%;
`;

const SelectQuantity = styled.select`
  grid-column: 2;
  grid-row: 2;
  margin: 3%;
`;

const AddToCart = styled.button`
  grid-column: 1;
  grid-row: 3;
  margin: 3%;
`;

const Favorite = styled.button`
  grid-column: 2;
  grid-row: 3;
  margin: 3%;
`;

const DropdownDivComponent = (props) => {
  let { checkSkus, chooseQuantity, addToCart, toggleLike, qList, inCart, currentLikedStyle, currentCartItem, quantities, totalQuantities, addToCartDisplay } = props;
  let sizeList;
  if (totalQuantities === 0) {
    sizeList = <option>OUT OF STOCK</option>;
  } else {
    sizeList = quantities.map(q => {
      return (
        <option key={q.size}>{q.size}</option>
      );
    });
    sizeList.unshift(<option key={'selectSize'}>Select Size</option>);
  }

  useEffect(()=> {
    // watch props
  }, [props]);

  return (
    <>
      <DropdownDiv>
        <PleaseSelectSizeDiv>
          <PleaseSelectSize id={'pleaseSelectSizeDiv'}>Please Select A Size</PleaseSelectSize>
        </PleaseSelectSizeDiv>
        <SelectSize id={'checkSelectSize'} onChange={checkSkus}>
          {
            sizeList
          }
        </SelectSize>
        <SelectQuantity id={'checkSelectQuantity'} onChange={chooseQuantity}>
          {
            qList.map((q, index) => {
              return (
                <option key={index}>{q}</option>
              );
            })
          }
        </SelectQuantity>
        <AddToCart style={{display: addToCartDisplay}} onClick={addToCart}>{!currentCartItem ? 'Add To Cart ➕ ' : 'Added To Cart ✅ '}</AddToCart>
        <Favorite onClick={toggleLike}>{!currentLikedStyle ? '  ⭐  ' : '  ❤️  '}</Favorite>
      </DropdownDiv>
    </>
  );
};

export default DropdownDivComponent;