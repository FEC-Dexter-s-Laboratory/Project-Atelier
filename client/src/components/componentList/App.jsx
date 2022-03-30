import React, { useState, useEffect } from 'react';
import Overview from './Overview.jsx';

const App = () => {
  // function handlers, state, hooks, general javascript all goes here

  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    // implement the desired hook effects here
  });

  return (
    <React.Fragment>
      <Overview />
    </React.Fragment>
  )
}

export default App;