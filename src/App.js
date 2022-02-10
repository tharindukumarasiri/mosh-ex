import React, { useState } from "react";
import Movies from "./components/movies";
import Counters from "./components/counters";
import NavBar from "./components/navBar";

function App() {
  const [counters, setCounters] = useState([
    { id: 1, value: 0 },
    { id: 2, value: 0 },
    { id: 3, value: 0 },
    { id: 4, value: 0 },
  ]);

  const increment = (counter) => {
    const newCounters = [...counters];
    const index = counters.indexOf( counter );
    newCounters[index].value++;
    setCounters([...newCounters]);
  };

  const decrement = (counter) => {
    const newCounters = [...counters];
    const index = counters.indexOf( counter );
    newCounters[index].value--;
    setCounters([...newCounters]);
  };

  const deleteCount = (counter) => {
    const newCounters = counters.filter((c) => {
      return c.id != counter.id;
    });
    setCounters([...newCounters]);
  };

  const getCounterTotal = () => {
    const countersWithValues = counters.filter((counter) => {
      return counter.value > 0;
    });
    return countersWithValues.length;
  };

  const resetCounters = () => {
    const conterResetState = counters.map((counter) => {
      return {id: counter.id, value: 0}
    } )
    setCounters([...conterResetState])
  };

  return (
    <main className="container">
      <NavBar counterTotal={getCounterTotal()} />
      <button type="button" className="btn btn-primary mt-3 mb-3" onClick={() => {resetCounters()}}>
        Reset
      </button>
      <Counters
        counters={counters}
        increment={(c) => increment(c)}
        decrement={(c) => decrement(c)}
        deleteCount={(c) => deleteCount(c)}
      />
      <Movies/>
    </main>
  );
}

export default App;
