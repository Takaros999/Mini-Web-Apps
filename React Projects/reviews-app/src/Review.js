import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/fontawesome-free-solid";

const Review = (props) => {
  const [index, setIndex] = useState(0);
  const { reviews } = props;
  const { name, job, image, text } = reviews[index];

  const randomIndex = () => {
    const newIndex = Math.floor(Math.random() * reviews.length);
    setIndex(newIndex);
  };

  const nextPerson = () => {
    if (index === reviews.length - 1) {
      setIndex(0);
    } else {
      setIndex(index + 1);
    }
  };

  const prevPerson = () => {
    if (index === 0) {
      setIndex(reviews.length - 1);
    } else {
      setIndex(index - 1);
    }
  };

  return (
    <div className="container">
      <img src={image} alt="" />
      <h3>{name}</h3>
      <h4>{job}</h4>
      <p>{text}</p>
      <div className="icons">
        <FontAwesomeIcon
          icon={faAngleLeft}
          size="2x"
          className="angle-icon"
          onClick={prevPerson}
        />
        <FontAwesomeIcon
          icon={faAngleRight}
          size="2x"
          className="angle-icon"
          onClick={nextPerson}
        />
      </div>
      <button className="suprise-btn" onClick={randomIndex}>
        Suprise Me
      </button>
    </div>
  );
};

export default Review;
