import config from '../config.json'
import http from './httpService'

let genres = []

export async function getGenres() {
    if(genres.length > 0) {
        return genres;
    } else {
        const { data } = await http.get(config.genresEndpoint);
        genres = data;
        return data;
    }
}