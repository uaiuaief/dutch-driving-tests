import React, { Component } from 'react';
import { Button, Box, Container, TextField } from '@material-ui/core'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import "../../Assets/loginpage.css"
import { Formik } from 'formik';


class LoginPage extends Component {
    render() {
        return (
            <section id="login-page">
                <Box>
                    <h1>
                        Login to your account
                    </h1>
                </Box>
                <Formik
                    initialValues={{
                        email: "",
                        password: ""
                    }}

                    onSubmit={(values, actions) => {
                        alert(JSON.stringify(values, null, 2));
                    }}
                >
                    {props => (
                        <form onSubmit={props.handleSubmit}>
                            <Box>
                                <TextField
                                    id="email"
                                    label="Email"
                                    variant="outlined"
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                    value={props.values.email}
                                    name="email"
                                />
                            </Box>
                            <Box mt={".5rem"}>
                                <TextField
                                    id="password"
                                    label="Password"
                                    variant="outlined"
                                    type="password"
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                    value={props.values.password}
                                    name="password"
                                />
                            </Box>
                            <Box mt={"2.0rem"}>
                                <Button
                                    className="btn"
                                    size="large"
                                    variant="contained"
                                    color="primary"
                                    type="submit"
                                >
                                    Login
                                </Button>
                            </Box>
                        </form>
                    )}
                </Formik>

            </section>
        );
    }
}

export default LoginPage;
