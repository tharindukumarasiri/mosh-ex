import React, { useEffect, useState } from "react";
import { getMovies, deleteMovie } from "../services/movieService";
import LikeButton from "./Common/likeButton";
import SortIcon from "./Common/sortIcon";
import ListGroup from "./listGroup";
import Pagination from "./Common/pagination";
import { paginate } from "./utils/paginate";
import { getGenres } from "../services/genreService";
import _ from "lodash";
import { Link, useNavigate } from "react-router-dom";

const pageSize = 4;
let shortMovieList = [];
let filteredMovieList;

export default function Movies() {
  const [selectedGenreId, setSelectedGenreId] = useState(2);
  const [pageNumber, setPageNumber] = useState(1);
  const [movies, setMovies] = useState([]);
  const [sort, setSort] = useState({ sortBy: "title", order: "asc" })
  const [sideMenuList, setSideMenueList] = useState([
    { _id: 2, name: "All Genres" },
  ]);
  const [searchText, setSearchText] = useState('')
  const navigate = useNavigate();

  useEffect(async () => {
    getMovies().then(result => setMovies(result));
    getGenres().then(result => setSideMenueList(prevMenuList =>  [...prevMenuList, ...result]) )  
  }, []);

  useEffect(() => {
    if (shortMovieList.length === 0 && pageNumber > 1) {
      setPageNumber(pageNumber - 1)
    }
  }, [shortMovieList]);

  const dltMovie = (movie) => {
    deleteMovie(movie).then(result => {setMovies(result)});
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
                          onClick={() => dltMovie(movie)}
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
