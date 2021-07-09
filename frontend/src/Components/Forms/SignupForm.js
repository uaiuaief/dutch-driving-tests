import React from 'react'
import { Formik } from 'formik';
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import * as Yup from "yup"

const SignupSchema = Yup.object().shape({
    email: Yup.string()
        .email('Invalid email')
        .required('This field is required'),
    password: Yup.string()
        .required('This field is required')
        .min(8, 'Password must be at least 8 characters')
        .max(100, 'Too long'),
    confirm_password: Yup.string()
        .required('This field is required')
        .min(8, 'Password must be at least 8 characters')
        .max(100, 'Too long')
        .oneOf([Yup.ref('password'), null], "Password must match"),
    first_name: Yup.string()
        .required('This field is required')
        .min(2, 'Too short')
        .max(30, 'Too long'),
    last_name: Yup.string()
        .required('This field is required')
        .min(2, 'Too short')
        .max(30, 'Too long'),
    gov_username: Yup.string()
        .required('This field is required'),
    gov_password: Yup.string()
        .required('This field is required')

})

const SignupForm = ({ setParentState }) => {
    const [values, setValues] = React.useState({
        password: '',
        showPassword: false,
        showConfirmPassword: false,
        showCBRPassword: false,
    });

    const handleClickShowPassword = (prop) => {
        if (prop === 'showPassword'){         
            setValues({...values, showPassword: !values.showPassword });
        }
        else if (prop === 'showConfirmPassword'){
            setValues({...values, showConfirmPassword: !values.showConfirmPassword });
        }
        else if (prop === 'showCBRPassword'){
            setValues({...values, showCBRPassword: !values.showCBRPassword });
        }
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <Formik
            initialValues={{
                email: "",
                password: "",
                confirm_password: "",
                first_name: "",
                last_name: "",
                mobile_number: "",
                gov_username: "",
                gov_password: "",
            }}

            onSubmit={async (values, actions) => {
                // alert(JSON.stringify(values, null, 2));
                // return

                const endpoint = "/api/create-user/"
                let res = await fetch(endpoint, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': window.getCookie('csrftoken')
                    },
                    body: JSON.stringify(values)
                })

                if (String(res.status).slice(0, 1) === '2') {
                    // setParentState({ redirect: "/account" })
                    alert('Account created successfully')
                }
                else if (String(res.status).slice(0, 1) === '4') {
                    let data = await res.json()
                    alert(data.error || data.errors)
                }
            }}
            validationSchema={SignupSchema}
        // validate={(values) => {
        //     const errors = {}

        //     if (!values.email) {
        //         errors.email = 'This field is required';
        //     }
        //     else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        //         errors.email = 'Invalid email address';
        //     }

        //     return errors
        // }}
        >
            {props => (
                <form
                    id="signup-form"
                    onSubmit={props.handleSubmit}
                >
                    <Box className="form-item">
                        <TextField
                            required
                            id="email"
                            label="Email"
                            variant="outlined"
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            value={props.values.email}
                            name="email"
                            type="email"
                            error={props.touched.email && props.errors.email}
                            helperText={props.touched.email && props.errors.email ? props.errors.email : null}
                        />
                        {/* {props.touched.email && props.errors.email ? <div className="input-error">{props.errors.email}</div> : null} */}
                    </Box>
                    <Box className="form-item">
                        <TextField
                            className="icon-textfield"
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
                            type={values.showPassword ? 'text' : 'password'}
                            InputProps={{
                                endAdornment:
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => handleClickShowPassword('showPassword')}
                                            onMouseDown={handleMouseDownPassword}
                                        >
                                            {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>

                            }}
                        />
                    </Box>
                    <Box className="form-item">
                        <TextField
                            className="icon-textfield"
                            required
                            id="confirm_password"
                            label="Confirm Password"
                            variant="outlined"
                            type="password"
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            value={props.values.confirm_password}
                            name="confirm_password"
                            error={props.touched.confirm_password && props.errors.confirm_password}
                            helperText={props.touched.confirm_password && props.errors.confirm_password ? props.errors.confirm_password : null}
                            type={values.showConfirmPassword ? 'text' : 'password'}
                            InputProps={{
                                endAdornment:
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => handleClickShowPassword('showConfirmPassword')}
                                            onMouseDown={handleMouseDownPassword}
                                        >
                                            {values.showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>

                            }}
                        />
                    </Box>
                    <Box className="form-item">
                        <TextField
                            required
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
                    <Box className="form-item">
                        <TextField
                            required
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
                    <Box className="form-item">
                        <TextField
                            required
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
                    <Box className="form-item">
                        <TextField
                            required
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
                    <Box className="form-item">
                        <TextField
                            className="icon-textfield"
                            required
                            label="CBR Password"
                            variant="outlined"
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            value={props.values.gov_password}
                            name="gov_password"
                            error={props.touched.gov_password && props.errors.gov_password}
                            helperText={props.touched.gov_password && props.errors.gov_password ? props.errors.gov_password : null}
                            type={values.showCBRPassword ? 'text' : 'password'}
                            InputProps={{
                                endAdornment:
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => handleClickShowPassword('showCBRPassword')}
                                            onMouseDown={handleMouseDownPassword}
                                        >
                                            {values.showCBRPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>

                            }}

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
                            Create Account
                        </Button>
                    </Box>
                </form>
            )}
        </Formik>
    )
}

export default SignupForm;