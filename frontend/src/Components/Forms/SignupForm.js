import React from 'react'
import { Formik } from 'formik';
import PrimaryButton from '../Buttons/PrimaryButton'
import Box from '@material-ui/core/Box'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import SnackBar from '../MaterialUIComponents/SnackBar'
import encryptedImage from "../../Assets/images/encrypted.png"
import TestCenters from './TestCenters'
import * as Yup from "yup"


const SignupSchemaStepOne = Yup.object().shape({
    email: Yup.string()
        .email('Invalid email')
        .required('This field is required'),
    password: Yup.string()
        .required('This field is required')
        .min(8, 'Password must be at least 8 characters long')
        .max(100, 'Too long'),
    confirm_password: Yup.string()
        .required('This field is required')
        .min(8, 'Password must be at least 8 characters long')
        .max(100, 'Too long')
        .oneOf([Yup.ref('password'), null], "Password must match"),
    full_name: Yup.string()
        .required('This field is required')
        .min(2, 'Too short')
        .max(60, 'Too long'),
    driving_school_name: Yup.string()
        .required('This field is required')
        .min(2, 'Too short')
        .max(150, 'Too long'),
    mobile_number: Yup.string()
        .required('This field is required')
        .matches(/^[0-9]*$/, 'Mobile number can only contain numbers')
        .min(8, 'Too short')
        .max(12, 'Too long'),
    test_center: Yup.string()
        .required('This field is required'),
    test_type: Yup.string()
        .required('This field is required')
})

const SignupSchemaStepTwo = Yup.object().shape({
    gov_username: Yup.string()
        .required('This field is required'),
    gov_password: Yup.string()
        .required('This field is required')
})

const StepOne = ({ values, handleClickShowPassword, handleMouseDownPassword, nextStep, setParentState, parentState }) => {
    const { email, password, confirm_password, full_name, driving_school_name, mobile_number, test_center, test_type } = parentState
    return (
        <Formik
            initialValues={{
                email: email,
                password: password,
                confirm_password: confirm_password,
                driving_school_name: driving_school_name,
                full_name: full_name,
                mobile_number: mobile_number,
                test_center: test_center,
                test_type: test_type,
            }}

            onSubmit={async (values, actions) => {
                setParentState({
                    ...values
                })
                nextStep()
            }}
            validationSchema={SignupSchemaStepOne}
        >
            {props => (
                <form id="signup-form" onSubmit={props.handleSubmit}>
                    <div className="form-row form-row-1">
                        <div className="form-item">
                            <TextField
                                required
                                label="Full Name"
                                variant="outlined"
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                value={props.values.full_name}
                                name="full_name"
                                error={props.touched.full_name && props.errors.full_name}
                                helperText={props.touched.full_name && props.errors.full_name ? props.errors.full_name : null}
                            />
                        </div>
                        <div className="form-item">
                            <TextField
                                required
                                label="Driving School Name"
                                variant="outlined"
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                value={props.values.driving_school_name}
                                name="driving_school_name"
                                error={props.touched.driving_school_name && props.errors.driving_school_name}
                                helperText={props.touched.driving_school_name && props.errors.driving_school_name ? props.errors.driving_school_name : null}
                            />
                        </div>
                    </div>
                    <div className="form-row form-row-2">
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
                                type="email"
                                error={props.touched.email && props.errors.email}
                                helperText={props.touched.email && props.errors.email ? props.errors.email : null}
                            />
                        </div>
                        <div className="form-item">
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
                        </div>
                    </div>

                    <div className="form-row form-row-3">
                        <div className="form-item">
                            <TextField
                                id="test-center-select"
                                label="Test Center"
                                variant="outlined"
                                InputLabelProps={{ shrink: true }}
                                select
                                SelectProps={{
                                    native: true,
                                }}
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                value={props.values.test_center}
                                name="test_center"
                                error={props.touched.test_center && props.errors.test_center}
                                helperText={props.touched.test_center && props.errors.test_center ? props.errors.test_center : null}
                            >
                                <TestCenters />
                            </TextField>
                        </div>
                        <div className="form-item">
                            <TextField
                                required
                                label="Test Type"
                                variant="outlined"
                                InputLabelProps={{ shrink: true }}
                                select
                                SelectProps={{
                                    native: true,
                                }}
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                value={props.values.test_type}
                                name="test_type"
                                error={props.touched.test_type && props.errors.test_type}
                                helperText={props.touched.test_type && props.errors.test_type ? props.errors.test_type : null}
                            >
                                <option value="">--- select ---</option>
                                <option>A</option>
                                <option>B</option>
                            </TextField>
                        </div>
                    </div>

                    <div className="form-row form-row-4">
                        <div className="form-item">
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
                        </div>
                        <div className="form-item">
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
                        </div>
                    </div>
                    <Box className="button-container">
                        <PrimaryButton
                            className="btn"
                            size="large"
                            variant="contained"
                            color="primary"
                            type="submit"
                            text="Next"
                        />
                    </Box>
                </form>
            )}
        </Formik>
    )
}

