import React, { Component } from 'react';
import { Button, Box, Container } from '@material-ui/core'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import StudentTable from '../StudentTable'
import CreateStudentScreen from "../CreateStudentScreen"


class AccountPage extends Component {
    state = {
        user: null,
        rows: null,
        
        show_add_student: false
    }

    showAddStudentScreen = () => {
        this.setState({
            show_add_student: true
        })
    }

    fetchProfile = async () => {
        let res = await fetch('/api/get-profile/')
        let data = await res.json()

        return data
    }

    componentDidMount() {
        this.fetchProfile().then((data) => {
            let { students } = data.profile

            students.forEach(student => {
                let test_centers = student.test_centers.map(each => {
                    return each.name
                })

                student.test_centers = test_centers;
            })

            this.setState({ rows: students })
        })
    }

    render() {
        return (
            <div
                style={{
                    // "margin": "auto",
                    "marginTop": "50px",
                    "height": "400px",
                    "width": "100%"
                }}
            >
                {this.state.rows === null
                    ?
                    null
                    :
                    <>
                        <StudentTable
                            rows={this.state.rows}
                        />
                        <Box mt={"2.0rem"}>
                            <Button
                                onClick={this.showAddStudentScreen}
                                className="btn"
                                size="large"
                                variant="contained"
                                color="primary"
                                type="submit"
                            >
                                New Student
                            </Button>
                        </Box>
                        <CreateStudentScreen
                            show={this.state.show_add_student}
                        />
                    </>
                }
            </div>
        );
    }
}

export default AccountPage;
