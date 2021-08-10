import { Formik } from 'formik';
import React from 'react';
import { Box, TextField } from '@material-ui/core'
import PrimaryButton from '../Buttons/PrimaryButton'
import SnackBar from '../MaterialUIComponents/SnackBar'
import * as Yup from "yup"
import InputButton from '../Buttons/InputButton'
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import TestCenters from './TestCenters'


const UpdateProfileSchema = Yup.object().shape({
    driving_school_name: Yup.string()
        .required('This field is required')
        .min(2, 'Too short')
        .max(150, 'Too long'),
    mobile_number: Yup.string()
        .required('This field is required')
        .matches(/^[0-9]*$/, 'Mobile number can only contain numbers')
        .min(8, 'Too short')
        .max(12, 'Too long')
})


const UpdateProfileForm = ({ setParentState, profile }) => {
    const [state, setState] = React.useState({
        alert: false,
        message: null,
        severity: null,
        open: false,

        showPassword: false,
    })

    const goToChangePassword = () => {
        setParentState({
            subMenu: 'change-password'
        })
    }

    const goToChangeEmail = () => {
        setParentState({
            subMenu: 'change-email'
        })
    }

    const handleClickShowPassword = () => {
        setState({ ...state, showPassword: !state.showPassword });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <Formik
            initialValues={{
                driving_school_name: profile.driving_school_name,
                test_type: profile.test_type,
                mobile_number: profile.mobile_number,
                email: profile.email,
                password: '************',
                test_center: profile.test_center.name,
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
                    <div className="form-row form-row-1">
                        <div className="form-item">
                            <TextField
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
                                disabled={true}
                                error={props.touched.test_type && props.errors.test_type}
                                helperText={props.touched.test_type && props.errors.test_type ? props.errors.test_type : null}
                            >
                                <option value="">--- select ---</option>
                                <option>ATH</option>
                                <option>BTH</option>
                            </TextField>
                        </div>
                    </div>
                    <div className="form-row form-row-2">
                        <div className="form-item">
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
                        </div>
                        <div className="form-item">
                            <TextField
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
                                disabled={true}
                                error={props.touched.test_center && props.errors.test_center}
                                helperText={props.touched.test_center && props.errors.test_center ? props.errors.test_center : null}
                            >
                                <TestCenters />
                            </TextField>
                        </div>
                    </div>
                    <div className="form-row form-row-3">
                        <div className="form-item">
                            <TextField
                                label="Email"
                                variant="outlined"
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                value={props.values.email}
                                name="email"
                                disabled={true}
                                error={props.touched.email && props.errors.email}
                                helperText={props.touched.email && props.errors.email ? props.errors.email : null}
                            />
                            <InputButton
                                onClick={goToChangeEmail}
                                text='Change Email'
                            />
                        </div>
                        <div className="form-item">
                            <TextField
                                label="Password"
                                variant="outlined"
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                disabled={true}
                                inputProps={{
                                    type: 'password'
                                }}
                                value={props.values.password}
                                name="password"
                                error={props.touched.password && props.errors.password}
                                helperText={props.touched.password && props.errors.password ? props.errors.password : null}
                            />
                            <InputButton
                                onClick={goToChangePassword}
                                text='Change Password'
                            />
                        </div>
                    </div>

                    <h1 className="menu-header menu-header-2">CBR Details</h1>

                    <div className="form-row form-row-4">
                        <div className="form-item">
                            <TextField
                                label="CBR Username"
                                variant="outlined"
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                value={props.values.gov_username}
                                name="gov_username"
                                disabled={true}
                                error={props.touched.gov_username && props.errors.gov_username}
                                helperText={props.touched.gov_username && props.errors.gov_username ? props.errors.gov_username : null}
                            />
                        </div>
                        <div className="form-item">
                            <TextField
                                id="gov-password"
                                label="CBR Password"
                                variant="outlined"
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                value={props.values.gov_password}
                                name="gov_password"
                                type="password"
                                disabled={true}
                                error={props.touched.gov_password && props.errors.gov_password}
                                helperText={props.touched.gov_password && props.errors.gov_password ? props.errors.gov_password : null}
                                type={state.showPassword ? 'text' : 'password'}
                                InputProps={{
                                    endAdornment:
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={() => handleClickShowPassword('showCBRPassword')}
                                                onMouseDown={handleMouseDownPassword}
                                            >
                                                {state.showPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                }}
                            />
                        </div>
                    </div>
                    <Box mt={"2.0rem"}>
                        <PrimaryButton
                            disabled={!props.dirty || !props.isValid || props.isSubmitting}
                            className="btn"
                            size="large"
                            variant="contained"
                            color="primary"
                            type="submit"
                            text="Save"
                        />
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