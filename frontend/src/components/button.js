import { Link } from 'react-router-dom'

function Btn(props) {
  return (
    <button as={Link} to={props.link}>{props.text}</button>
    /*<button
      type="button"
      onClick={() => <Link to={props.link}>Login</Link>}>
      {props.text}
    </button>*/
  )
}

const Button = ({ text }) => {
    return(
        <button className="button">
            {text}
        </button>
    );
};

export default Button;