import './login.css';
import Button from '../../components/button';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from "react";

function CreateAccount() {
    const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', username: '' })

    const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/api/users/createaccount', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      
      if (!response.ok) throw new Error(response.status)
      
      const user = await response.json()
      console.log('Created:', user)
    } catch (error) {
      console.error(error)
      console.error(error.message)
    }
  };

  return <div className='form'>
    <h1>Create Account</h1>
    <form onSubmit={handleSubmit}>

        <label class='input' type='text' name="username" placeholder="Your username..">
        Username: <input name="username" onChange={(e) => setFormData({ ...formData, username: e.target.value })}/>
        </label>
        <label class='input' type='text' name="email" placeholder="Your email..">
        Email: <input name="email" onChange={(e) => setFormData({ ...formData, email: e.target.value })}/>
        </label>
        <label class='input' type='text' name="firstName" placeholder="Your first name..">
        First Name: <input name="firstName" onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}/>
        </label>
        <label class='input' type='text' name="lastName" placeholder="Your last name..">
        Last Name: <input name="lastName" onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}/>
        </label>

        <Button type="submit" text="Create a New Account"/>
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