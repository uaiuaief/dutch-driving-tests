import React from 'react';
import { Formik } from 'formik';
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'


const ChangeEmailForm = ({ setParentState }) => {
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

                // if (String(res.status).slice(0, 1) === '2') {
                //     // setParentState({ redirect: "/account" })
                //     actions.resetForm({
                //         values: values
                //     })
                //     setState({
                //         alert: true,
                //         severity: "success",
                //         message: "Profile updated successfully",
                //     })
                // }
                // else if (String(res.status).slice(0, 1) === '4') {
                //     let data = await res.json()
                //     alert(data.error || data.errors)
                // }
            }}
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
                                    error={props.touched.password && props.errors.password}
                                    helperText={props.touched.password && props.errors.password ? props.errors.password : null}
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

export default ChangeEmailForm