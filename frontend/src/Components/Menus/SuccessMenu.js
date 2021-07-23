import React from 'react';
import Button from '@material-ui/core/Button'
import PrimaryButton from '../Buttons/PrimaryButton'


const SuccessMenu = ({ menuHeader, goBack }) => {
    return (
        <section id="success-menu">
            <h1 className="menu-header">{menuHeader}</h1>
            <PrimaryButton
                onClick={goBack}
                size="large"
                variant="contained"
                color="primary"
                type="button"
                text="Back"
            />
        </section>
    );
}

export default SuccessMenu;
