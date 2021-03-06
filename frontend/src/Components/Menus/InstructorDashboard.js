import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Box from '@material-ui/core/Box'
import PrimaryButton from '../Buttons/PrimaryButton'
import StudentTable from '../StudentTable'
import CreateStudentScreen from "../CreateStudentScreen"
import EditStudentScreen from "../EditStudentScreen"
import TestFoundScreen from "../TestFoundScreen"
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import "../../Assets/InstructorDashboard.css"


class InstrutorDashboard extends Component {
    state = {
        profile: null,
        students: null,
        rows: null,

        show_add_student: false,
        show_edit_student: false,
        show_date_found: false,
        student_to_edit: null,

        filterStatus: '0',
        filterSearch: null,
    }

    filterSearch = (students) => {
        if (this.state.filterSearch === null) {
            return students
        }

        const result = students.filter(each => {
            let regex = new RegExp(this.state.filterSearch.toLowerCase())
            if (
                regex.test(`${each.first_name} ${each.last_name}`.toLowerCase()) ||
                regex.test(each.candidate_number) ||
                regex.test(each.birth_date)
            ) {
                return (true)
            }
        })

        return result
    }

    filterStatus = (students) => {
        if (this.state.filterStatus == '0') {
            return students
        }
        else {
            let result = students.filter(each => each.status == this.state.filterStatus)
            return result;
        }
    }

    renderTable = () => {
        let rows = this.filterStatus(this.state.students)
        rows = this.filterSearch(rows)

        this.setState({ rows: rows })
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

            this.setState({ students: students })
            this.renderTable()
            // students = this.filterStatus(students)
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
                                    <h2>Search Count</h2>
                                    <h1>{this.state.profile.search_count}/250</h1>
                                </div>
                                <div>
                                    <h2>Total Students</h2>
                                    <h1>{this.state.rows.length}/{this.state.profile.student_limit}</h1>
                                </div>
                                <div>
                                    <h2>Searching</h2>
                                    <h1>
                                        {
                                            this.state.rows.reduce((acc, student) => {
                                                if (student.status == 3) {
                                                    return acc + 1
                                                }
                                                else {
                                                    return acc
                                                }
                                            }, 0)
                                        }
                                    </h1>
                                </div>
                                <div>
                                    <h2>Tests Found</h2>
                                    <h1>
                                        {
                                            this.state.rows.reduce((acc, student) => {
                                                if (student.status == 4) {
                                                    return acc + 1
                                                }
                                                else {
                                                    return acc
                                                }
                                            }, 0)
                                        }
                                    </h1>
                                </div>
                            </div>
                            <div className="menu-header menu-header-2">
                                <div>
                                    <h1>
                                        Students
                                    </h1>
                                    <PrimaryButton
                                        onClick={this.showAddStudentScreen}
                                        className="btn"
                                        size="large"
                                        variant="contained"
                                        color="success"
                                        type="submit"
                                        text="Add Student"
                                    />
                                </div>
                                <div className="right-side">
                                    <div className="status-dropdown">
                                        <TextField
                                            onChange={e => {
                                                this.setState({
                                                    filterStatus: e.target.value
                                                }, this.renderTable
                                                )
                                            }}
                                            label="Status"
                                            variant="outlined"
                                            select
                                            SelectProps={{
                                                native: true,
                                            }}
                                        >
                                            <option value='0'>All</option>
                                            <option value='1'>In Analysis</option>
                                            <option value='2'>Invalid</option>
                                            <option value='3'>Searching</option>
                                            <option value='4'>Found</option>
                                            <option value='5'>Idle</option>
                                        </TextField>
                                    </div>
                                    <div>
                                        <form onSubmit={
                                            e => {
                                                e.preventDefault()
                                                this.setState({
                                                    filterSearch: document.getElementById('search-bar').value
                                                }, this.renderTable
                                                )
                                            }}
                                        >
                                            <TextField
                                                id="search-bar"
                                                label="Search"
                                                variant="outlined"
                                                onChange={e => {
                                                    this.setState({
                                                        filterSearch: e.target.value
                                                    }, this.renderTable
                                                    )
                                                }}
                                                InputProps={{
                                                    endAdornment:
                                                        <InputAdornment position="end">
                                                            <IconButton
                                                                type='submit'

                                                            // onClick={() => handleClickShowPassword('showPassword')}
                                                            // onMouseDown={handleMouseDownPassword}
                                                            >
                                                                <SearchIcon />
                                                            </IconButton>
                                                        </InputAdornment>

                                                }}
                                            />
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <StudentTable
                                rows={this.state.rows}
                                setParentState={(state) => this.setState(state)}
                                refreshTable={() => this.refreshTable()}
                            />

                            {
                                this.state.show_add_student
                                    ?
                                    <CreateStudentScreen
                                        show={this.state.show_add_student}
                                        setParentState={(params) => this.setState(params)}
                                        refreshTable={this.refreshTable}
                                    />
                                    :
                                    null
                            }
                            {
                                this.state.show_edit_student
                                    ?

                                    <EditStudentScreen
                                        show={this.state.show_edit_student}
                                        student={this.state.student_to_edit}
                                        setParentState={(params) => this.setState(params)}
                                        refreshTable={this.refreshTable}
                                    />
                                    :
                                    null
                            }
                            {
                                this.state.show_date_found
                                    ?
                                    < TestFoundScreen
                                        show={this.state.show_date_found}
                                        student={this.state.student_to_edit}
                                        setParentState={(params) => this.setState(params)}
                                        refreshTable={this.refreshTable}
                                    />
                                    :
                                    null
                            }
                        </>
                }
            </div >
        )
    }
}

export default InstrutorDashboard;