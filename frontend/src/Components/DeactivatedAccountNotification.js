import InfoIcon from '@material-ui/icons/Info';

const DeactivatedAccountNotification = () => {
    return (
        <div className="account-notification">
            <InfoIcon id="warning-icon" fontSize="large" />
            <div>
                <h2>Your account is not activated yet!</h2>
                <p>Contact an admin throught the phone or send us an email on support@snelcbrexamen.nl to activate your account.</p>
            </div>
        </div>
    )
}

export default DeactivatedAccountNotification