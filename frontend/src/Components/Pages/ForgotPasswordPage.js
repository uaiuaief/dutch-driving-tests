import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import ForgotPasswordForm from "../Forms/ForgotPasswordForm"
import "../../Assets/ForgotPasswordPage.css"


const StepOne = ({setParentState}) => {
    return (
        <div className="auth-box step-1">
            <h1>
                Forgot your password?
            </h1>
            <p className="text">
                Don’t worry, just enter your email and we will send you instructions on how to recover it
            </p>
            <ForgotPasswordForm
                setParentState={setParentState}
            />
            <div className="auth-box-footer">
                Don't have an account? <Link to="/signup">Sign up</Link>
            </div>
        </div>
    )
}

const StepTwo = ({setParentState}) => {
    return (
        <div className="auth-box step-2">
            <h1>
                Forgot your password?
            </h1>
            <p className="text">
                Please check your email, we've sent you instructions on how to reset your password.
            </p>
            <div className="auth-box-footer">
                Don't have an account? <Link to="/signup">Sign up</Link>
            </div>
        </div>
    )
}

class ForgotPasswordPage extends Component {
    state = {
        redirect: false,
        step: 1
    }

    renderStep = () => {
        if (this.state.step === 1) {
            return <StepOne
                setParentState={(state) => this.setState(state)}
            />
        }
        else {
            return <StepTwo
                setParentState={(state) => this.setState(state)}
            />
        }
    }

    render() {
        return (
            this.state.redirect
                ?
                <Redirect to={this.state.redirect} />
                :
                <section id="forgot-password-page">
                    {this.renderStep()}
                </section>
        );
    }
}

export default ForgotPasswordPage;
