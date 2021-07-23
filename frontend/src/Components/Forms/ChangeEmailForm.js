import React from 'react';
import { Formik } from 'formik';
import TextField from '@material-ui/core/TextField'
import PrimaryButton from '../Buttons/PrimaryButton'
import * as Yup from "yup"


const ChangeEmailSchema = Yup.object().shape({
    new_email: Yup.string()
        .required('This field is required')
        .email('Invalid Email'),
    password: Yup.string()
        .required('This field is required')
})


const ChangeEmailForm = ({ setParentState, loadProfile }) => {
    const goBack = () => {
        setParentState({
            subMenu: false
        })
    }

    return (
        <Formik
            initialValues={{
                new_email: "",
                password: ""
            }}

            onSubmit={async (values, actions) => {
                // alert(JSON.stringify(values, null, 2));
                // return

                const endpoint = "/api/change-email/"
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
                    if (data.code === 3){
                        actions.setErrors({
                            password: data.error
                        })
                    }
                    else if (data.code === 4){
                        actions.setErrors({
                            new_email: data.error
                        })
                    }
                }
            }}

            validationSchema={ChangeEmailSchema}
        >
            {props => {
                return (
                    <form
                        id="change-email-form"
                        onSubmit={props.handleSubmit}
                    >
                        <div className="form-row form-row-1">
                            <div className="form-item">
                                <TextField
                                    required
                                    label="New Email"
                                    variant="outlined"
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                    type='email'
                                    value={props.values.new_email}
                                    name="new_email"
                                    error={props.touched.new_email && props.errors.new_email}
                                    helperText={props.touched.new_email && props.errors.new_email ? props.errors.new_email : null}
                                />
                            </div>
                        </div>
                        <div className="form-row form-row-2">
                            <div className="form-item">
                                <TextField
                                    required
                                    label="Password"
                                    variant="outlined"
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                    value={props.values.password}
                                    name="password"
                                    type="password"
                                    error={props.touched.password && props.errors.password}
                                    helperText={props.touched.password && props.errors.password ? props.errors.password : null}
                                />
                            </div>
                        </div>
                        <div className="button-container">
                            <PrimaryButton
                                onClick={goBack}
                                className="btn"
                                size="large"
                                variant="contained"
                                color="primary"
                                type="button"
                                text="Back"
                            />
                            <PrimaryButton
                                className="btn"
                                size="large"
                                variant="contained"
                                color="primary"
                                type="submit"
                                text="Save"
                            />
                        </div>
                    </form>
                )
            }}
        </Formik>
    )
}

export default ChangeEmailForm