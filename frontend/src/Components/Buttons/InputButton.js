import { Redirect, Link } from 'react-router-dom';

const InputButton = ({ text, onClick, component = "button", to="" }) => {
    if (component === "button") {
        return (
            <button
                className="input-button"
                onClick={onClick}
                type='button'>
                {text}
            </button>
        )
    }
    else if (component === "link"){
        return (
            <Link
                to={to}
                className="input-button"
                onClick={onClick}
                type='button'>
                {text}
            </Link>
        )
    }
}

export default InputButton