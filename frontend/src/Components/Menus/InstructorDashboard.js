import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import StudentTable from '../StudentTable'
import CreateStudentScreen from "../CreateStudentScreen"
import EditStudentScreen from "../EditStudentScreen"
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import "../../Assets/InstructorDashboard.css"


class InstrutorDashboard extends Component {
    state = {
        profile: null,
        rows: null,

        show_add_student: false,
        show_edit_student: false,
        student_to_edit: null,

        filterStatus: false,
    }

    filterStatus = (rows) => {        
        if(this.state.filterStatus){
            let result = rows.filter(each => each.status == this.state.filterStatus)
            return result;
        }
        else {
            return rows
        }
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

            students = this.filterStatus(students)
            this.setState({ rows: students })
            // this.setState({ rows: this.filter() })
        })
    }

    componentDidMount() {
        this.refreshTable()
    }

    render() {
        const { className = "" } = this.props

        return (
            <div id="instructor-dashboard" className={className}>
                <h1 className="menu-header">{this.props.menuHeader}</h1>
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
                            <div className="menu-header menu-header-2">
                                <div>
                                    <h3>
                                        Students
                                    </h3>
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
                                </div>
                                <div className="right-side">
                                    <div className="status-dropdown">
                                        <TextField
                                            onChange={e => this.setState({filterStatus: e.target.value})}
                                            label="Status"
                                            variant="outlined"
                                            select
                                            SelectProps={{
                                                native: true,
                                            }}
                                        >
                                            <option>All</option>
                                            <option>Searching</option>
                                            <option>Invalid</option>
                                            <option>Idle</option>
                                            <option>In Analysis</option>
                                        </TextField>
                                    </div>
                                    <div>
                                        <TextField
                                            id="search-bar"
                                            label="Search"
                                            variant="outlined"
                                            InputProps={{
                                                endAdornment:
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            // onClick={() => handleClickShowPassword('showPassword')}
                                                            // onMouseDown={handleMouseDownPassword}
                                                        >
                                                            <SearchIcon/>
                                                        </IconButton>
                                                    </InputAdornment>
                
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                            <StudentTable
                                rows={this.state.rows}
                                setParentState={(state) => this.setState(state)}
                            />
                            <Box mt={"2.0rem"}>
                                {/* <Button
                                    onClick={this.showAddStudentScreen}
                                    className="btn"
                                    size="large"
                                    variant="contained"
                                    color="primary"
                                    type="submit"
                                >
                                    New Student
                                </Button> */}
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