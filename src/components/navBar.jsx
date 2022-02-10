import React from 'react';

export default function NavBar({ counterTotal }) {
    return (
        <nav className='navbar navbar-light bg-light'>
            <div className='col'>
                <span className='navbar-brand mb-0 h1'>Counter Total</span>
                <span className='badge rounded-pill bg-secondary'>{ counterTotal }</span>
            </div>

        </nav>
    )
}