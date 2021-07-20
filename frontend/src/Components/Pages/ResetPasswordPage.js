import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import ResetPasswordForm from "../Forms/ResetPasswordForm"
import {Button} from '@material-ui/core'
import "../../Assets/ResetPasswordPage.css"

const StepOne = ({ setParentState }) => {
    return (
        <div className="auth-box step-1">
            <h1>
                Reset password
            </h1>
            <ResetPasswordForm
                setParentState={setParentState}
            />
            <div className="auth-box-footer">
                Don't have an account? <Link to="/signup">Sign up</Link>
            </div>
        </div>
    )
}

const StepTwo = ({ setParentState }) => {
    return (
        <div className="auth-box step-2">
            <h1>
                Your password was reset successfully!
            </h1>
            <Button
                className="btn"
                size="large"
                variant="contained"
                color="primary"
                type="submit"
            >
                Go to account
            </Button>
        </div>
    )
}

class ResetPasswordPage extends Component {
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
                <section id="reset-password-page">
                    {this.renderStep()}
                </section>
        );
    }
}

export default ResetPasswordPage;
