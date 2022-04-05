/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import RelatedCard from './RelatedCard.jsx';
import Carousel from './Carousel.jsx';
import axios from 'axios';

const DivContainer = styled.div`
  margin: auto;
  width: 50%;
`;

class RelatedItems extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      relatedList: [],
      // change current id to be the prop passed from app
      currentId: this.props.currentId,
      use: 'compare'
    };
  }

  componentDidMount() {
    let relatedProducts = [];
    // GET related ids (currently using testId, change later!)
    axios.get(`/products/${this.state.currentId}/related`)
      .then(({ data }) => {
        // for each id, GET product details
        let relatedIds = data;
        for (let i = 0; i < relatedIds.length; i++) {
          let product = {};
          axios.get(`/products/${relatedIds[i]}`)
            .then((response) => {
              let { data } = response;
              product.id = data.id;
              product.name = data.name;
              product.category = data.category;
            })
            .catch((err) => {
              console.log(err);
            })
            .then((
              // for each product, look up all styles to find default style for price check
              axios.get(`/products/${relatedIds[i]}/styles`)
                .then((response) => {
                  let { data } = response;
                  let styles = data.results;
                  let foundDefault = false;
                  for (let j = 0; j < styles.length; j++) {
                    if (styles[j]['default?'] === true) {
                      product.original_price = styles[j].original_price;
                      product.sale_price = styles[j].sale_price;
                      product.photos = styles[j].photos;
                      foundDefault = true;
                    }
                  }
                  if (foundDefault === false) {
                    product.original_price = styles[0].original_price;
                    product.sale_price = styles[0].sale_price;
                    product.photos = styles[0].photos;
                  }
                  relatedProducts.push(product);
                  this.setState({
                    relatedList: relatedProducts
                  });
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
  }

  render() {
    return (
      <DivContainer>
        <h3>Related Items</h3>
        <Carousel products={this.state.relatedList} use={this.state.use} />
      </DivContainer>
    );
  }
}

export default RelatedItems;
