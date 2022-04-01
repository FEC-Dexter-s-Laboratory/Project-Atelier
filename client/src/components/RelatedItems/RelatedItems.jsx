import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import RelatedCard from './RelatedCard.jsx';
const axios = require('axios');

const DivContainer = styled.div`
  border: 6px ridge darkblue;
  background-image: linear-gradient(to bottom right, cyan, deepskyblue);
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`;
// make GET /products/:product_id/related for related product ids, then
// make GET /products/:product_id for name, category, and
// GET /products/:product_id/styles for item where "default"?"
// is true and extract the original and sale price, and the photo/thumbnail url

const RelatedItems = function(props) {
  // function handlers, state, hooks, general javascript all goes here
  // var testData = [
  //   {
  //     name: "Air Minis 250",
  //     category: "Basketball Shoes",
  //   },
  //   {
  //     name: "Camo Onesie",
  //     category: "Jackets",
  //     thumbnail: "https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
  //   },
  // ]
  const [state, setState] = useState([]);

  useEffect(() => {
    let relatedProducts = [];
    // GET related ids
    axios.get(`/products/${props.currentId}/related`)
      .then(({ data }) => {
        // for each id, GET product details AND product style details for price
        let relatedIds = data;
        for (let i = 0; i < relatedIds.length; i++) {
          let product = {};
          axios.get(`/products/${relatedIds[i]}`)
            .then(({ data }) => {
              product.id = data.id;
              product.name = data.name;
              product.category = data.category;
            })
            .catch((err) => {
              console.log(err);
            })
            .then((
              axios.get(`/products/${relatedIds[i]}/styles`)
                .then(({ data }) => {
                  let styles = data.results;
                  // iterate over styles
                  for (let j = 0; j < styles.length; j++) {
                    // if object at "default?" === true
                    if (styles[i]['default?'] === true) {
                      // get prices, photos
                      product.original_price = styles[i].original_price;
                      product.sale_price = styles[i].sale_price;
                      product.photos = styles[i].photos;
                    }
                  }
                  relatedProducts.push(product);
                })
                .catch((err) => {
                  console.log(err);
                })
            ));
        }
      })
      .catch((err) => {
        console.log(err);
      });
    // setState(relatedProducts);
  }, []);

  return (
    <DivContainer>
      {state.map(product =>
        <RelatedCard product={product}  key={product.name} />
      )}
    </DivContainer>
  )
}

export default RelatedItems;