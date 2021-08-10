import React from "react";
import Review from "./Review";
import reviews from "./data";

function App() {
  return (
    <>
      <div className="header">
        <h1>Reviews</h1>
        <div className="underline"></div>
      </div>
      <Review reviews={reviews} />
      {/* <FontAwesomeIcon icon={faAngleLeft} />
      <FontAwesomeIcon icon={faAngleRight} />
      <FontAwesomeIcon icon={faQuoteLeft} /> */}
    </>
  );
}

export default App;
