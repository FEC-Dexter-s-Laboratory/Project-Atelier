import React from 'react';
import styled from 'styled-components';
import axios from 'axios';

const Table = styled.div`
  width: 100%;
  margin: auto;
  text-align: center;
  font-family: Comfortaa;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`;

const GridHeader = styled.div`
  text-align: center;
  display: grid;
  font-weight: bold;
`;

const GridItem = styled.div`
  text-align: center;
  border: 1px solid black;
`;

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
        // for each feature of this product
        for (let i = 0; i < featList.length; i++) {
          let currentFeat = featList[i].feature;
          if (featList[i].value !== null) {
            // if feature doesn't already exist in current characteristics, add it
            if (!currentChars[currentFeat]) {
              let tuple = ['', ''];
              tuple[position] = featList[i].value;
              if (tuple[position] === true) {
                tuple[position] = '&#10004;';
              }
              currentChars[currentFeat] = tuple;
            // else add the value in the correct position
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

  // make API calls for products at /product/product_id
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
