import React, { useState, useEffect } from 'react';
import Overview from './Overview/Overview.jsx';
import Reviews from './Reviews/Reviews.jsx';
import RelatedList from './RelatedItems/RelatedList.jsx';
import OutfitList from './RelatedItems/OutfitList.jsx';
import QandA from './QAndA.jsx';
import BlueSteelModal from './BlueSteelModal.jsx';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productId: '65631',
      qtys: {},
      styleId: 404874,
      modal: true,
      modalImage: 'https://i0.wp.com/obeygiant.com/images/2016/02/Zoolander_Blue-Steel-18X24-01-602x800-1.jpg?fit=602%2C800&ssl=1',
    };
    this.handleCardClick = this.handleCardClick.bind(this);
    this.setStyle = this.setStyle.bind(this);
    this.onClose = this.onClose.bind(this);
  }

  onClose() {
    this.setState({
      productId: this.state.productId,
      qtys: this.state.qtys,
      styleId: this.state.styleId,
      modal: false,
      modalImage: this.state.modalImage,
    });
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
          styleId: this.state.styleId,
          modal: true,
          modalImage: this.state.modalImage,
        });
      })
      .catch(err => console.error(err));
  }

  setStyle(id) {
    this.setState({
      productId: this.state.productId,
      qtys: this.state.qtys,
      styleId: id,
    });
  }

  render() {
    return (
      <>
        <BlueSteelModal modal={this.state.modal} modalImage={this.state.modalImage} onClose={() => {
          this.onClose();
        }} />
        <Overview setStyle={this.setStyle} productId={this.state.productId} qtys={this.state.qtys} />
        <RelatedList currentId={this.state.productId} handleCardClick={this.handleCardClick} />
        <OutfitList currentId={this.state.productId} handleCardClick={this.handleCardClick} />
        <QandA currentId={this.state.productId}/>
        <Reviews currentId={this.state.productId} />
      </>
    );
  }
}

export default App;
