import React, { useState, useEffect } from 'react';
import Overview from './Overview.jsx';
import RatingsAndReviews from './RatingsAndReviews.jsx';
import RelatedList from './RelatedItems/RelatedList.jsx';
import OutfitList from './RelatedItems/OutfitList.jsx';
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
      <RelatedItems />
      <QAndA />
=======
<<<<<<< HEAD
<<<<<<< HEAD
      {/* <RelatedItems /> */}
      <QAndA />
=======
      <RelatedItems />
=======
      <RelatedList currentId={65632} />
      <OutfitList currentId={65632}/>
>>>>>>> bba457905f81ce7faf0cc98c9e442529f7ae6897
      {/* <QAndA /> */}
>>>>>>> 758b1d3e67987ca6216cf333a909fa43bfab7f90
>>>>>>> main
      <RatingsAndReviews />
    </>
  );
}

export default App;
