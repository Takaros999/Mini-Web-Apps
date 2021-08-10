import React, { useState, useEffect } from "react";
import Tour from "./Tour";

const Tours = (props) => {
  const { tours, deleteTour } = props;

  return (
    <div>
      <ul>
        {tours.map((tour) => {
          return (
            <li key={tour.id} className="container">
              <Tour tour={tour} />
              <button className="delete" onClick={() => deleteTour(tour.id)}>
                Not Interested
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Tours;
