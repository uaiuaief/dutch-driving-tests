import ConfirmDeleteDialog from '../MaterialUIComponents/ConfirmDeleteDialog'
import React from 'react';
import { Formik } from 'formik';
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import TextField from '@material-ui/core/TextField'
import TestCenters from './TestCenters'
import SnackBar from '../MaterialUIComponents/SnackBar'
import * as Yup from "yup"


const UpdateStudentSchema = Yup.object().shape({
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
        .nullable()
        .matches(/^[0-9]{1,2}(,[0-9]{1,2})*$/, 'Must have days divided by a comma eg:(15,16,17)')
})


const UpdateStudentForm = ({ setParentState, student, refreshTable }) => {
    const [state, setState] = React.useState({
        alert: false,
        message: null,
        severity: null,
        open: false
    })

    const deleteStudent = async () => {
        const endpoint = "/api/delete-student/"
        let res = await fetch(endpoint, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': window.getCookie('csrftoken')
            },
            body: JSON.stringify({ student_id: student.id })
        })

        if (String(res.status).slice(0, 1) === '2') {
            setState({
                alert: true,
                severity: "success",
                message: `${student.first_name} ${student.last_name} was removed successfully`,
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
        }
    }

    return (
        <Formik
            initialValues={{
                student_id: student.id,
                candidate_number: student.candidate_number,
                birth_date: student.birth_date,
                first_name: student.first_name,
                last_name: student.last_name,
                test_type: student.test_type,
                earliest_test_date: student.earliest_test_date,
                days_to_skip: student.days_to_skip,
                test_centers: student.test_centers,
            }}

            onSubmit={async (values, actions) => {
                // alert(JSON.stringify(values, null, 2));
                // return

                const endpoint = "/api/update-student/"
                let res = await fetch(endpoint, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': window.getCookie('csrftoken')
                    },
                    body: JSON.stringify(values)
                })

                if (String(res.status).slice(0, 1) === '2') {
                    actions.resetForm({
                        values: values
                    })
                    setState({
                        alert: true,
                        severity: "success",
                        message: "Student updated successfully",
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
                }
            }}

            validationSchema={UpdateStudentSchema}

        >
            {props => (
                <form onSubmit={props.handleSubmit}>
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
                            value={props.values.days_to_skip}
                            name="days_to_skip"
                            error={props.touched.days_to_skip && props.errors.days_to_skip}
                            helperText={props.touched.days_to_skip && props.errors.days_to_skip ? props.errors.days_to_skip : null}
                        />
                        <select
                            required
                            id="multiple-select"
                            multiple
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            name="test_centers"
                            value={props.values.test_centers}
                            error={props.touched.test_centers && props.errors.test_centers}
                            helperText={props.touched.test_centers && props.errors.test_centers ? props.errors.test_centers : null}
                        >
                            <TestCenters/>
                        </select>
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
                            Update Student
                        </Button>
                        <Button
                            // onClick={(e) => deleteStudent()}
                            onClick={(e) => setState({ open: true })}
                            className="btn"
                            size="large"
                            variant="contained"
                            color="secondary"
                            type="button"
                        >
                            Delete Student
                        </Button>
                        {state.open
                            ?
                            <ConfirmDeleteDialog
                                deleteStudent={deleteStudent}
                                setParentState={state => setState(state)}
                            />
                            :
                            null
                        }
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


export default UpdateStudentForm;