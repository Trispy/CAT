import mascot from '../../assets/GameMascot.png';
import Button from '../../components/button';
import { Link } from 'react-router-dom'

function Home() {
  const handleClick = (link) =>{
    <Link to="/login"></Link>
  }
    return (
      <div>
        <h1>
          Food Safety Game
        </h1>
        <br />
        <img src={mascot} alt="mascot" style={{ width: '100px', height: 'auto' }}/>
        <br />
        <Link to="/login">
          <Button text="Start">
          </Button>
        </Link>
      </div>
    );
}

function CreateAccount() {
  return <h1>CreateAccount</h1>;
}

function Login() {
  return <h1>Log in</h1>;
}

export { Home, CreateAccount, Login };
