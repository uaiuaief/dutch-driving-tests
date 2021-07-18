import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import StudentTable from '../StudentTable'
import CreateStudentScreen from "../CreateStudentScreen"
import EditStudentScreen from "../EditStudentScreen"
import "../../Assets/InstructorDashboard.css"


class InstrutorDashboard extends Component {
    state = {
        profile: null,
        rows: null,

        show_add_student: false,
        show_edit_student: false,
        student_to_edit: null,
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
            if (data === null) {
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
        const {className=""} = this.props

        return (
            <div id="instructor-dashboard" className={className}>
                {
                    this.state.rows === null
                        ?
                        null
                        :
                        <>
                            <div id="student-information">
                                <div>
                                    <h2>Total Students</h2>
                                    <h1>{this.state.rows.length}/{this.state.profile.student_limit}</h1>
                                </div>
                                <div>
                                    <h2>Searching</h2>
                                    <h1>250</h1>
                                </div>
                                <div>
                                    <h2>Tests Found</h2>
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
            </div >
        )
    }
}

export default InstrutorDashboard;