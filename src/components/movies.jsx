import React, { useEffect, useState } from "react";
import { getMovies } from "../services/fakeMovieService";
import LikeButton from "./Common/likeButton";
import SortIcon from "./Common/sortIcon";
import ListGroup from "./listGroup";
import Pagination from "./Common/pagination";
import { paginate } from "./utils/paginate";
import { getGenres } from "../services/fakeGenreService";
import _ from "lodash";
import { Link, useNavigate } from "react-router-dom";

const pageSize = 4;
let shortMovieList;
let filteredMovieList;

export default function Movies() {
  const [selectedGenreId, setSelectedGenreId] = useState(2);
  const [pageNumber, setPageNumber] = useState(1);
  const [movies, setMovies] = useState(getMovies());
  const [sort, setSort] = useState({ sortBy: "title", order: "asc" })
  const [sideMenuList, setSideMenueList] = useState([
    { _id: 2, name: "All Genres" },
  ]);
  const [searchText, setSearchText] = useState('')

  const navigate = useNavigate();

  useEffect(() => {
    let newMenuList = [...sideMenuList];
    newMenuList.push(...getGenres());
    setSideMenueList([...newMenuList]);
  }, []);

  useEffect(() => {
    if (shortMovieList.length === 0 && pageNumber > 1) {
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

  const onSearchText = (e) => {
    setSelectedGenreId(1);
    setPageNumber(1);
    filteredMovieList = movies.filter(movie => { return movie.title.toUpperCase().includes(e.target.value.toUpperCase()) });
    setSearchText(e.target.value);
  }

  if (movies.length > 0) {
    if(selectedGenreId !== 1){
      filteredMovieList = movies.filter(movie => { return movie.genre._id === selectedGenreId })
      if (filteredMovieList.length === 0) filteredMovieList = movies
    }
    const sortedMovieList = _.orderBy(filteredMovieList, [sort.sortBy], [sort.order])
    shortMovieList = paginate(sortedMovieList, pageNumber, pageSize)

    return (
      <React.Fragment>
        <div className="row">
          <div className="col-2">
            <ListGroup items={sideMenuList} selectedItemId={selectedGenreId} onSelectItem={(id) => { setSelectedGenreId(id); setPageNumber(1); setSearchText("") }} />
          </div>
          <div className="col">
            <p className="fs-2">Showing {sortedMovieList.length} movies in the database</p>
            <button type="button" className="btn btn-primary mt-3 mb-4" onClick={() => { navigate("/movies/new") }} >Add new movie</button>
            <input id="search" type="text" className="form-control mb-4" placeholder="Search Movie" value={searchText} onChange={onSearchText} ></input>
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
                      <td><Link to={`/movies/${movie._id}`} className="clickableText">{movie.title}</Link></td>
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
