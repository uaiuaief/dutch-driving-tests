import { Formik } from 'formik';
import { Button, Box, Container, TextField } from '@material-ui/core'


const LoginForm = ({setParentState}) => (
    <Formik
        initialValues={{
            email: "",
            password: ""
        }}

        onSubmit={ async (values, actions) => {
            // alert(JSON.stringify(values, null, 2));
            
            const endpoint = "/api/login/"
            let res = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': window.getCookie('csrftoken')
                },
                body: JSON.stringify(values)
            })

            if (String(res.status).slice(0, 1) === '2') {
                // setParentState({redirect: "/account"})
                window.location = '/account'
                // alert('success')
            }
            else if (String(res.status).slice(0, 1) === '4') {
                alert('Email or Password are incorrect')
            }
        }}
    >
        {props => (
            <form onSubmit={props.handleSubmit}>
                <Box>
                    <TextField
                        id="email"
                        label="Email"
                        variant="outlined"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.email}
                        name="email"
                    />
                </Box>
                <Box mt={".5rem"}>
                    <TextField
                        id="password"
                        label="Password"
                        variant="outlined"
                        type="password"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.password}
                        name="password"
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
                        Login
                    </Button>
                </Box>
            </form>
        )}
    </Formik>
)

export default LoginForm;
