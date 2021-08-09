import React, { useState, useEffect } from "react";
import Tours from "./Tours";
import Loading from "./Loading";

// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = "https://course-api.com/react-tours-project";
function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [tours, setTours] = useState([]);

  const deleteTour = (id) => {
    const newTours = tours.filter((tour) => tour.id !== id);
    setTours(newTours);
  };

  useEffect(() => {
    fetch(url)
      .then((resp) => resp.json())
      .then((data) => {
        // console.log(data);
        setTours(data);
        setIsLoading(false);
      })
      .catch((err) => {
        throw err;
      });
  }, []);

  if (isLoading) {
    return <Loading />;
  }
  if (tours.length == 0) {
    return (
      <>
        <h1>No Tours Left</h1>
      </>
    );
  }
  return (
    <>
      <h1>Tours</h1>
      <div className="underline"></div>
      <Tours tours={tours} deleteTour={deleteTour} />
    </>
  );
}

export default App;
