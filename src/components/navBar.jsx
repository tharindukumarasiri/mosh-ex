import React from 'react';
import { Link } from "react-router-dom";

export default function NavBar() {
    return (
        <nav className='navbar navbar-light bg-light'>
            <div className='col'>
                <Link to="/movies">Movies</Link>
                <Link to="/counters">Counters</Link>
            </div>
        </nav>
    )
}