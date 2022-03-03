import http from './httpService'
import config from '../config.json'
let movies = [];

export async function getMovies() {
    if (movies.length > 0) {
        return movies;
    } else {
        try {
            const { data } = await http.get(config.moviesEndpoint)
            movies = data;
            return data;
        } catch (ex) {
            alert('something went wrong when getting data please try again')
        }

    }
}

export function getMovieFromId(id) {
    if (movies.length > 0) {
        return movies.find(movie => movie._id === id)
    } else {
        getMovies().then(() => { return movies.find(movie => movie._id === id) })
    }
}

export async function setMovie(newMovie) {
    const originalMovies = movies;
    const updateMovieObj = {
        "title": newMovie.title,
        "numberInStock": newMovie.numberInStock,
        "dailyRentalRate": newMovie.dailyRentalRate,
        "genreId": newMovie.genre._id
    }
    const index = movies.findIndex((movie) => { return movie._id === newMovie._id })

    console.log(updateMovieObj)
    try {
        if (index < 0) {
            const { data } = await http.post(config.moviesEndpoint, updateMovieObj);
            movies.push(data);
            return movies;
        } else {
            const { data } = await http.put(config.moviesEndpoint + '/' + newMovie._id, updateMovieObj);
            movies[index] = data;
            return movies;
        }
    } catch (ex) {
        alert('something went wrong when creating data please try again')
        movies = originalMovies;
    }
}

export async function deleteMovie(movie) {
    try {
        await http.delete(config.moviesEndpoint + '/' + movie._id);
        movies = movies.filter(mov => { return mov._id !== movie._id });
        return movies;
    } catch (ex) {
        alert('something went wrong when deleting movie please try again')
    }
}