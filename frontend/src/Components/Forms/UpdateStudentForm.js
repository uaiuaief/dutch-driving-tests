import ConfirmDeleteDialog from '../MaterialUIComponents/ConfirmDeleteDialog'
import React from 'react';
import { Formik } from 'formik';
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import TextField from '@material-ui/core/TextField'
import TestCenters from './TestCenters'


const UpdateStudentForm = ({ setParentState, student, refreshTable }) => {
    let [state, setState] = React.useState({ open: false })

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
            alert(`${student.first_name} ${student.last_name} was removed successfully`)
            refreshTable()
        }
        else if (String(res.status).slice(0, 1) === '4') {
            let data = await res.json()
            alert(data.error || data.errors)
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
                    alert('student updated successfully')
                    refreshTable()
                }
                else if (String(res.status).slice(0, 1) === '4') {
                    let data = await res.json()
                    alert(data.error || data.errors)
                }
            }}
        >
            {props => (
                <form onSubmit={props.handleSubmit}>
                    <Box>
                        <TextField
                            label="Candidate Number"
                            variant="outlined"
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            value={props.values.candidate_number}
                            name="candidate_number"
                        />
                        <TextField
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
                        >
                            <option value=""></option>
                            <option>A</option>
                            <option>B</option>
                        </TextField>
                    </Box>
                    <Box mt={".9rem"}>
                        <TextField
                            label="First Name"
                            variant="outlined"
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            value={props.values.first_name}
                            name="first_name"
                        />
                        <TextField
                            label="Last Name"
                            variant="outlined"
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            value={props.values.last_name}
                            name="last_name"
                        />
                    </Box>
                    <Box mt={".9rem"}>
                        <TextField
                            label="Date of Birth"
                            variant="outlined"
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            value={props.values.birth_date}
                            name="birth_date"
                        />
                        <TextField
                            label="Earliest Date"
                            variant="outlined"
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            value={props.values.earliest_test_date}
                            name="earliest_test_date"
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
                        />
                        <select
                            id="multiple-select"
                            multiple
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            name="test_centers"
                            value={props.values.test_centers}
                        >
                            <TestCenters/>
                        </select>
                    </Box>
                    <Box mt={"2.0rem"}>
                        <Button
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
                </form>
            )}
        </Formik>
    )
}


export default UpdateStudentForm;