import React from 'react'
import { Formik } from 'formik';
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import SnackBar from '../MaterialUIComponents/SnackBar'
import encryptedImage from "../../Assets/images/encrypted.png"
import * as Yup from "yup"


const SignupSchema = Yup.object().shape({
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

const StepOne = ({ props, values, handleClickShowPassword, handleMouseDownPassword, nextStep }) => {
    return (
        <>
            <div className="form-row form-row-1">
                <div className="form-item">
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
                </div>
                <div className="form-item">
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
            <Box mt={"2.0rem"}>
                <Button
                    onClick={() => {
                        nextStep()
                    }}
                    className="btn"
                    size="large"
                    variant="contained"
                    color="primary"
                    type="button"
                >
                    Next
                </Button>
            </Box>

        </>
    )
}

const StepTwo = ({ props, values, handleClickShowPassword, handleMouseDownPassword, previousStep }) => {
    return (
        <>
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
            <Box mt={"2.0rem"}>
                <Button
                    onClick={() => {
                        previousStep()
                    }}
                    className="btn"
                    size="large"
                    variant="contained"
                    color="primary"
                    type="button"
                >
                    Back
                </Button>
            </Box>
        </>
    )
}

const SignupForm = ({ setParentState }) => {
    const [values, setValues] = React.useState({
        password: '',
        showPassword: false,
        showConfirmPassword: false,
        showCBRPassword: false,

        alert: false,
        message: null,
        severity: null,
        open: false,

        step: 1
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

    const nextStep = () => {
        setValues({
            step: 2
        })
    }

    const previousStep = () => {
        setValues({
            step: 1
        })
    }

    const getForm = (props) => {
        if (values.step === 1) {
            return (
                <StepOne
                    props={props}
                    values={values}
                    handleClickShowPassword={handleClickShowPassword}
                    handleMouseDownPassword={handleMouseDownPassword}
                    nextStep={nextStep}
                />
            )
        }
        else {
            return (
                <StepTwo
                    props={props}
                    values={values}
                    handleClickShowPassword={handleClickShowPassword}
                    handleMouseDownPassword={handleMouseDownPassword}
                    previousStep={previousStep}
                />
            )
        }
    }

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
                alert(JSON.stringify(values, null, 2));
                return

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
                    setValues({
                        alert: true,
                        severity: "success",
                        message: "Account created successfully"
                    })
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
            validationSchema={SignupSchema}
        >
            {props => (
                <form
                    id="signup-form"
                    // onSubmit={props.handleSubmit}
                    onSubmit={() => {
                        console.log(props.values)
                    }}
                >
                    {getForm(props)}
                    {/* <StepOne
                        props={props}
                        values={values}
                        handleClickShowPassword={handleClickShowPassword}
                        handleMouseDownPassword={handleMouseDownPassword}
                    /> */}

                    {/* <div className="form-row form-row-1">
                        <div className="form-item">
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
                        </div>
                        <div className="form-item">
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
                    </div> */}


                    {/* <div className="form-item">
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
                    </div> */}
                    {/* <Box mt={"2.0rem"}>
                        <Button
                            className="btn"
                            size="large"
                            variant="contained"
                            color="primary"
                            type="submit"
                        >
                            Next
                        </Button>
                    </Box> */}
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
                </form>
            )}
        </Formik>
    )
}

export default SignupForm;