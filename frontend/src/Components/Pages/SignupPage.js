import React, { Component } from 'react';
import { Button, Box, Container, TextField } from '@material-ui/core'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

class LoginPage extends Component {
    render() {
        return (
            <Container className="container">
                <Box>
                    <h1>
                        Sign up
                    </h1>
                </Box>
                <Box>
                    <TextField
                        id="email"
                        label="Email"
                        variant="outlined"
                    >

                    </TextField>
                </Box>
                <Box mt={".5rem"}>
                    <TextField
                        id="password"
                        label="Password"
                        variant="outlined"
                        type="password"
                    >

                    </TextField>
                </Box>
                <Box mt={".5rem"}>
                    <TextField
                        id="confirm_password"
                        label="Confirm Password"
                        variant="outlined"
                        type="password"
                    >

                    </TextField>
                </Box>
                <Box mt={".5rem"}>
                    <TextField
                        label="First Name"
                        variant="outlined"
                    >

                    </TextField>
                </Box>
                <Box mt={".5rem"}>
                    <TextField
                        label="Last Name"
                        variant="outlined"
                    >

                    </TextField>
                </Box>
                <Box mt={".5rem"}>
                    <TextField
                        label="Mobile Number"
                        variant="outlined"
                    >

                    </TextField>
                </Box>
                <Box mt={".5rem"}>
                    <TextField
                        label="Goverment Username"
                        variant="outlined"
                    >
                    </TextField>
                </Box>
                <Box mt={".5rem"}>
                    <TextField
                        label="Goverment Password"
                        variant="outlined"
                    >

                    </TextField>
                </Box>
                <Box mt={"2.0rem"}>
                    <Button
                        className="btn"
                        size="large"
                        variant="contained"
                        color="primary"
                        onClick={e => {
                            alert('hello')
                        }}
                    >
                        Create Account
                    </Button>
                </Box>
            </Container>
        );
    }
}

export default LoginPage;
