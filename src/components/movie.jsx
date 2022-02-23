import { useParams, useNavigate } from "react-router-dom";

export default function Movie(props) {
    const { id } = useParams();
    const navigate = useNavigate();

    const handleSave = () => {
        console.log(navigate)
        navigate('/movies')
    }

    return (
        <div>
            <h2>Movie Form { id }</h2>
            <button type="button" className="btn btn-primary mt-3" onClick={() => {handleSave()}} >Save</button>
        </div>
    )
}