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
  font-family: 'Comfortaa';
  border-radius: 12px;
  grid-column: 1;
  grid-row: 2;
  margin: 3%;
  /* background-image: linear-gradient(to right, #bfc5e8, #ebe9e9); */
  background-color: #bfc5e8;
  &:hover {
    background-color: #98a2cc;
  }
  cursor: pointer;
  box-shadow: 10px 5px 5px black;
  height: 28px;
`;

const SelectQuantity = styled.select`
  font-family: 'Comfortaa';
  border-radius: 12px;
  grid-column: 2;
  grid-row: 2;
  margin: 3%;
  /* background-image: linear-gradient(to right, #bfc5e8, #ebe9e9); */
  background-color: #bfc5e8;
  &:hover {
    background-color: #98a2cc;
  }
  cursor: pointer;
  box-shadow: 10px 5px 5px black;
  height: 28px;
`;

const AddToCart = styled.button`
  font-family: 'Comfortaa';
  border-radius: 12px;
  grid-column: 1;
  grid-row: 3;
  margin: 3%;
  background-color: #bfc5e8;
  cursor: pointer;
  box-shadow: 10px 5px 5px black;
  transition: .2s;
  &:hover {
    transform: scale(1.10);
    background-color: #98a2cc;
  }
`;

const Favorite = styled.button`
  font-family: 'Comfortaa';
  border-radius: 12px;
  grid-column: 2;
  grid-row: 3;
  margin: 3%;
  background-color: #bfc5e8;
  cursor: pointer;
  box-shadow: 10px 5px 5px black;
  transition: .2s;
  &:hover {
    transform: scale(1.10);
    background-color: #98a2cc;
  }
h`;

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
        <SelectSize aria-label="Select Size" id={'checkSelectSize'} onChange={checkSkus}>
          {
            sizeList
          }
        </SelectSize>
        <SelectQuantity aria-label="Select Quantity" id={'checkSelectQuantity'} onChange={chooseQuantity}>
          {
            qList.map((q, index) => {
              return (
                <option key={index}>{q}</option>
              );
            })
          }
        </SelectQuantity>
        <AddToCart style={{display: addToCartDisplay}} onClick={addToCart} aria-label="Add To Cart">
          {!currentCartItem ? 'Add To Cart ➕ ' : 'Added To Cart ✅ '}
        </AddToCart>
        <Favorite onClick={toggleLike} aria-label="Like or Favorite">
          {!currentLikedStyle ? '  ⭐  ' : '  ❤️  '}
        </Favorite>
      </DropdownDiv>
    </>
  );
};

export default DropdownDivComponent;