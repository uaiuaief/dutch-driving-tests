import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Box } from '@material-ui/core'
import LoginForm from "../Forms/LoginForm"
import "../../Assets/loginpage.css"


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
                    <Box>
                        <h1>
                            Login to your account
                        </h1>
                        <LoginForm 
                            setParentState={(state) => this.setState(state)}
                        />
                    </Box>
                </section>
        );
    }
}

export default LoginPage;
