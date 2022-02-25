import React from "react";
import Movies from "./components/movies";
import Counters from "./components/counters";
import NavBar from "./components/navBar";
import Movie from "./components/movie";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/home";
import NotFound from "./components/notFound";
import Login from "./components/login";

function App() {
  return (
    <div>
      <NavBar />
      <div className="content m-5">
        <Routes>
          <Route path='/movies/:id' element={<Movie />} />
          <Route path='/movies' element={<Movies />} />
          <Route path='/counters' element={<Counters />} />
          <Route path='/not-found' element={<NotFound />} />
          <Route path='/login' element={<Login />} />
          <Route path='/home' element={<Navigate to="/" />} />
          <Route path='/' element={<Home />} />
          <Route path="*" element={<NotFound/>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
