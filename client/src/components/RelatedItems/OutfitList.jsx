/* eslint-disable camelcase */
import React from 'react';
import Carousel from './Carousel.jsx';
import styled from 'styled-components';
import axios from 'axios';
import {DivContainer} from './Related&OutfitStyles.js';

class OutfitList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      outfits: [{id: 'default'}],
      use: 'outfit'
    };
    this.getCardInfo = this.getCardInfo.bind(this);
    this.handleDefaultClick = this.handleDefaultClick.bind(this);
    this.handleOutfitClick = this.handleOutfitClick.bind(this);
  }
  getCardInfo() {
    // weed out if this card is already in list
    let exists = false;
    for (let i = 0; i < this.state.outfits.length; i++) {
      if (this.state.outfits[i].id === this.props.currentId) {
        exists = true;
      }
    }
    if (exists === true) {
      return;
    } else {
      // get all info to make new card
      let product = {};
      axios.get(`/products/${this.props.currentId}`)
        .then((response) => {
          let {data} = response;
          product.id = data.id.toString();
          product.name = data.name;
          product.category = data.category;
        })
        .catch((err) => {
          console.log(err);
        })
        .then(
          // get review ratings for each product
          axios.get(`/reviews/meta/${this.props.currentId}`)
            .then((response) => {
              let {data} = response;
              product.ratings = data.ratings;
            })
            .catch((err) => {
              console.log(err);
            })
            .then(
              axios.get(`/products/${this.props.currentId}/styles`)
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
                  let newOutfits = this.state.outfits;
                  newOutfits.push(product);
                  this.setState({
                    outfits: newOutfits
                  });
                  // store updated outfit list to local storage
                  localStorage.setItem('outfits', JSON.stringify(newOutfits));
                })
                .catch((err) => {
                  console.log(err);
                })
            )
        );
    }
  }
  // make onClick for default card (adds current product to outfits list)
  handleDefaultClick(event) {
    event.preventDefault();
    this.getCardInfo();
  }

  // onClick for action button (removes clicked outfit from storage)
  handleOutfitClick(event, outfitId) {
    event.preventDefault();
    let currentOutfits = this.state.outfits;
    for (let i = 0; i < currentOutfits.length; i++) {
      if (currentOutfits[i].id === outfitId) {
        currentOutfits.splice(i, 1);
      }
    }
    this.setState({
      outfits: currentOutfits
    });
    localStorage.setItem('outfits', JSON.stringify(currentOutfits));
  }

  // retreive outfits from local memory
  componentDidMount() {
    if (!localStorage.getItem('outfits')) {
      localStorage.setItem('outfits', JSON.stringify(this.state.outfits));
    } else {
      let retreived = JSON.parse(localStorage.getItem('outfits'));
      this.setState({
        outfits: retreived
      });
    }
  }

  render() {
    return (
      <DivContainer>
        <h3>Your Outfit</h3>
        <Carousel products={this.state.outfits} handleDefaultClick={this.handleDefaultClick} use={this.state.use} handleOutfitClick={this.handleOutfitClick} handleCardClick={this.props.handleCardClick} />
      </DivContainer>
    );
  }
}

export default OutfitList;
