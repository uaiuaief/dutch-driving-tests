import React from 'react';
import { Formik } from 'formik';
import { TextField } from '@material-ui/core'
import PrimaryButton from '../Buttons/PrimaryButton'
import * as Yup from "yup"
import SnackBar from '../MaterialUIComponents/SnackBar'


const ForgotPasswordForm = ({ setParentState }) => {
    const [state, setState] = React.useState({
        alert: false,
        message: null,
        severity: null,
        open: false
    })

    return (
        <Formik
            initialValues={{
                email: ""
            }}

            onSubmit={async (values, actions) => {
                // alert(JSON.stringify(values, null, 2));

                const endpoint = "/api/recover-password/"
                let res = await fetch(endpoint, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': window.getCookie('csrftoken')
                    },
                    body: JSON.stringify(values)
                })
                
                setParentState({step: 2})
            }}
        >
            {props => (
                <form id="forgot-password-form" onSubmit={props.handleSubmit}>
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
                    <div>
                        <PrimaryButton
                            className="btn"
                            size="large"
                            variant="contained"
                            color="primary"
                            type="submit"
                            text="Send Email"
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

export default ForgotPasswordForm;
