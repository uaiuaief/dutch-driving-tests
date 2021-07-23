import React from 'react';
import { Formik } from 'formik';
import PrimaryButton from '../Buttons/PrimaryButton'
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
        .required('This field is required'),
    test_type: Yup.string()
        .required('This field is required'),
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
        .required('This field is required'),
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
                    actions.resetForm()

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
                    id="add-student-form"
                    onSubmit={props.handleSubmit}
                >
                    <div className="form-row form-row-1">
                        <div className="form-item">
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
                        </div>
                        <div className="form-item">
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
                        </div>
                    </div>
                    <div className="form-row form-row-2">
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
                    <div className="form-row form-row-3">
                        <div className="form-item">
                            <TextField
                                required
                                label="Date of Birth"
                                variant="outlined"
                                InputLabelProps={{ shrink: true }}
                                inputProps={{
                                    type: "date"
                                }}
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                value={props.values.birth_date}
                                name="birth_date"
                                error={props.touched.birth_date && props.errors.birth_date}
                                helperText={props.touched.birth_date && props.errors.birth_date ? props.errors.birth_date : null}
                            />
                        </div>
                        <div className="form-item">
                            <TextField
                                required
                                label="Earliest Date"
                                variant="outlined"
                                InputLabelProps={{ shrink: true }}
                                inputProps={{
                                    type: "date"
                                }}
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                value={props.values.earliest_test_date}
                                name="earliest_test_date"
                                error={props.touched.earliest_test_date && props.errors.earliest_test_date}
                                helperText={props.touched.earliest_test_date && props.errors.earliest_test_date ? props.errors.earliest_test_date : null}
                            />
                        </div>
                    </div>
                    <div className="form-row form-row-4">
                        <div className="form-item">
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
                        </div>
                        <div className="form-item">
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
                            text="Create"
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


export default AddStudentForm;