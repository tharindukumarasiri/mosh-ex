import React, {useState} from "react";
import Counter from "./counter";

export default function Counters() {
  const [counters, setCounters] = useState([
    { id: 1, value: 0 },
    { id: 2, value: 0 },
    { id: 3, value: 0 },
    { id: 4, value: 0 },
  ]);
  const increment = (counter) => {
    const newCounters = [...counters];
    const index = counters.indexOf(counter);
    newCounters[index].value++;
    setCounters([...newCounters]);
  };

  const decrement = (counter) => {
    const newCounters = [...counters];
    const index = counters.indexOf(counter);
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
    const counterResetState = counters.map((counter) => {
      return { id: counter.id, value: 0 }
    })
    setCounters([...counterResetState])
  };
  return (
    <div className="container">
      <h3>Counter Total <span className="badge bg-secondary">{getCounterTotal()}</span></h3>
      <button type="button" className="btn btn-primary mt-3 mb-3" onClick={() => { resetCounters() }}>
        Reset
      </button>
      {counters.map((count) => {
        return <Counter key={count.id} counter={count} increment={(c) => increment(c)} decrement={(c) => decrement(c)} deleteCount={(c) => deleteCount(c)} />;
      })}
    </div>
  );
}
