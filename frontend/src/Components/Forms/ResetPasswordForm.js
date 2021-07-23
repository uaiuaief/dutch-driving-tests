import React from 'react';
import { Formik } from 'formik';
import { TextField } from '@material-ui/core'
import PrimaryButton from '../Buttons/PrimaryButton'
import * as Yup from "yup"
import SnackBar from '../MaterialUIComponents/SnackBar'


const ResetPasswordSchema = Yup.object().shape({
    new_password: Yup.string()
        .required('This field is required')
        .min(8, 'Password must be at least 8 characters long')
        .max(100, 'Too long'),
    confirm_new_password: Yup.string()
        .required('This field is required')
        .min(8, 'Password must be at least 8 characters long')
        .max(100, 'Too long')
        .oneOf([Yup.ref('new_password'), null], "Password must match")
})


const ResetPasswordForm = ({ setParentState }) => {
    const [state, setState] = React.useState({
        alert: false,
        message: null,
        severity: null,
        open: false
    })

    return (
        <Formik
            initialValues={{
                new_password: "",
                confirm_new_password: "",
            }}

            onSubmit={async (values, actions) => {
                // alert(JSON.stringify(values, null, 2));
                let payload = values;
                payload.token = window.location.search.split('=')[1]

                const endpoint = "/api/unauthenticated-change-password/"
                let res = await fetch(endpoint, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': window.getCookie('csrftoken')
                    },
                    body: JSON.stringify(payload)
                })

                if (String(res.status).slice(0, 1) === '2') {
                    setParentState({
                        step: 2
                    })
                }
                else if (String(res.status).slice(0, 1) === '4') {
                    let data = await res.json()
                    if (data.code === 1) {
                        setState({
                            alert: true,
                            severity: "error",
                            message: "Invalid Token"
                        })

                    }
                    else if (data.code === 2) {
                        setState({
                            alert: true,
                            severity: "error",
                            message: "Token Expired"
                        })

                    }
                }
            }}

            validationSchema={ResetPasswordSchema}
        >
            {props => (
                <form id="reset-password-form" onSubmit={props.handleSubmit}>
                    <div className="form-row form-row-1">
                        <div className="form-item">
                            <TextField
                                required
                                label="New password"
                                variant="outlined"
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                value={props.values.new_password}
                                name="new_password"
                                type="password"
                                error={props.touched.new_password && props.errors.new_password}
                                helperText={props.touched.new_password && props.errors.new_password ? props.errors.new_password : null}
                            />
                        </div>
                    </div>
                    <div className="form-row form-row-2">
                        <div className="form-item">
                            <TextField
                                required
                                label="Confirm new password"
                                variant="outlined"
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                value={props.values.confirm_new_password}
                                name="confirm_new_password"
                                type="password"
                                error={props.touched.confirm_new_password && props.errors.confirm_new_password}
                                helperText={props.touched.confirm_new_password && props.errors.confirm_new_password ? props.errors.confirm_new_password : null}
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
                            text="Reset"
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

export default ResetPasswordForm;
