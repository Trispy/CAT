import './login.css';
import Button from '../../components/button';
import { Link } from 'react-router-dom';
import React, { useState } from "react";

function CreateAccount() {
  const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const handleEmail = (e) => {
        setEmail(e.target.value);
    };
    const handleUsername = (e) => {
        setUsername(e.target.value);
    };
    const handleFirstName = (e) => {
        setFirstName(e.target.value);
    };
    const handleLastName = (e) => {
        setLastName(e.target.value);
    };

    const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      email: email,
      username: username,
      firstName: firstName,
      lastName: lastName,
    };

   try{
    const add = await fetch("http://localhost:3000/createaccount", {
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
    <h1>Create Account</h1>
    <form onSubmit={handleSubmit}>

        <label class='input' type='text' name="username" placeholder="Your username..">
        Username: <input name="username" onChange={handleUsername}/>
        </label>
        <label class='input' type='text' name="email" placeholder="Your email..">
        Email: <input name="email" onChange={handleEmail}/>
        </label>
        <label class='input' type='text' name="firstName" placeholder="Your first name..">
        First Name: <input name="firstName" onChange={handleFirstName}/>
        </label>
        <label class='input' type='text' name="lastName" placeholder="Your last name..">
        First Name: <input name="lastName" onChange={handleLastName}/>
        </label>

        <input type="submit" value="Create a New Account"/>
        <p className='home'>Already have an account?</p>
        <div className="home">
        <Link to="/login">
            <Button text="Log In"></Button>
        </Link>
        </div>
    </form>

  </div>;
}

export { CreateAccount };