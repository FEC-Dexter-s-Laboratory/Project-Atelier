import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const CartDiv = styled.div`
  border: 2px ridge grey;
  border-radius: 12px;
  padding: 5%;
  background-color: white;
  height: 90%;
  width: 90%;
  overflow-y: auto;
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

const Remove = styled.button`
  border: 1px solid #3d3c3c;
  border-radius: 12px;
  transition: .2s;
  &:hover {
    transform: scale(1.25);
  }
`;

const TotalDiv = styled.div`
  border: 2px ridge grey;
  border-radius: 12px;
  padding: 5%;
  background-color: white;
`;

const Total = styled.h3`
  color: #3d3c3c;
  text-align: center;
  font-family: 'Comfortaa';
`;

const CartItems = (props) => {
  const [cartItems, setCartItems] = useState([]);
  const [idToDelete, setIdToDelete] = useState('');
  const [cartIsEmpty, setCartIsEmpty] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);

  const getItemNames = (items) => {
    if (items.length > 0) {
      setCartIsEmpty(false);
    }
    setCartItems(items);
  };

  const removeItem = (e) => {
    console.log('cartItems be like ', cartItems);
    e.preventDefault();
    let id;
    let items = JSON.parse(window.localStorage.getItem('cart'));
    if (e.target.classList.length > 0) {
      for (let i = 0; i < e.target.classList.length; i++) {
        if (e.target.classList[i].includes('skuId')) {
          id = e.target.classList[i].slice(5);
          if (items.length === 1) {
            window.localStorage.setItem('cart', JSON.stringify([]));
            setCartIsEmpty(true);
          }
          for (let j = 0; j < items.length; j++) {
            if (items[j].skuId === Number(id)) {
              items.splice(j, 1);
              window.localStorage.setItem('cart', JSON.stringify(items));
              setIdToDelete(id);
              break;
            }
          }
          break;
        }
      }
    }
  };

  const getTotalPrice = (items) => {
    let total = 0;
    if (items.length === 0) {
      setTotalPrice(null);
    } else {
      for (let i = 0; i < items.length; i++) {
        total += items[i].price * items[i].count;
        console.log('current price ', items[i].price);
        console.log('current count ', items[i].count);
      }
      console.log(total);
      setTotalPrice(total);
    }
  };

  useEffect(() => {
    let items = JSON.parse(window.localStorage.getItem('cart'));
    if (items) {
      getTotalPrice(items);
      getItemNames(items);
    }
  }, [idToDelete, cartIsEmpty]);

  return (
    <CartDiv>
      <CartTitle>Items In Cart</CartTitle>
      <ListItems>
        {
          !cartIsEmpty ? cartItems.map(item => {
            return (
              <div key={item.skuId}>
                <li>
                  <h2>{`${item.name}: Style > ${item.style} | Size: ${item.size}`}</h2>
                  <h4>{`Count: ${item.count}`}</h4>
                  <hr />
                </li>
                <Remove className={`skuId${item.skuId}`} onClick={removeItem}>Remove From Cart</Remove>
              </div>
            );
          })
            : <h2 style={{textAlign: 'center', marginRight: '8%'}}>Cart is empty</h2>
        }
      </ListItems>
      <TotalDiv>
        <Total>
          {
            !totalPrice ? 'Cart is empty: No total price' : `Total Price is: $${totalPrice}`
          }
        </Total>
      </TotalDiv>
    </CartDiv>
  );
};

export default CartItems;