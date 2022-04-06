import React, { useState, useEffect } from 'react';
import Overview from './Overview/Overview.jsx';
import Reviews from './Reviews/Reviews.jsx';
import RelatedList from './RelatedItems/RelatedList.jsx';
import OutfitList from './RelatedItems/OutfitList.jsx';
import Search from './Search.jsx';
import QandA from './QandA.jsx';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productId: '65633',
      qtys: {},
      cart: {},
    };
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
        <Search />
        <Overview productId={this.state.productId} qtys={this.state.qtys} />
        <RelatedList currentId={this.state.productId} />
        <QandA />
      </>
    );
  }

}

export default App;
