import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { Box } from '@material-ui/core'
import LoginForm from "../Forms/LoginForm"
import "../../Assets/LoginPage.css"


class LoginPage extends Component {
    state = {
        redirect: false
    }

    render() {
        return (
            this.state.redirect
                ?
                <Redirect to={this.state.redirect} />
                :
                <section id="login-page">
                    <div className="auth-box">
                        <h1>
                            Login to your account
                        </h1>
                        <LoginForm 
                            setParentState={(state) => this.setState(state)}
                        />       
                        <div className="auth-box-footer">
                            Don't have an account? <Link to="/signup">Sign up</Link>
                        </div>
                    </div>
                </section>
        );
    }
}

export default LoginPage;
