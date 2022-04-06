import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const CartDiv = styled.div`
  border: 2px ridge blue;
  padding: 5%;
`;

const CartTitle = styled.h1`
  font-family: 'Lobster-Two', cursive;
  color: white;
  text-align: center;
`;

const ListItems = styled.ul`
  color: white;
  text-align: center;
`;

const CartItems = (props) => {
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [productStyles, setProductStyles] = useState([]);

  const getItemNames = () => {
    axios({
      url: '/products',
      method: 'GET',
    })
      .then(res => {
        let { data } = res;
        console.log('product data be like ', data)
        let styles = [];
        data.forEach(product => {
          let productObj = {
            id: product.id,
            name: product.name,
          };
          axios({
            url: `/products/${product.id}/styles`,
            method: 'GET',
          })
            .then(res => {
              let { data } = res;
              console.log('data be like ', data);
              for (let i = 0; i < data.results.length; i++) {
                productObj['skus'] = [];
                for (const sku in data.results[i].skus) {
                  productObj['skus'].push(sku);
                }
              }
              styles.push(productObj);
            })
            .catch(err => console.error(err));
        });
        // console.log('styles be like ', styles);
        setProductStyles(styles);
      })
      .catch(err => console.error(err));

    // axios({
    //   url: `/products/${props.productId}/styles`,
    //   method: 'GET',
    // })
    //   .then(res => {
    //     let { data } = res;
    //     console.log('data be like ', data);
    //   })
    //   .catch(err => console.error(err));
  };

  const checkPStyles = () => {
    console.log('product styles be like ', productStyles);
  };

  useEffect(() => {
    let items = JSON.parse(window.localStorage.getItem('cart'));
    if (items) {
      getItemNames(items);
      setCartItems(items);
    }
  }, []);

  return (
    <CartDiv>
      <CartTitle onClick={checkPStyles}>Items In Cart</CartTitle>
      <ListItems>
        {
          cartItems.map(item => {
            return (
              <li key={item.skuId}>
                <h3>{item.skuId}<br />{item.count}</h3>
              </li>
            );
          })
        }
      </ListItems>
    </CartDiv>
  );
};

export default CartItems;