import './login.css';
import Button from '../../components/button';
import { Link } from 'react-router-dom';
import React, { useState } from "react";

function Login() {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const handleEmail = (e) => {
        setEmail(e.target.value);
    };
    const handleUsername = (e) => {
        setUsername(e.target.value);
    };

    const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      email: email,
      username: username,
    };

   try{
    const add = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    console.log(add)
   }catch(err){
     console.error()
   }
  };

  return <div className='form'>
    <h1>Log In</h1>
    <form onSubmit={handleSubmit}>
    <label class='input' type='text' name="username" placeholder="Your username..">
    Username: <input name="username" onChange={handleUsername}/>
    </label>

    <label class='input' type='text' name="email" placeholder="Your email..">
    Email: <input name="email" onChange={handleEmail}/>
    </label>

    <input type="submit" value="Log In"/>

    <div className="home">
        <Link to="/createaccount">
            <Button text="Create a New Account"></Button>
        </Link>
    </div>
    </form>

  </div>;
}

export { Login };
