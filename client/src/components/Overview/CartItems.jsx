import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const CartDiv = styled.div`
  border: 2px ridge grey;
  border-radius: 12px;
  padding: 5%;
  background-color: white;
`;

const CartTitle = styled.h1`
  font-family: 'Lobster-Two', cursive;
  color: #3d3c3c;
  text-align: center;
`;

const ListItems = styled.ul`
  color: #3d3c3c;
  text-align: center;
  font-family: 'Comfortaa';
`;

const CartItems = (props) => {
  const [cartItems, setCartItems] = useState([]);

  const getItemNames = (items) => {
    setCartItems(items);
  };

  useEffect(() => {
    let items = JSON.parse(window.localStorage.getItem('cart'));
    if (items) {
      getItemNames(items);
    }
  }, []);

  return (
    <CartDiv>
      <CartTitle>Items In Cart</CartTitle>
      <ListItems>
        {
          cartItems.map(item => {
            return (
              <li key={item.skuId}>
                <h2>{`${item.name}: Style > ${item.style} | Size: ${item.size}`}</h2>
                <h4>{`Count: ${item.count}`}</h4>
                <hr />
              </li>
            );
          })
        }
      </ListItems>
    </CartDiv>
  );
};

export default CartItems;