const InputButton = ({ text, onClick }) => {
    return (
        <button
            className="input-button"
            onClick={onClick}
            type='button'>
            {text}
        </button>
    )
}

export default InputButton