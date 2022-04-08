import React, { useState, useEffect } from 'react';
import Overview from './Overview/Overview.jsx';
import Reviews from './Reviews/Reviews.jsx';
import RelatedList from './RelatedItems/RelatedList.jsx';
import OutfitList from './RelatedItems/OutfitList.jsx';
import Search from './Search.jsx';
import QandA from './QAndA.jsx';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productId: '65633',
      qtys: {},
      cart: {},
    };
    this.handleCardClick = this.handleCardClick.bind(this);
  }

  handleCardClick(clickedId) {
    let newId = clickedId.toString();
    this.setState({
      productId: newId
    });
  }

  componentDidMount() {
    axios({
      url: `/products/${this.state.productId}/styles`,
      method: 'GET',
    })
      .then(res => {
        this.setState({
          productId: this.state.productId,
          qtys: res.data.results[0].skus,
          cart: this.state.cart,
        });
      })
      .catch(err => console.error(err));
  }

  addToCart(item) {
    // add selected style to cart in state and localStorage
  }


  render() {
    return (
      <>
        {/* <Search productId={this.state.productId} /> */}
        {/* <Overview productId={this.state.productId} qtys={this.state.qtys} /> */}
        {/* <RelatedList currentId={this.state.productId} handleCardClick={this.handleCardClick} /> */}
        {/* <OutfitList currentId={this.state.productId} handleCardClick={this.handleCardClick} /> */}
        {/* <QandA currentId={this.state.productId}/> */}
        <Reviews currentId={this.state.productId} />
      </>
    );
  }
}

export default App;
