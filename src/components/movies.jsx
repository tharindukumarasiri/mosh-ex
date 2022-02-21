import React, { useEffect, useState } from "react";
import { getMovies } from "../services/fakeMovieService";
import LikeButton from "./Common/likeButton";
import Pagination from "./Common/pagination";
import { paginate } from "./utils/paginate";

const pageSize = 4;
let shortMovieList;

export default function Movies({selectedGenreId, pageNumber, setPageNumber}) {
  const [movies, setMovies] = useState(getMovies());

  useEffect( () => {
    if(shortMovieList.length === 0){
      setPageNumber(pageNumber -1)
    }
  },[shortMovieList]);

  const deleteMovie = (id) => {
    const newMovies = movies;
    newMovies.splice(
      newMovies.findIndex((movie) => {
        return movie._id === id;
      }),
      1
    );
    setMovies([...newMovies]);
  };

  const onLikeBtnClicked = (movie) => {
    let newMovies = movies;
    const index = newMovies.indexOf(movie)

    newMovies[index].liked = !newMovies[index].liked;
    setMovies([...newMovies]);
  }

  if (movies.length > 0) {
    let genreFilteredMovieList = movies.filter(movie => {return movie.genre._id === selectedGenreId} )
    if(genreFilteredMovieList.length === 0  ) genreFilteredMovieList = movies
    shortMovieList = paginate(genreFilteredMovieList, pageNumber, pageSize)
    // if(shortMovieList.length === 0) setPageNumber(pageNumber -1)

    return (
      <React.Fragment>
        <p className="fs-2">Showing {genreFilteredMovieList.length} movies in the database</p>
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
            {shortMovieList.map((movie) => {
              return (
                <tr key={movie._id}>
                  <td>{movie.title}</td>
                  <td>{movie.genre.name}</td>
                  <td>{movie.numberInStock}</td>
                  <td>{movie.dailyRentalRate}</td>
                  <td>
                    <LikeButton liked={movie.liked} onClick={() => { onLikeBtnClicked(movie) }} />
                  </td>
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
        <Pagination items={genreFilteredMovieList}  pageSize={pageSize} pageNumber={pageNumber} onChangePage={(val) => setPageNumber(val)} />
      </React.Fragment>
    );
  } else {
    return (
      <p className="fs-2">There are no movies in the database</p>);
  }
}
