import React from "react";
import Movies from "./components/movies";
import Counters from "./components/counters";
import NavBar from "./components/navBar";
import { Routes, Route, Navigate  } from "react-router-dom";
import Home from "./components/home";
import NotFound from "./components/notFound";

function App() {
  return (
    <div className="container">
      <NavBar />
      <div className="content">
        <Routes>
          <Route path='/movies' element={<Movies />} />
          <Route path='/counters' element={<Counters />} />
          <Route path='/not-found' element={<NotFound />} />
          <Route path='/' element={<Home />} />
          <Route path="*" element={<Navigate to ="/not-found" />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
