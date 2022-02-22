import React, { useEffect, useState } from "react";
import { getMovies } from "../services/fakeMovieService";
import LikeButton from "./Common/likeButton";
import SortIcon from "./Common/sortIcon";
import ListGroup from "./listGroup";
import Pagination from "./Common/pagination";
import { paginate } from "./utils/paginate";
import { getGenres } from "../services/fakeGenreService";
import _ from "lodash";

const pageSize = 4;
let shortMovieList;

export default function Movies() {
  const [selectedGenreId, setSelectedGenreId] = useState(1);
  const [pageNumber, setPageNumber] = useState(1);
  const [movies, setMovies] = useState(getMovies());
  const [sort, setSort] = useState({ sortBy: "title", order: "asc" })
  const [sideMenuList, setSideMenueList] = useState([
    { _id: 2, name: "All Genres" },
  ]);

  useEffect(() => {
    let newMenuList = [...sideMenuList];
    newMenuList.push(...getGenres());
    setSideMenueList([...newMenuList]);
  }, []);

  useEffect(() => {
    if (shortMovieList.length === 0) {
      setPageNumber(pageNumber - 1)
    }
  }, [shortMovieList]);

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

  const sortTable = (sortBy) => {
    if (sortBy === sort.sortBy) {
      setSort({ sortBy: sortBy, order: sort.order === "asc" ? "desc" : "asc" })
    } else {
      setSort({ sortBy: sortBy, order: sort.order })
    }
  }

  if (movies.length > 0) {
    let genreFilteredMovieList = movies.filter(movie => { return movie.genre._id === selectedGenreId })
    if (genreFilteredMovieList.length === 0) genreFilteredMovieList = movies
    const sortedMovieList = _.orderBy(genreFilteredMovieList, [sort.sortBy], [sort.order])
    shortMovieList = paginate(sortedMovieList, pageNumber, pageSize)

    return (
      <React.Fragment>
        <div className="row">
          <div className="col-2">
            <ListGroup items={sideMenuList} selectedItemId={selectedGenreId} onSelectItem={(id) => { setSelectedGenreId(id); setPageNumber(1) }} />
          </div>
          <div className="col">
            <p className="fs-2">Showing {sortedMovieList.length} movies in the database</p>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col" className="clickale" onClick={() => { sortTable("title") }}>Title <SortIcon header={"title"} sort={sort} /></th>
                  <th scope="col" className="clickale" onClick={() => { sortTable("genre.name") }}>Genre <SortIcon header={"genre.name"} sort={sort} /></th>
                  <th scope="col" className="clickale" onClick={() => { sortTable("numberInStock") }}>Stock <SortIcon header={"numberInStock"} sort={sort} /></th>
                  <th scope="col" className="clickale" onClick={() => { sortTable("dailyRentalRate") }}>Rate <SortIcon header={"dailyRentalRate"} sort={sort} /></th>
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
            <Pagination items={sortedMovieList} pageSize={pageSize} pageNumber={pageNumber} onChangePage={(val) => setPageNumber(val)} />
          </div>
        </div>
      </React.Fragment>
    );
  } else {
    return (
      <p className="fs-2">There are no movies in the database</p>);
  }
}
