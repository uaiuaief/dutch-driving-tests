import React, { Component } from 'react';
import { Button, Box, Container, TextField } from '@material-ui/core'
import { Link } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import SignupForm from "../Forms/SignupForm"
import { CbrIcon } from "../Icons"
import CloudLockIcon from "../../Assets/images/cloud-lock-icon.png"
import ShieldIcon from "../../Assets/images/shield-icon.png"
import SignupSuccessIcon from "../../Assets/images/signup-success.png"
import "../../Assets/SignupPage.css"


const StepOne = () => {
    return (
        <>
            <div className="header">
                <div className="cbr-icon-container col-1">
                    <CbrIcon
                        id="cbr-icon"
                    />
                </div>
                <div className="col-2">
                    <div className="row-1">
                        <h1>
                            Sign up it's safe
                        </h1>
                        <img src={CloudLockIcon} id="cloud-lock-icon"></img>
                    </div>
                    <div className="row-2">
                        <p>
                            Lorem ipsum dolore domere a Lorem ipsum dolore domere aLorem ipsum dolore domere a
                            Lorem ipsum dolore domere a Lorem ipsum dolore domere aLorem ipsum dolore domere a
                            Lorem ipsum dolore domere a
                        </p>
                    </div>
                </div>
            </div>
            <div className="form-container">
                <SignupForm />
            </div>
            <div className="footer">
                <div className="col-1">
                    <img src={ShieldIcon} id="shield-icon"></img>
                </div>
                <div className="col-2">
                    <div className="row-1">
                        <h1>
                            Best performance.
                            Encrypted end-to-end.
                        </h1>
                    </div>
                    <div className="row-2">
                        <p>
                            Ensuring the security and integrity of all of our platform is our
                            top priority. We want to minimize our customer’s exposure to risk by
                            ensuring our software and hardware is secure by design, secure by
                            default and secure by development.
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}

const StepTwo = () => {
    return (
        <div id="signup-success">
            <div>
                <img src={SignupSuccessIcon}>
                </img>
            </div>
            <h1>
                Congratulations! Your account was created
                and is now waiting activation.
            </h1>
            <p>
                You have succesfully created your account and our team will send you an email very soon to activate your account.
                You can also contact our support via the following email: support@snelcbrexam.nl
            </p>
            <Box mt={"2.0rem"}>
                <Button
                    component={Link}
                    to="/"
                    className="btn"
                    size="large"
                    variant="contained"
                    color="primary"
                    type="submit"
                >
                    Home
                </Button>
            </Box>
        </div>
    )
}

class SignupPage extends Component {
    state = {
        step: 1
    }

    renderStep = () => {
        if (this.state.step === 1) {
            return (
                <StepOne />
            )
        }
        else {
            return (
                <StepTwo />
            )
        }
    }

    render() {
        return (
            <section id="signup-page">
                {this.renderStep()}
                {/* <div className="header">
                    <div className="cbr-icon-container col-1">
                        <CbrIcon
                            id="cbr-icon"
                        />
                    </div>
                    <div className="col-2">
                        <div className="row-1">
                            <h1>
                                Sign up it's safe
                            </h1>
                            <img src={CloudLockIcon} id="cloud-lock-icon"></img>
                        </div>
                        <div className="row-2">
                            <p>
                                Lorem ipsum dolore domere a Lorem ipsum dolore domere aLorem ipsum dolore domere a
                                Lorem ipsum dolore domere a Lorem ipsum dolore domere aLorem ipsum dolore domere a
                                Lorem ipsum dolore domere a
                            </p>
                        </div>
                    </div>
                </div>
                <div className="form-container">
                    <SignupForm />
                </div>
                <div className="footer">
                    <div className="col-1">
                        <img src={ShieldIcon} id="shield-icon"></img>
                    </div>
                    <div className="col-2">
                        <div className="row-1">
                            <h1>
                                Best performance.
                                Encrypted end-to-end.
                            </h1>
                        </div>
                        <div className="row-2">
                            <p>
                                Ensuring the security and integrity of all of our platform is our
                                top priority. We want to minimize our customer’s exposure to risk by
                                ensuring our software and hardware is secure by design, secure by
                                default and secure by development.
                            </p>
                        </div>
                    </div>
                </div> */}
            </section>
        );
    }
}

export default SignupPage;
