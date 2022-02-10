import React, { useState } from "react";
import { getMovies } from "../services/fakeMovieService";

export default function Movies() {
  const [movies, setMovies] = useState(getMovies());

  const deleteMovie = (id) => {
    movies.splice(
      movies.findIndex((movie) => {
        return movie._id === id;
      }),
      1
    );
    setMovies([...movies]);
  };

  if (movies.length > 0) {
    return (
      <React.Fragment>
        <p className="fs-2">Showing {movies.length} movies in the database</p>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Genre</th>
              <th scope="col">Stock</th>
              <th scope="col">Rate</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {movies.map((movie) => {
              return (
                <tr key={movie._id}>
                  <td>{movie.title}</td>
                  <td>{movie.genre.name}</td>
                  <td>{movie.numberInStock}</td>
                  <td>{movie.dailyRentalRate}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => deleteMovie(movie._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </React.Fragment>
    );
  } else {
    return (
        <p className="fs-2">There are no movies in the database</p>);
  }
}
