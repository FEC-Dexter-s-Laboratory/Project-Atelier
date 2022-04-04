import React from 'react';
import styled from 'styled-components';
import axios from 'axios';

const Table = styled.div`
  border: 2px solid black;
  width: 75%;
  margin: auto;
  text-align: center;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`;

const GridHeader = styled.div`
  text-align: center;
  display: grid;
  border: 2px solid black;
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
  // need the info at .features (will be an array of feature/value objects)
  // list out all features from both lists
  componentDidMount() {
    this.getFeatures(this.props.currentId, 0);
    this.getFeatures(this.props.comparedId, 1);
  }

  render() {
    console.log(this.state.features)
    return (
      <Table>
        <h3>Comparison</h3>
        <Grid>
          <GridHeader>{this.state.currentProd}</GridHeader>
          <GridHeader>Characteristics</GridHeader>
          <GridHeader>{this.state.comparedProd}</GridHeader>
          {Object.keys(this.state.features).map(feature =>
            <>
              <div>{this.state.features[feature][0]}</div>
              <div>{feature}</div>
              <div>{this.state.features[feature][1]}</div>
            </>
          )}
        </Grid>
      </Table>
    );
  }
}

export default Comparison;
