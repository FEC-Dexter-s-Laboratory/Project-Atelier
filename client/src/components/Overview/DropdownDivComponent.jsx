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
  background-image: linear-gradient(to right, grey, #ebe9e9);
  cursor: pointer;
  box-shadow: 10px 5px 5px black;
`;

const SelectQuantity = styled.select`
  font-family: 'Comfortaa';
  border-radius: 12px;
  grid-column: 2;
  grid-row: 2;
  margin: 3%;
  background-image: linear-gradient(to right, grey, #ebe9e9);
  cursor: pointer;
  box-shadow: 10px 5px 5px black;
`;

const AddToCart = styled.button`
  font-family: 'Comfortaa';
  border-radius: 12px;
  grid-column: 1;
  grid-row: 3;
  margin: 3%;
  background-image: linear-gradient(to right, grey, #ebe9e9);
  cursor: pointer;
  box-shadow: 10px 5px 5px black;
  transition: .2s;
  &:hover {
    transform: scale(1.10);
  }
`;

const Favorite = styled.button`
  font-family: 'Comfortaa';
  border-radius: 12px;
  grid-column: 2;
  grid-row: 3;
  margin: 3%;
  background-image: linear-gradient(to right, grey, #ebe9e9);
  cursor: pointer;
  box-shadow: 10px 5px 5px black;
  transition: .2s;
  &:hover {
    transform: scale(1.10);
  }
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