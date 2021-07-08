import React, { Component } from 'react';
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import StudentTable from '../StudentTable'
import CreateStudentScreen from "../CreateStudentScreen"
import EditStudentScreen from "../EditStudentScreen"
import { Redirect } from 'react-router-dom';


class AccountPage extends Component {
    state = {
        profile: null,
        rows: null,
        
        show_add_student: false,
        show_edit_student: false,
        student_to_edit: null,

        redirect: false,
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

    refreshTable = () => {
        window.fetchProfile().then((data) => {
            if (data === null){
                this.setState({
                    redirect: true
                })
                return
            }
            else {
                this.setState({
                    profile: data.profile
                })
            }

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

    componentDidMount() {
        this.refreshTable()
    }

    render() {
        return (
            this.state.redirect
            ?
            <Redirect to="/"/>
            :
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
                                <h1>{this.state.rows.length}/{this.state.profile.student_limit}</h1>
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
