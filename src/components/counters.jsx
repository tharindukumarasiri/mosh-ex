import React from "react";
import Counter from "./counter";

export default function Counters({ counters, increment, decrement, deleteCount }) {
  return (
    <div className="container">
      {counters.map((count) => {
        return <Counter key={count.id} counter={count} increment={(c) => increment(c)}  decrement={(c) => decrement(c)} deleteCount={(c) => deleteCount(c)}/>;
      })}
    </div>
  );
}
