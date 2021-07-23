import React from 'react';
import { Formik } from 'formik';
import { TextField } from '@material-ui/core'
import PrimaryButton from '../Buttons/PrimaryButton'
import * as Yup from "yup"
import SnackBar from '../MaterialUIComponents/SnackBar'
import InputButton from "../Buttons/InputButton"


const LoginSchema = Yup.object().shape({
    email: Yup.string()
        .email('Invalid email')
        .required('This field is required'),
    password: Yup.string()
        .required('This field is required')
})


const LoginForm = ({ setParentState }) => {
    const [state, setState] = React.useState({
        alert: false,
        message: null,
        severity: null,
        open: false
    })

    return (
        <Formik
            initialValues={{
                email: "",
                password: ""
            }}

            onSubmit={async (values, actions) => {
                // alert(JSON.stringify(values, null, 2));

                const endpoint = "/api/login/"
                let res = await fetch(endpoint, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': window.getCookie('csrftoken')
                    },
                    body: JSON.stringify(values)
                })

                if (String(res.status).slice(0, 1) === '2') {
                    // setParentState({redirect: "/account"})
                    window.location = '/account'
                    // alert('success')
                }
                else if (String(res.status).slice(0, 1) === '4') {
                    let data = await res.json()
                    setState({
                        alert: true,
                        severity: "error",
                        message: "Email or Password are incorrect"
                    })
                }
            }}

            // validationSchema={LoginSchema}
        >
            {props => (
                <form id="login-form" onSubmit={props.handleSubmit}>
                    <div className="form-row form-row-1">
                        <div className="form-item">
                            <TextField
                                required
                                id="email"
                                label="Email"
                                variant="outlined"
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                value={props.values.email}
                                name="email"
                                error={props.touched.email && props.errors.email}
                                helperText={props.touched.email && props.errors.email ? props.errors.email : null}
                            />
                        </div>
                    </div>
                    <div className="form-row form-row-1">
                        <div className="form-item">
                            <TextField
                                required
                                id="password"
                                label="Password"
                                variant="outlined"
                                type="password"
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                value={props.values.password}
                                name="password"
                                error={props.touched.password && props.errors.password}
                                helperText={props.touched.password && props.errors.password ? props.errors.password : null}
                            />
                            <InputButton
                                component="link"
                                to="forgot-password"
                                text="Forgot password?"
                            />
                        </div>
                    </div>
                    <div>
                        <PrimaryButton
                            className="btn"
                            size="large"
                            variant="contained"
                            color="primary"
                            type="submit"
                            text="Login"
                        />
                    </div>
                    {state.alert
                        ?
                        <SnackBar
                            open={true}
                            setParentState={setState}
                            message={state.message}
                            severity={state.severity}
                        />
                        :
                        null
                    }
                </form>
            )}
        </Formik>
    )
}

export default LoginForm;
