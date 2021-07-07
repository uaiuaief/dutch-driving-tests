import React, { Component } from 'react';
import { Button, Box, Container } from '@material-ui/core'
// import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import StudentTable from '../StudentTable'
import CreateStudentScreen from "../CreateStudentScreen"
import EditStudentScreen from "../EditStudentScreen"


class AccountPage extends Component {
    state = {
        user: null,
        rows: null,
        
        show_add_student: false,
        show_edit_student: false,
        student_to_edit: null
    }

    showAddStudentScreen = () => {
        this.setState({
            show_add_student: true
        })
    }

    showEditStudentScreen = () => {
        this.setState({
            show_edit_student: true
        })
    }

    fetchProfile = async () => {
        let res = await fetch('/api/get-profile/')
        let data = await res.json()

        return data
    }

    refreshTable = () => {
        this.fetchProfile().then((data) => {
            let { students } = data.profile

            students.forEach(student => {
                let test_centers = student.test_centers.map(each => {
                    return each.name
                })
                
                student.test_centers = test_centers;
                console.log(student.test_centers)
            })
            
            this.setState({ rows: students })
        })
    }

    componentDidMount() {
        this.refreshTable()
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
                        <div style={{display: "flex", justifyContent: "space-between"}}>
                            <div>
                                <h1>Total Students</h1>
                                <h1>{this.state.rows.length}/100</h1>
                            </div>
                            <div>
                                <h1>Searching</h1>
                                <h1>250</h1>
                            </div>
                            <div>
                                <h1>Tests Found</h1>
                                <h1>0</h1>
                            </div>
                        </div>
                        <StudentTable
                            rows={this.state.rows}
                            setParentState={(state) => this.setState(state)}
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
                            setParentState={(params) => this.setState(params)}
                            refreshTable={this.refreshTable}
                            />
                        <EditStudentScreen
                            show={this.state.show_edit_student}
                            student={this.state.student_to_edit}
                            // show={true}
                            setParentState={(params) => this.setState(params)}
                            refreshTable={this.refreshTable}
                        />
                    </>
                }
            </div>
        );
    }
}

export default AccountPage;
