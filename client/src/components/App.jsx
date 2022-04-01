import React, { useState, useEffect } from 'react';
import Overview from './Overview.jsx';
import RatingsAndReviews from './RatingsAndReviews.jsx';
import RelatedList from './RelatedItems/RelatedList.jsx'; // changed to accomodate new folder
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
      {/* <Overview /> */}
      <RelatedList currentId={65637}/>
      {/* <QAndA />
      <RatingsAndReviews /> */}
    </>
  );
}

export default App;
