import React, { useState, useEffect } from "react";
import Tour from "./Tour";

const Tours = (props) => {
  const { tours } = props;
  // console.log("tours");
  // console.log(tours);

  return (
    <div>
      <ul>
        {tours.map((tour) => {
          return (
            <li key={tour.id} className="container">
              <Tour tour={tour} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Tours;
