import React, { useState } from "react";

function App() {
  const defPerson = { name: "", email: "", age: "" };
  const [person, setPerson] = useState(defPerson);
  const [people, setPeople] = useState([]);

  const handleChange = (e) => {
    setPerson({ ...person, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (person.name && person.email && person.age) {
      const newPerson = { ...person, id: new Date().getTime().toString() };
      setPeople([...people, newPerson]);
      setPerson(defPerson);
    } else {
      console.log("empty form");
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          name="name"
          id="name"
          value={person.name}
          onChange={handleChange}
        />
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          name="email"
          id="email"
          value={person.email}
          onChange={handleChange}
        />
        <label htmlFor="age">Age:</label>
        <input
          type="text"
          name="age"
          id="age"
          value={person.age}
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
      </form>
      <ul>
        {people.map((person) => {
          return (
            <li key={person.id}>
              <h4>{person.name}</h4>
              <p>{person.email}</p>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default App;
