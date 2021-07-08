import { Formik } from 'formik';
import { Button, Box, TextField } from '@material-ui/core'


const UpdateProfileForm = ({ setParentState, profile }) => {
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
                    alert('Profile updated successfully')
                }
                else if (String(res.status).slice(0, 1) === '4') {
                    let data = await res.json()
                    alert(data.error || data.errors)
                }
            }}
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
                            Update Profile
                        </Button>
                    </Box>
                </form>
            )}
        </Formik>
    )
}

export default UpdateProfileForm;