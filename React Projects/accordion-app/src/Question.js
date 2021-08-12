import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/fontawesome-free-solid";

const Question = (props) => {
  const { title, info } = props.question;
  const [showMore, setShowMore] = useState(false);
  return (
    <li>
      <div className="q-header">
        <h2>{title}</h2>
        <FontAwesomeIcon
          icon={showMore ? faMinus : faPlus}
          size="lg"
          onClick={() => setShowMore(!showMore)}
          className="icon"
        />
      </div>
      {showMore && <p>{info}</p>}
    </li>
  );
};

export default Question;
