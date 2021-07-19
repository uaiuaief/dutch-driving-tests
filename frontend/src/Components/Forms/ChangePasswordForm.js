import React from 'react';
import { Formik } from 'formik';
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import * as Yup from "yup"


const ChangePasswordSchema = Yup.object().shape({
    current_password: Yup.string()
        .required('This field is required')
        .max(100, 'Too long'),
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


const ChangePasswordForm = ({ setParentState, loadProfile }) => {
    const goBack = () => {
        setParentState({
            subMenu: false
        })
    }

    return (
        <Formik
            initialValues={{
                current_password: "",
                new_password: "",
                confirm_new_password: ""
            }}

            onSubmit={async (values, actions) => {
                // alert(JSON.stringify(values, null, 2));
                // return

                const endpoint = "/api/change-password/"
                let res = await fetch(endpoint, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': window.getCookie('csrftoken')
                    },
                    body: JSON.stringify(values)
                })

                if (String(res.status).slice(0, 1) === '2') {
                    setParentState({
                        subMenu: 'success-email'
                    })
                }
                else if (String(res.status).slice(0, 1) === '4') {
                    let data = await res.json()
                    if (data.code === 4){
                        actions.setErrors({
                            current_password: data.error
                        })
                    }
                }
            }}

            validationSchema={ChangePasswordSchema}
        >
            {props => {
                return (
                    <form
                        id="change-password-form"
                        onSubmit={props.handleSubmit}
                    >
                        <div className="form-row form-row-1">
                            <div className="form-item">
                                <TextField
                                    required
                                    label="Current Password"
                                    variant="outlined"
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                    value={props.values.current_password}
                                    name="current_password"
                                    type="password"
                                    error={props.touched.current_password && props.errors.current_password}
                                    helperText={props.touched.current_password && props.errors.current_password ? props.errors.current_password : null}
                                />
                            </div>
                        </div>
                        <div className="form-row form-row-2">
                            <div className="form-item">
                                <TextField
                                    required
                                    label="New Password"
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
                        <div className="form-row form-row-3">
                            <div className="form-item">
                                <TextField
                                    required
                                    label="Confirm New Password"
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
                        <div className="button-container">
                            <Button
                                onClick={goBack}
                                className="btn"
                                size="large"
                                variant="contained"
                                color="primary"
                                type="button"
                            >
                                Back
                            </Button>
                            <Button
                                className="btn"
                                size="large"
                                variant="contained"
                                color="primary"
                                type="submit"
                            >
                                Save
                            </Button>
                        </div>
                    </form>
                )
            }}
        </Formik>
    )
}

export default ChangePasswordForm