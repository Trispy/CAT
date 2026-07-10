import './login.css';
import Button from '../../components/button';
import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from "react";
const API = process.env.REACT_APP_API_URL;


function CreateAccount() {
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', username: '' })
  const navigate = useNavigate();
  const validEmail = true;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const responseCreate = await fetch(`${API}/api/users/createaccount`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      console.log(responseCreate.status)
      if (responseCreate.status === 501) validEmail = false;
      if (responseCreate.status !== 201) throw new Error(responseCreate.status)
      const user = await responseCreate.json()


      sessionStorage.setItem("name", user.user.firstName);
      sessionStorage.setItem("username", user.user.username);
      sessionStorage.setItem("m1", user.user.finished_m1);
      sessionStorage.setItem("m2", user.user.finished_m2);
      sessionStorage.setItem("m3", user.user.finished_m3);
      sessionStorage.setItem("m4", user.user.finished_m4);
      sessionStorage.setItem("m5", user.user.finished_m5);
      sessionStorage.setItem("m6", user.user.finished_m6);

      console.log(user)

      localStorage.setItem("token", user.token);

      console.log("JWT Token:", user.token);


      window.location.href = "/logging";


    } catch (error) {
      console.error(error)
      console.error(error.message)
    }
  };

  return <div className='form'>
    <h1>Create Account</h1>
    <form onSubmit={handleSubmit}>

      <label class='input' type='text' name="username" placeholder="Your username..">
        Username (Case Sensitive): <input name="username" onChange={(e) => setFormData({ ...formData, username: e.target.value })} />
      </label>
      <label class='input' type='text' name="email" placeholder="Your email..">
        Email: <input name="email" onChange={(e) => setFormData({ ...formData, email: e.target.value.toLowerCase() })} />
      </label>
      <label class='input' type='text' name="firstName" placeholder="Your first name..">
        First Name: <input name="firstName" onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} />
      </label>
      <label class='input' type='text' name="lastName" placeholder="Your last name..">
        Last Name: <input name="lastName" onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} />
      </label>

      <input type="submit" value="Create a New Account" />
      {!validEmail ? (
        <p>No such user</p>
      ) : (
        <p></p>
      )}
      <p className='home'>Already have an account?</p>
      <div className="home">
        <Link to="/login">
          <input type="submit" value="Login" />
        </Link>
      </div>
    </form>

  </div>;
}

export { CreateAccount };

/*
    try {
        const add = await fetch(`${API}/api/users/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        });

        const text = await add.text();
        
            // Try parsing manually (so it doesn't crash silently)
            let data;
            try {
            data = JSON.parse(text);
            } catch (err) {
            console.error("JSON parse failed:", err);
            }

        if (add.status === 200) {
            sessionStorage.setItem("name", data.user.firstName);
            sessionStorage.setItem("username", data.user.username);
            sessionStorage.setItem("m1", data.user.finished_m1);
            sessionStorage.setItem("m2", data.user.finished_m2);
            sessionStorage.setItem("m3", data.user.finished_m3);
            sessionStorage.setItem("m4", data.user.finished_m4);
            sessionStorage.setItem("m5", data.user.finished_m5);
            sessionStorage.setItem("m6", data.user.finished_m6);

            localStorage.setItem("token", data.token);

            console.log("JWT Token:", data.token);

    
            window.location.href = "/map";
        }
        else if (add.status === 400) {
            setMissing(true);
            setNoUser(false);
        }
        else if (add.status === 404) {
            window.location.href = "/createaccount";
        }

    } catch (err) {
        c
*/