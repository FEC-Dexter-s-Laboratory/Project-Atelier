import React, { useState, useEffect } from 'react';
import Overview from './Overview.jsx';
import RatingsAndReviews from './RatingsAndReviews.jsx';
import RelatedItems from './RelatedItems/RelatedItems.jsx'; // changed to accomodate new folder
import Search from './Search.jsx';
import QAndA from './QAndA.jsx';

function App() {
  // function handlers, state, hooks, general javascript all goes here

  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    // implement the desired hook effects here
  }, []);

  return (
    <>
      <Search />
      <Overview />
<<<<<<< HEAD
      {/* <RelatedItems /> */}
      <QAndA />
=======
      <RelatedItems />
      {/* <QAndA /> */}
>>>>>>> 758b1d3e67987ca6216cf333a909fa43bfab7f90
      <RatingsAndReviews />
    </>
  );
}

export default App;
