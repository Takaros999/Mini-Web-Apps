import React, { useState, useEffect } from "react";

const Tours = (props) => {
  const { id, name, image, info, price } = props.tour;
  const [readMore, setReadMore] = useState(false);

  const ToggleReadMore = () => {
    console.log("toggled");
    setReadMore(!readMore);
  };

  return (
    <>
      <img src={image} alt={name + "img"} />
      <div className="tour-info">
        <h4>{name}</h4>
        <h4 className="price">${price}</h4>
      </div>
      <p>
        {readMore ? info + " " : info.substring(0, 200) + "... "}
        <button className="read-me" onClick={ToggleReadMore}>
          {readMore ? "Read Less" : "Read More"}
        </button>
      </p>
      <button className="delete">Not Interested</button>
    </>
  );
};

export default Tours;
