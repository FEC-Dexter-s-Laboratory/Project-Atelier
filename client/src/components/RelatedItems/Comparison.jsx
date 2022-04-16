import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import {Table, Grid, GridHeader, GridItem} from './Related&OutfitStyles.js';


class Comparison extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      features: {},
      currentProd: '',
      comparedProd: ''
    };
    this.getFeatures = this.getFeatures.bind(this);
  }

  getFeatures(id, position) {
    let currentChars = this.state.features;
    axios.get(`/products/${id}`)
      .then((response) => {
        let {data} = response;
        if (position === 0) {
          this.setState({
            currentProd: data.name
          });
        } else {
          this.setState({
            comparedProd: data.name
          });
        }
        let featList = data.features;
        for (let i = 0; i < featList.length; i++) {
          let currentFeat = featList[i].feature;
          if (featList[i].value !== null) {
            if (!currentChars[currentFeat]) {
              let tuple = ['', ''];
              tuple[position] = featList[i].value;
              if (tuple[position] === true) {
                tuple[position] = '&#10004;';
              }
              currentChars[currentFeat] = tuple;
            } else {
              currentChars[currentFeat][position] = featList[i].value;
            }
          }
        }
        this.setState({
          features: currentChars
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  componentDidMount() {
    this.getFeatures(this.props.mainId, 0);
    this.getFeatures(this.props.comparedId, 1);
  }

  render() {
    return (
      <Table>
        <h3>Comparing</h3>
        <Grid>
          <GridHeader>{this.state.currentProd}</GridHeader>
          <GridHeader></GridHeader>
          <GridHeader>{this.state.comparedProd}</GridHeader>
          {Object.keys(this.state.features).map(feature =>
            <>
              <GridItem>{this.state.features[feature][0]}</GridItem>
              <GridItem><b>{feature}</b></GridItem>
              <GridItem>{this.state.features[feature][1]}</GridItem>
            </>
          )}
        </Grid>
      </Table>
    );
  }
}

export default Comparison;
