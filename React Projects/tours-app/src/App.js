import React, { useState, useEffect } from "react";
import Tours from "./Tours";
import Loading from "./Loading";

// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = "https://course-api.com/react-tours-project";
function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [tours, setTours] = useState([]);

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

  return (
    <>
      <h1>Tours</h1>
      <Tours tours={tours} />
    </>
  );
}

export default App;
