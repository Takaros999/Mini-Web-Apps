import React, { useState } from "react";

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [people, setPeople] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && email) {
      const newPerson = { id: new Date().getTime().toString(), name, email };
      setPeople([...people, newPerson]);
      setName("");
      setEmail("");
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
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          name="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
