import React from 'react';
import { Formik } from 'formik';
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import TextField from '@material-ui/core/TextField'
import SnackBar from '../MaterialUIComponents/SnackBar'


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
                        />
                        <TextField
                            required
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
                            required
                            label="Date of Birth"
                            variant="outlined"
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            value={props.values.birth_date}
                            name="birth_date"
                        />
                        <TextField
                            required
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
                        >
                            <option>Almelo (Bedrijvenpark Twente 305)</option>
                            <option>Kerkrade (Spekhofstraat 24)</option>
                            <option>Curitiba</option>
                            <option>São Paulo</option>
                            <option>New York</option>
                            <option>Texas</option>
                            <option>Seoul</option>
                            <option>New Zealand</option>
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