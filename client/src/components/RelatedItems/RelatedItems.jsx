import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import RelatedCard from './RelatedCard.jsx';

const DivContainer = styled.div`
  border: 6px ridge darkblue;
  background-image: linear-gradient(to bottom right, cyan, deepskyblue);
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`;
// in app, make GET /products/:product_id/related for related product ids, then
// make GET /products/:product_id for name, category, and GET /products/:product_id/styles
// for item where "default"?" is true
// is true and extract the original and sale price, and the photo/thumbnail url
// props received is an array of objects
const RelatedItems = (props) => {
  // function handlers, state, hooks, general javascript all goes here
  var testData = [
    {
      name: "Air Minis 250",
      category: "Basketball Shoes",
    },
    {
      name: "Camo Onesie",
      category: "Jackets",
      thumbnail: "https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
    },
  ]
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    // implement desired hook effects here
  }, [isClicked]);

  return (
    <DivContainer>
      {testData.map(product =>
        <RelatedCard product={product}  key={testData.name} />
      )}
    </DivContainer>
  )
}

export default RelatedItems;