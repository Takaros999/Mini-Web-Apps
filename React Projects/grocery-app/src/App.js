import React, { useState, useReducer } from "react";
import uniqid from "uniqid";
import Modal from "./Modal";
//! change item with items array in state
const reducer = (state, action) => {
  switch (action.type) {
    case "ITEM_CHANGE":
      return { ...state, item: action.payload };
    case "FORM_SUBMIT":
      return { ...state, item: "" };
    default:
    // do nothing
  }
};
const initialState = {
  item: "",
  modalShow: false,
  modalContent: "",
};

function App() {
  const [items, setItems] = useState([]);
  // const [item, setItem] = useState("");
  const [state, dispatch] = useReducer(reducer, initialState);
  const handleSubmit = (e) => {
    e.preventDefault();
    const newItem = { id: uniqid(), name: state.item };
    setItems([...items, newItem]);
    dispatch({ type: "FORM_SUBMIT" });
  };

  return (
    <div className="container">
      {state.modalShow && <Modal content={state.modalContent} />}
      <h1>Grocery List</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="item"
          id="item"
          value={state.item}
          onChange={(e) =>
            dispatch({ type: "ITEM_CHANGE", payload: e.target.value })
          }
        />
        <button type="submit">Submit</button>
      </form>
      <ul>
        {items.map((item) => {
          return (
            <li key={item.id}>
              <p>{item.name}</p>
            </li>
          );
        })}
      </ul>
      <button>Clear Items</button>
    </div>
  );
}

export default App;
