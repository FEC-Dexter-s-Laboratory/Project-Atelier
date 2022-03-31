import React, { useState, useEffect } from 'react';
import Overview from './Overview.jsx';
import RatingsAndReviews from './RatingsAndReviews.jsx';
import RelatedItems from './RelatedItems.jsx';
import Search from './Search.jsx';
import QAndA from './QAndA.jsx';

const App = () => {
  // function handlers, state, hooks, general javascript all goes here

  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    // implement the desired hook effects here
  }, []);

  return (
    <React.Fragment>
      <Overview />
    </React.Fragment>
  )
}

export default App;