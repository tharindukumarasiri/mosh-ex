import React from 'react';
import { Link, NavLink } from "react-router-dom";

export default function NavBar() {
    return (
        <nav className='navbar navbar-expand-lg navbar-light bg-light'>
            <div className="container-fluid">
                <NavLink className="navbar-brand" to="/">Mosh React ex</NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/movies">Movies</NavLink>
                        </li>
                    </ul>
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/counters">Counters</NavLink>
                        </li>
                    </ul>
                </div>
            </div>

        </nav>
    )
}