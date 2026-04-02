import './login.css';
import Button from '../../components/button';
import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from "react";

function Login() {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [noUser, setNoUser] = useState(false);
    const [missing, setMissing] = useState(false);
    const navigate = useNavigate();
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

        try {
            const add = await fetch("http://localhost:3001/api/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            });
            console.log(add)
            const data = await add.json();
            sessionStorage.setItem("username", data.user.username);
            sessionStorage.setItem("m1", data.user.finished_m1);
            sessionStorage.setItem("m2", data.user.finished_m2);
            sessionStorage.setItem("m3", data.user.finished_m3);
            sessionStorage.setItem("m4", data.user.finished_m4);
            sessionStorage.setItem("m5", data.user.finished_m5);
            sessionStorage.setItem("m6", data.user.finished_m6);

            const token = data.token;


            console.log("JWT Token:", token);

            localStorage.setItem("token", token);
            if (add.status === 200) {
                navigate('/map', { replace: true });
                // link to module 1 start
                // Check for jwt token ? Special status for if they have a token?
            }
            else if (add.status === 400) {
                setMissing(true);
                if (noUser)
                    setNoUser(false);
            }
            else if (add.status === 404) {
                setNoUser(true);
                if (missing)
                    setMissing(false);
            }
        } catch (err) {
            console.error()
        }
    };

    return (
        <div className='form'>
            <h1>Log In</h1>
            <form onSubmit={handleSubmit}>
                <label class='input' type='text' name="username" placeholder="Your username..">
                    Username: <input name="username" onChange={handleUsername} />
                </label>

                <label class='input' type='text' name="email" placeholder="Your email..">
                    Email: <input name="email" onChange={handleEmail} />
                </label>

                {missing ? (
                    <p>All fields are required</p>
                ) : <p></p>
                }
                {noUser ? (
                    <p>No such user</p>
                ) : (
                    <p></p>
                )}

                <input type="submit" value="Log In" />

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
