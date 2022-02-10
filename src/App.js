import React, { useState } from "react";
import Movies from "./components/movies";
import Counters from "./components/counters";

function App() {
  const [counters, setCounters] = useState([
    { id: 1, value: 0 },
    { id: 2, value: 0 },
    { id: 3, value: 0 },
    { id: 4, value: 0 },
  ]);

  const increment = (counter) => {
    const newCounters = counters;
    newCounters[counter.id - 1].value= counter.value + 1;
    setCounters([...newCounters]);
  }

  const decrement = (counter) => {
    const newCounters = counters;
    newCounters[counter.id - 1].value= counter.value - 1;
    setCounters([...newCounters]);
  }

  const deleteCount = (counter) => {
    let newCounters = counters.filter( (c) => { return c.id != counter.id} );
    setCounters([...newCounters]);
  }

  return (
    <main className="container">
      <Counters counters={counters} increment={(c) => increment(c)}  decrement={(c) => decrement(c)} deleteCount={(c) => deleteCount(c)} />
    </main>
  );
}

export default App;
