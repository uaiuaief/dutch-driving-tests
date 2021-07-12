import React from 'react';
import { Formik } from 'formik';
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import TextField from '@material-ui/core/TextField'
import SnackBar from '../MaterialUIComponents/SnackBar'
import TestCenters from './TestCenters'
import * as Yup from "yup"


const NewStudentSchema = Yup.object().shape({
    candidate_number: Yup.string()
        .required('This field is required')
        .max(100, 'Too long')
        .matches(/^[0-9]*$/, 'Candidate number can only contain numbers'),
    birth_date: Yup.string()
        .required('This field is required')
        .min(8, 'Password must be at least 8 characters')
        .max(100, 'Too long'),
    test_type: Yup.string()
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
    earliest_test_date: Yup.string()
        .required('This field is required')
        .min(2, 'Too short')
        .max(30, 'Too long'),
    test_centers: Yup.string()
        .required('This field is required')
        .min(2, 'Too short')
        .max(30, 'Too long'),
    days_to_skip: Yup.string()
        .matches(/^[0-9]{1,2}(,[0-9]{1,2})*$/, 'Must have days divided by a comma eg:(15,16,17)')
})

const AddStudentForm = ({ setParentState, refreshTable }) => {
    const [state, setState] = React.useState({
        alert: false,
        message: null,
        severity: null,
    })

    return (
        <Formik
            initialValues={{
                candidate_number: "",
                birth_date: "",
                first_name: "",
                last_name: "",
                test_type: "",
                earliest_test_date: "",
                days_to_skip: "",
                test_centers: [],
            }}

            onSubmit={async (values, actions) => {
                // alert(JSON.stringify(values, null, 2));
                // return

                const endpoint = "/api/create-student/"
                let res = await fetch(endpoint, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': window.getCookie('csrftoken')
                    },
                    body: JSON.stringify(values)
                })

                if (String(res.status).slice(0, 1) === '2') {
                    // alert('student created successfully')
                    setState({
                        alert: true,
                        severity: "success",
                        message: "Student created successfully",
                    })
                    refreshTable()

                }
                else if (String(res.status).slice(0, 1) === '4') {
                    let data = await res.json()
                    setState({
                        alert: true,
                        severity: "error",
                        message: data.error || data.errors,
                    })
                    // alert(data.error || data.errors)
                }
            }}
            validationSchema={NewStudentSchema}
        >
            {props => (
                <form
                    onSubmit={props.handleSubmit}
                >
                    <Box>
                        <TextField
                            required
                            label="Candidate Number"
                            variant="outlined"
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            value={props.values.candidate_number}
                            name="candidate_number"
                            error={props.touched.candidate_number && props.errors.candidate_number}
                            helperText={props.touched.candidate_number && props.errors.candidate_number ? props.errors.candidate_number : null}
                        />
                        <TextField
                            required
                            label="Test Type"
                            variant="outlined"
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
                            <option value=""></option>
                            <option>A</option>
                            <option>B</option>
                        </TextField>
                    </Box>
                    <Box mt={".9rem"}>
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
                    <Box mt={".9rem"}>
                        <TextField
                            required
                            label="Date of Birth"
                            variant="outlined"
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            value={props.values.birth_date}
                            name="birth_date"
                            error={props.touched.birth_date && props.errors.birth_date}
                            helperText={props.touched.birth_date && props.errors.birth_date ? props.errors.birth_date : null}
                        />
                        <TextField
                            required
                            label="Earliest Date"
                            variant="outlined"
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            value={props.values.earliest_test_date}
                            name="earliest_test_date"
                            error={props.touched.earliest_test_date && props.errors.earliest_test_date}
                            helperText={props.touched.earliest_test_date && props.errors.earliest_test_date ? props.errors.earliest_test_date : null}
                        />
                    </Box>
                    <Box mt={".9rem"}>
                        <TextField
                            label="Days to Skip"
                            variant="outlined"
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            placeholder={'Eg: 14,15,16'}
                            value={props.values.days_to_skip}
                            name="days_to_skip"
                            error={props.touched.days_to_skip && props.errors.days_to_skip}
                            helperText={props.touched.days_to_skip && props.errors.days_to_skip ? props.errors.days_to_skip : null}
                        />
                        <TextField
                            required
                            id="multiple-select"
                            select
                            SelectProps={{
                                multiple: true,
                                native: true
                            }}
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            name="test_centers"
                            value={props.values.test_centers}
                            error={props.touched.test_centers && props.errors.test_centers}
                            helperText={props.touched.test_centers && props.errors.test_centers ? props.errors.test_centers : null}
                        >
                            <TestCenters />
                        </TextField>
                    </Box>
                    <Box mt={"2.0rem"}>
                        <Button
                            className="btn"
                            size="large"
                            variant="contained"
                            color="primary"
                            type="submit"
                        >
                            Add Student
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


export default AddStudentForm;