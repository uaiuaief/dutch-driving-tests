import { Formik } from 'formik';
import React from 'react';
import { Button, Box, TextField } from '@material-ui/core'
import SnackBar from '../MaterialUIComponents/SnackBar'
import * as Yup from "yup"


const UpdateProfileSchema = Yup.object().shape({
    first_name: Yup.string()
        .required('This field is required')
        .min(2, 'Too short')
        .max(30, 'Too long'),
    last_name: Yup.string()
        .required('This field is required')
        .min(2, 'Too short')
        .max(30, 'Too long'),
    mobile_number: Yup.string()
        .required('This field is required')
        .matches(/^[0-9]*$/, 'Mobile number can only contain numbers')
        .min(8, 'Too short')
        .max(12, 'Too long'),
    gov_username: Yup.string()
        .required('This field is required'),
    gov_password: Yup.string()
        .required('This field is required')
})


const UpdateProfileForm = ({ setParentState, profile }) => {
    const [state, setState] = React.useState({
        alert: false,
        message: null,
        severity: null,
        open: false
    })
    
    return (
        <Formik
            initialValues={{
                first_name: profile.first_name,
                last_name: profile.last_name,
                mobile_number: profile.mobile_number,
                gov_username: profile.gov_username,
                gov_password: profile.gov_password,
            }}

            onSubmit={async (values, actions) => {
                // alert(JSON.stringify(values, null, 2));
                // return

                const endpoint = "/api/update-profile/"
                let res = await fetch(endpoint, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': window.getCookie('csrftoken')
                    },
                    body: JSON.stringify(values)
                })

                if (String(res.status).slice(0, 1) === '2') {
                    // setParentState({ redirect: "/account" })
                    actions.resetForm({
                        values: values
                    })
                    setState({
                        alert: true,
                        severity: "success",
                        message: "Profile updated successfully",
                    })
                }
                else if (String(res.status).slice(0, 1) === '4') {
                    let data = await res.json()
                    alert(data.error || data.errors)
                }
            }}

            validationSchema={UpdateProfileSchema}
        >
            {props => (
                <form onSubmit={props.handleSubmit}>
                    <Box mt={".9rem"}>
                        <TextField
                            label="First Name"
                            variant="outlined"
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            value={props.values.first_name}
                            name="first_name"
                            error={props.touched.first_name && props.errors.first_name}
                            helperText={props.touched.first_name && props.errors.first_name ? props.errors.first_name : null}
                        />
                    </Box>
                    <Box mt={".9rem"}>
                        <TextField
                            label="Last Name"
                            variant="outlined"
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            value={props.values.last_name}
                            name="last_name"
                            error={props.touched.last_name && props.errors.last_name}
                            helperText={props.touched.last_name && props.errors.last_name ? props.errors.last_name : null}
                        />
                    </Box>
                    <Box mt={".9rem"}>
                        <TextField
                            label="Mobile Number"
                            variant="outlined"
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            value={props.values.mobile_number}
                            name="mobile_number"
                            error={props.touched.mobile_number && props.errors.mobile_number}
                            helperText={props.touched.mobile_number && props.errors.mobile_number ? props.errors.mobile_number : null}
                        />
                    </Box>
                    <Box mt={".9rem"}>
                        <TextField
                            label="CBR Username"
                            variant="outlined"
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            value={props.values.gov_username}
                            name="gov_username"
                            error={props.touched.gov_username && props.errors.gov_username}
                            helperText={props.touched.gov_username && props.errors.gov_username ? props.errors.gov_username : null}
                        />
                    </Box>
                    <Box mt={".9rem"}>
                        <TextField
                            label="CBR Password"
                            variant="outlined"
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            value={props.values.gov_password}
                            name="gov_password"
                            type="password"
                            error={props.touched.gov_password && props.errors.gov_password}
                            helperText={props.touched.gov_password && props.errors.gov_password ? props.errors.gov_password : null}
                        />
                    </Box>
                    <Box mt={"2.0rem"}>
                        <Button
                            disabled={!props.dirty || !props.isValid || props.isSubmitting}
                            className="btn"
                            size="large"
                            variant="contained"
                            color="primary"
                            type="submit"
                        >
                            Update Profile
                        </Button>
                    </Box>
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

export default UpdateProfileForm;