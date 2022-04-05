import React, { useState, useEffect } from 'react';
import Overview from './Overview.jsx';
import RatingsAndReviews from './RatingsAndReviews.jsx';
import RelatedList from './RelatedItems/RelatedList.jsx';
import OutfitList from './RelatedItems/OutfitList.jsx';
import Search from './Search.jsx';
import QAndA from './QAndA.jsx';
import axios from 'axios';
// import { ProductIdContext } from './Contexts/ProductIdContext.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productId: '65631',
      qtys: {},
    };
  }

  componentDidMount() {
    axios({
      url: `/products/${this.state.productId}/styles`,
      method: 'GET'
    })
      .then(res => {
        this.setState({
          productId: this.state.productId,
          qtys: res.data.results[0].skus,
        });
      })
      .catch(err => console.error(err));
  }

  render() {
    return (
      <>
        <Search />
        <Overview productId={this.state.productId} qtys={this.state.qtys} />
      </>
    );
  }
}

export default App;
