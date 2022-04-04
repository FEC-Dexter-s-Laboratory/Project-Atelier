import React from 'react';
import Carousel from './Carousel.jsx';
import styled from 'styled-components';
import axios from 'axios';

const DivContainer = styled.div`
  margin: auto;
  width: 50%;
`;

class OutfitList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      outfits: [{id: 'default'}],
      // change currentId based on prop passed from App
      currentId: this.props.currentId
    };
    this.getCardInfo = this.getCardInfo.bind(this);
    this.handleDefaultClick = this.handleDefaultClick.bind(this);
  }
  getCardInfo() {
    // weed out if this card is already in list
    for (let i = 0; i < this.state.outfits.length; i++) {
      if (this.state.outfits[i].id === this.state.currentId) {
        return;
      }
    }
    // get all info to make new card
    let product = {};
    axios.get(`/products/${this.state.currentId}`)
      .then((response) => {
        let {data} = response;
        product.id = data.id;
        product.name = data.name;
        product.category = data.category;
      })
      .catch((err) => {
        console.log(err);
      })
      .then(() => {
        axios.get(`/products/${this.state.currentId}/styles`)
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
          });
      });
  }
  // make onClick for default card (adds current product to outfits list)
  handleDefaultClick(event) {
    event.preventDefault();
    this.getCardInfo();
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
        <Carousel products={this.state.outfits} handleDefaultClick={this.handleDefaultClick} />
      </DivContainer>
    );
  }
}

export default OutfitList;
