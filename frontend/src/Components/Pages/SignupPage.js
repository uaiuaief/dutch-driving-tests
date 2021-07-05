import React, { Component } from 'react';
import { Button, Box, Container, TextField } from '@material-ui/core'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import SignupForm from "../Forms/SignupForm"


class SignupPage extends Component {
    render() {
        return (
            <Container className="container">
                <Box>
                    <h1>
                        Sign up
                    </h1>
                </Box>
                <SignupForm/>
            </Container>
        );
    }
}

export default SignupPage;
