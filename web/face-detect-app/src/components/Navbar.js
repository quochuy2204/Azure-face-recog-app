import React from 'react'
import {Link} from 'react-router-dom'

export const Navbar = () => {
    return (
        <div className="tab-box">
            <Link to="/">
                <button>Face detection </button>
            </Link>
            <Link to="/test1">
                <button>Face verification </button>
            </Link>
            <Link to="/test2">
                <button>Object indetification </button>
            </Link>
        </div>
    )
}
