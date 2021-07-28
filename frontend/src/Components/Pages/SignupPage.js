import React, { Component } from 'react';
import { Box } from '@material-ui/core'
import PrimaryButton from '../Buttons/PrimaryButton'
import { Link } from 'react-router-dom';
import SignupForm from "../Forms/SignupForm"
import { CbrIcon } from "../Icons"
import CloudLockIcon from "../../Assets/images/cloud-lock-icon.png"
import ShieldIcon from "../../Assets/images/shield-icon.png"
import SignupSuccessIcon from "../../Assets/images/signup-success.png"
import "../../Assets/SignupPage.css"


const StepOne = ({ setParentState, nextStep, previousStep, parentState }) => {
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
                <SignupForm
                    setParentState={setParentState}
                    nextStep={nextStep}
                    previousStep={previousStep}
                    parentState={parentState}
                />
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

const StepTwo = ({ setParentState, nextStep, previousStep, parentState }) => {
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
                            Just one more step...
                        </h1>
                        <img src={CloudLockIcon} id="cloud-lock-icon"></img>
                    </div>
                    <div className="row-2">
                        <p>
                            Fill in your CBR details, our automated system will need it to login to your
                            account in order to search for cancellation dates. Don’t worry, your CBR details are
                            encrypted in the database and you are the only one with access to it.
                        </p>
                    </div>
                </div>
            </div>
            <div className="form-container">
                <SignupForm
                    setParentState={setParentState}
                    nextStep={nextStep}
                    previousStep={previousStep}
                    parentState={parentState}
                />
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

const StepThree = () => {
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
                <PrimaryButton
                    component={Link}
                    to="/"
                    className="btn"
                    size="large"
                    variant="contained"
                    color="primary"
                    type="submit"
                    text="Home"
                />
            </Box>
        </div>
    )
}

class SignupPage extends Component {
    state = {
        step: 2,

        // Form values
        // Step 1
        email: "",
        password: "",
        confirm_password: "",
        first_name: "",
        last_name: "",
        mobile_number: "",
        // Step 2
        gov_username: "",
        gov_password: "",
    }

    nextStep = () => {
        if (this.state.step <= 3)
            this.setState({
                step: this.state.step + 1
            })
    }

    previousStep = () => {
        if (this.state.step >= 1)
            this.setState({
                step: this.state.step - 1
            })
    }

    renderStep = () => {
        if (this.state.step === 1) {
            return (
                <StepOne
                    setParentState={state => { this.setState(state) }}
                    nextStep={this.nextStep}
                    previousStep={this.previousStep}
                    parentState={this.state}
                />
            )
        }
        else if (this.state.step === 2) {
            return (
                <StepTwo
                    setParentState={state => { this.setState(state) }}
                    nextStep={this.nextStep}
                    previousStep={this.previousStep}
                    parentState={this.state}
                />
            )
        }
        else {
            return (
                <StepThree />
            )
        }
    }

    render() {
        console.log(this.state)
        return (
            <section id="signup-page">
                {this.renderStep()}
            </section>
        );
    }
}

export default SignupPage;
