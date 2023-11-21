import React from "react";
import Home from './Home'; // Import the existing Home component

const HomePage = (props) => {
  return (
    <div>
      <Home {...props} /> {/* Render the existing Home component here */}
    </div>
  );
};

export default HomePage;