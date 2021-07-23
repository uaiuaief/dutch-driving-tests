import Button from '@material-ui/core/Button'

const PrimaryButton = (props) => {
    let className = props.className ? `${props.className} primary-button` : 'primary-button'
    if (props.disabled){
        className = `${className}-disabled`
    }

    return (
        <Button
            component={props.component}
            to={props.to}
            disabled={props.disabled ? true : false}
            onClick={props.onClick}
            className={className}
            size={props.size}
            variant={props.variant}
            color={props.color}
            type={props.type}
        >
            {props.text}
        </Button>
    )
}

export default PrimaryButton