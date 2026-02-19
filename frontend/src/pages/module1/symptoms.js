import mascot from '../../assets/volunteerguy.png';
import background from '../../assets/Background1.png';
import textbox from '../../assets/TextBox.png';
import Button from '../../components/button';
import { Link } from 'react-router-dom';
import '../../components/image.css';

function Symptoms() {
    const backgroundStyle = {
    backgroundImage: `url(${background})`, 
    height: '100vh',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  };
  const textboxStyle = {

    backgroundImage: `url(${textbox})`,
    width: '90vw',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  };
    return (
      <div style={backgroundStyle}>
        <div className="img">
            <img src={mascot} alt="mascot" style={{ width: '700px', height: 'auto'} }/>
            <div style={textboxStyle}>
              <p>Text text words text</p>
            </div>
            <img className="img-overlay" src="TextBox.png" alt="Text box" />
        </div>
        
      </div>
    );
}

export { Symptoms };