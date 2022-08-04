import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
    return (
        <div>
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <Link to="/">User Hub</Link>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <Link to="/auth/login">Login</Link>
                        </li>
                        <li class="nav-item">
                            <Link to="/auth/register">Register</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    );
};

export default NavBar;
