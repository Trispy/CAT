import mascot from '../../assets/GameMascot.png';
import logo from '../../assets/Volunteerverse_logo.png';
import Button from '../../components/button';
import { Link } from 'react-router-dom';
import './home.css';
import '../../components/image.css';

function Home() {
    return (
      <div>
        <h1 className="home">
          Food Safetyville
        </h1>
        <div className="img">
            <img src={logo} alt="mascot" style={{ width: '200px', height: 'auto'} }/>
        </div>
        <div className="home">
            <Link to="/login">
            <Button text="Start"></Button>
            </Link>
        </div>
        
      </div>
    );
}

export { Home };