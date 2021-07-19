import React from 'react';
import Button from '@material-ui/core/Button'


const SuccessMenu = ({ menuHeader, goBack }) => {
    return (
        <section id="success-menu">
            <h1 className="menu-header">{menuHeader}</h1>
            <Button
                onClick={goBack}
                size="large"
                variant="contained"
                color="primary"
                type="button"
            >
                Back
            </Button>
        </section>
    );
}

export default SuccessMenu;
