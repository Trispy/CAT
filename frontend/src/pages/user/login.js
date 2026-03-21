import './login.css';
import Button from '../../components/button';
import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from "react";

function Login() {
const [email, setEmail] = useState("");
const [username, setUsername] = useState("");
const navigate = useNavigate();


const handleEmail = (e) => {
    setEmail(e.target.value);
};

const handleUsername = (e) => {
    setUsername(e.target.value);
};

// Simply navigate to map when login is clicked
const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/map', { replace: true });
};

return (
<div className='form'>
    <h1>Log In</h1>

    <form onSubmit={handleSubmit}>

    <label className='input'>
    Username:
    <input name="username" onChange={handleUsername}/>
    </label>

    <label className='input'>
    Email:
    <input name="email" onChange={handleEmail}/>
    </label>

    <input type="submit" value="Log In"/>

    <div className="home">
        <Link to="/createaccount">
            <Button text="Create a New Account"></Button>
        </Link>
    </div>

    </form>
</div>
);


}

export { Login };
