import React, { useState, useEffect } from 'react';
import Overview from './Overview.jsx';
import RatingsAndReviews from './RatingsAndReviews.jsx';
import RelatedList from './RelatedItems/RelatedList.jsx';
import OutfitList from './RelatedItems/OutfitList.jsx';
import Search from './Search.jsx';
import QAndA from './QAndA.jsx';
import axios from 'axios';
// import { ProductIdContext } from './Contexts/ProductIdContext.jsx';

// const App = () => {
//   // function handlers, state, hooks, general javascript all goes here

//   const [isHovering, setIsHovering] = useState(false);
//   const [currentProductId, setCurrentProductId] = useState(1);

//   useEffect(() => {
//     // implement the desired hook effects here
//   }, []);

//   return (
//     <>
//       {/* <ProductIdContext.Provider value={{currentProductId, setCurrentProductId}}> */}
//         <Search />
//         <Overview />
//         {/* <RelatedItems />
//         <QAndA />
//         <RatingsAndReviews /> */}
//       {/* </ProductIdContext.Provider> */}
//     </>
//   );
// };

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productId: '65631'
    };
  }

  // componentDidMount() {
  //   axios({
  //     url: '/products'
  //   })
  // }

  render() {
    return (
      <>
        <Search />
        <Overview productId={this.state.productId} />
      </>
    );
  }
}

export default App;
