import React, { Component } from 'react';
import { Button, Box, Container, TextField } from '@material-ui/core'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import SignupForm from "../Forms/SignupForm"
import "../../Assets/signuppage.css"


class SignupPage extends Component {
    render() {
        return (
            <section id="signup-page">
                <Box>
                    <h1>
                        Sign up
                    </h1>
                </Box>
                <SignupForm/>
            </section>
        );
    }
}

export default SignupPage;
