import React, { useState, useEffect } from "react";
import questions from "./data";
import Question from "./Question";

function App() {
  return (
    <div className="main-container">
      <h1>Questions And Answers About Login</h1>
      <ul>
        {questions.map((question) => {
          return <Question key={question.id} question={question} />;
        })}
      </ul>
    </div>
  );
}

export default App;
