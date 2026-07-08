import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from "react";
const API = process.env.REACT_APP_API_URL;


function Logging() {
    const navigate = useNavigate();

    const name = sessionStorage.getItem("name")

    const handleSubmit = async (e) => {
        e.preventDefault();
        window.navigateToPage("/map");
};

    return (
        <div className='form'>
            <h1>Welcome Back, {name}</h1>
            <form onSubmit={handleSubmit}>
                <input type="submit" value="Log In" />
                <div className="home">
                    <Link to="/createaccount">
                        <input type="submit" value="Create a New Account" />
                    </Link>
                </div>
            </form>

        </div>
    );
}

export { Logging };
