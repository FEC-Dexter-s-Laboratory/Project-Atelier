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
            // need to make an axios post request to retain list when item is added (retain list that can be used to make cards)
            // axios.post('/product/outfit', this.state.outfits)
            //   .catch((err) => {
            //     console.log(err);
            //   });
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
  // need to make an axios get request on mount to get existing list (save list on server)
  componentDidMount() {
    // axios.get('/product/outfit')
    //   .then((response) => {
    //     this.setState({
    //       outfits: response.data
    //     });
    //   })
    //   .catch((err) => {
    //     console.log(error);
    //   });
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
