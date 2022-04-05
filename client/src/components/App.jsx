import React, { useState, useEffect } from 'react';
import Overview from './Overview.jsx';
import RatingsAndReviews from './RatingsAndReviews.jsx';
import RelatedList from './RelatedItems/RelatedList.jsx';
import OutfitList from './RelatedItems/OutfitList.jsx';
import Search from './Search.jsx';
import QandA from './QandA.jsx';

function App() {
  // function handlers, state, hooks, general javascript all goes here

  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    // implement the desired hook effects here
  }, []);

  return (
    <>
      {/* <Search />
      <Overview />
      <RelatedList currentId={65632} />
      <OutfitList currentId={65632}/> */}
      <QandA />
      {/* <RatingsAndReviews /> */}
    </>
  );
}

export default App;
