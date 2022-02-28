import { useParams, useNavigate } from "react-router-dom";
import { getMovieFromId, setMovie } from "../services/fakeMovieService";
import { useState } from 'react';
import { getGenres } from './../services/fakeGenreService';
import { useEffect } from 'react';

export default function Movie() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [movieData, setMovieData] = useState(getMovieData());
    const [errors, setErrors] = useState({});
    const genres = getGenres();

    useEffect(() => {
        if (getMovieFromId(id) == undefined && id !== 'new')
            navigate("/not-found")//Todo not working 
    }, []);

    function getMovieData() {
        const movieData = getMovieFromId(id)
        if (id === 'new') {
            return {
                _id: "nnhuhsdsf6d5s4dmyNew65sdf5",
                title: "",
                genre: { _id: "acc", name: "Select Genre" },
                numberInStock: "",
                dailyRentalRate: "",
            }
        } else {
            return movieData;
        }
    }

    const handleSave = () => {
        const validated = validateFields();

        if (validated) {
            setMovie(movieData)
            navigate('/movies')
        }
    }

    const onFieldValuesChange = (e) => {
        let newField = { ...movieData }
        if (e.target.name === "genre") {
            newField[e.target.name] = genres.filter(genre => { return genre._id === e.target.value })[0]
        } else {
            newField[e.target.name] = e.target.value;
        }

        setMovieData(newField);
    }

    const validateFields = () => {
        const newErrors = {}

        if (movieData.title === "")
            newErrors["title"] = "Title cannot be empty"
        if (movieData.genre === "")
            newErrors["genre"] = "genre cannot be empty"
        if (movieData.numberInStock === "")
            newErrors["numberInStock"] = "Number In Stock cannot be empty"
        if (movieData.numberInStock < 0 || movieData.numberInStock > 100 || movieData.numberInStock % 1 != 0 || isNaN(movieData.numberInStock))
            newErrors["numberInStock"] = "Invalid Number In Stock"
        if (movieData.dailyRentalRate === "")
            newErrors["dailyRentalRate"] = "Daily Rental Rate cannot be empty"
        if (movieData.dailyRentalRate < 0 || movieData.dailyRentalRate > 10 || isNaN(movieData.dailyRentalRate))
            newErrors["dailyRentalRate"] = "Invalid Daily Rental Rate"

        setErrors(newErrors)

        if (Object.keys(newErrors).length === 0)
            return true
        else
            return false
    }

    return (
        <div>
            <h2>Movie Form</h2>
            <form>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input id="title" type="text" autoFocus={true} className="form-control" name="title" value={movieData.title} onChange={onFieldValuesChange} ></input>
                    {errors.title &&
                        <div className='alert alert-danger' role="alert">{errors.title}</div>
                    }
                </div>
                <div className="mb-3">
                    <label htmlFor="genre" className="form-label">Genre</label>
                    <select className="form-select" name="genre" value={movieData.genre._id} onChange={onFieldValuesChange}>
                        {genres.map((genre) => {
                            return <option key={genre._id} value={genre._id}>{genre.name}</option>
                        })
                        }
                    </select>
                    {errors.genre &&
                        <div className='alert alert-danger' role="alert">{errors.genre}</div>
                    }
                </div>
                <div className="mb-3">
                    <label htmlFor="numberInStock" className="form-label">Number In Stock</label>
                    <input id="numberInStock" type="text" className="form-control" name="numberInStock" value={movieData.numberInStock} onChange={onFieldValuesChange} ></input>
                    {errors.numberInStock &&
                        <div className='alert alert-danger' role="alert">{errors.numberInStock}</div>
                    }
                </div>
                <div className="mb-3">
                    <label htmlFor="dailyRentalRate" className="form-label">Rate</label>
                    <input id="dailyRentalRate" type="text" className="form-control" name="dailyRentalRate" value={movieData.dailyRentalRate} onChange={onFieldValuesChange} ></input>
                    {errors.dailyRentalRate &&
                        <div className='alert alert-danger' role="alert">{errors.dailyRentalRate}</div>
                    }
                </div>
            </form>
            <button type="button" className="btn btn-primary mt-3" onClick={() => { handleSave() }} >Save</button>
        </div>
    )
}