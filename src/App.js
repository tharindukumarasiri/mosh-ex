import React, { useEffect, useState } from "react";
import Movies from "./components/movies";
import Counters from "./components/counters";
import NavBar from "./components/navBar";
import ListGroup from "./components/listGroup";
import { getGenres } from "./services/fakeGenreService"

function App() {
  const [counters, setCounters] = useState([
    { id: 1, value: 0 },
    { id: 2, value: 0 },
    { id: 3, value: 0 },
    { id: 4, value: 0 },
  ]);

  const [sideMenuList, setSideMenueList] = useState([
    { _id: 1, name: "Counter page" },
    { _id: 2, name: "All Genres" },
  ]);
  const [currentPageId, setCurrentPageId] = useState(1)

  useEffect(() => {
    let newMenuList = [...sideMenuList];
    newMenuList.push(...getGenres());
    setSideMenueList([...newMenuList]);
  },[]);

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
    <main className="container">
      <div className="row justify-content-start">

        <div className="col-2">
          <ListGroup items={sideMenuList} selectedItemId={currentPageId} onSelectItem={(id) => { setCurrentPageId(id) }} />
        </div>
        { currentPageId === sideMenuList[0]._id &&
          <div className="col-10">
            <NavBar counterTotal={getCounterTotal()} />
            <button type="button" className="btn btn-primary mt-3 mb-3" onClick={() => { resetCounters() }}>
              Reset
            </button>
            <Counters
              counters={counters}
              increment={(c) => increment(c)}
              decrement={(c) => decrement(c)}
              deleteCount={(c) => deleteCount(c)}
            />
          </div>
        }
        { currentPageId !== sideMenuList[0]._id &&
          <div className="col-10">
            <Movies selectedGenreId={currentPageId} />
          </div>
        }
      </div>
    </main>
  );
}

export default App;