const StepTwo = ({ values, handleClickShowPassword, handleMouseDownPassword, previousStep, nextStep, setParentState, parentState, setValues }) => {
    const { email, password, confirm_password, full_name, mobile_number, gov_username, gov_password, test_center, test_type, driving_school_name } = parentState
    return (
        <Formik
            initialValues={{
                gov_username: gov_username,
                gov_password: gov_password
            }}

            onSubmit={async (values, actions) => {
                let payload = {
                    email: email,
                    password: password,
                    confirm_password: confirm_password,
                    full_name: full_name,
                    driving_school_name: driving_school_name,
                    test_center: test_center,
                    test_type: test_type,
                    mobile_number: mobile_number,
                    ...values
                }
                // alert(JSON.stringify(payload, null, 2));
                // return

                const endpoint = "/api/create-user/"
                let res = await fetch(endpoint, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': window.getCookie('csrftoken')
                    },
                    body: JSON.stringify(payload)
                })

                if (String(res.status).slice(0, 1) === '2') {
                    nextStep()
                }
                else if (String(res.status).slice(0, 1) === '4') {
                    let data = await res.json()
                    setValues({
                        alert: true,
                        severity: "error",
                        message: data.error || data.errors
                    })
                }
            }}
            validationSchema={SignupSchemaStepTwo}
        >
            {props => (
                <form id="signup-form" onSubmit={props.handleSubmit}>
                    <img src={encryptedImage}>
                    </img>
                    <h2 className="encrypted">Your data is encrypted</h2>
                    <div className="form-row form-row-1">
                        <div className="form-item">
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
                        </div>
                    </div>
                    <div className="form-row form-row-2">
                        <div className="form-item">
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
                        </div>
                    </div>
                    <Box className="button-container">
                        <PrimaryButton
                            onClick={() => {
                                setParentState({
                                    ...props.values
                                })
                                previousStep()
                            }}
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
                            text="Next"
                        />
                    </Box>
                </form>
            )}
        </Formik>
    )
}

const SignupForm = ({ setParentState, parentState, nextStep, previousStep }) => {
    const [values, setValues] = React.useState({
        password: '',
        showPassword: false,
        showConfirmPassword: false,
        showCBRPassword: false,

        alert: false,
        message: null,
        severity: null,
        open: false
    });

    const handleClickShowPassword = (prop) => {
        if (prop === 'showPassword') {
            setValues({ ...values, showPassword: !values.showPassword });
        }
        else if (prop === 'showConfirmPassword') {
            setValues({ ...values, showConfirmPassword: !values.showConfirmPassword });
        }
        else if (prop === 'showCBRPassword') {
            setValues({ ...values, showCBRPassword: !values.showCBRPassword });
        }
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const getForm = () => {
        if (parentState.step === 1) {
            return (
                <StepOne
                    values={values}
                    handleClickShowPassword={handleClickShowPassword}
                    handleMouseDownPassword={handleMouseDownPassword}
                    nextStep={nextStep}
                    parentState={parentState}
                    setParentState={setParentState}
                />
            )
        }
        else {
            return (
                <StepTwo
                    values={values}
                    handleClickShowPassword={handleClickShowPassword}
                    handleMouseDownPassword={handleMouseDownPassword}
                    previousStep={previousStep}
                    nextStep={nextStep}
                    parentState={parentState}
                    setParentState={setParentState}
                    setValues={setValues}
                />
            )
        }
    }

    return (
        <div>
            {getForm()}
            {values.alert
                ?
                <SnackBar
                    open={true}
                    setParentState={setValues}
                    message={values.message}
                    severity={values.severity}
                />
                :
                null
            }
        </div>
    )
}

export default SignupForm;