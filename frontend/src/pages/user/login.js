import './login.css';
import Button from '../../components/button';
import { Link } from 'react-router-dom';

function Login() {
  return <div className='form'>
    <h1>Log In</h1>
    <label class='input' type='text' name="username" placeholder="Your username..">
    Username: <input name="username" />
    </label>

    <label class='input' type='text' name="email" placeholder="Your email..">
    Email: <input name="email" />
    </label>

    <div className="home">
        <Button text="Log In"></Button>
    </div>

    <div className="home">
        <Link to="/createaccount">
            <Button text="Create a New Account"></Button>
        </Link>
    </div>

  </div>;
}

export { Login };
