import React, { useState } from "react";
import List from "./List";
import data from "./data";

const App = () => {
  const [people, setPeople] = useState(data);
  return (
    <main>
      <section className="container">
        <h1>{people.length} birthdays today</h1>
        <List people={people} />
        <button
          id="clear-btn"
          onClick={() => {
            setPeople([]);
          }}
        >
          Clear all
        </button>
      </section>
    </main>
  );
};

export default App;
