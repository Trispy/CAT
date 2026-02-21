import mascot from '../../assets/GameMascot.png';
import guy from '../../assets/volunteerguy.png';
import Button from '../../components/button';
import { Link } from 'react-router-dom';
import './home.css';
import '../../components/image.css';

function Home() {
    return (
      <div>
        <h1 className="home">
          Food Safety Game
        </h1>
        <div className="img">
            <img src={mascot} alt="mascot" style={{ width: '100px', height: 'auto'} }/>
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