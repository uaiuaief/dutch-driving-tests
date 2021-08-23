import React, { Component } from 'react';
import ConfirmDeleteDialog from './MaterialUIComponents/ConfirmDeleteDialog'
import SnackBar from './MaterialUIComponents/SnackBar'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Button, Box, Container, Paper } from '@material-ui/core'
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';


const statusDict = {
    1: 'In Analysis',
    2: 'Invalid',
    3: 'Searching',
    4: 'Found',
    5: 'Idle'
}

const SearchRangeDict = {
    2: '2 weeks',
    4: '4 weeks',
    12: '12 weeks'
}

const columns = [
    {
        field: 'first_name',
        headerName: 'First name',
        width: 150,
        editable: false,
    },
    {
        field: 'last_name',
        headerName: 'Last name',
        width: 150,
        editable: false,
    },
    {
        field: 'candidate_number',
        headerName: 'Candidate Number',
        width: 200,
        editable: false,
    },
    {
        field: 'birth_date',
        headerName: 'Date of Birth',
        width: 180,
        editable: false,
    },
    {
        field: 'search_range',
        headerName: 'Search Range',
        width: 180,
        editable: false,
    },
    {
        field: 'days_to_skip',
        headerName: 'Days to Skip',
        width: 180,
        editable: false,
    },
    {
        field: 'edit',
        headerName: 'Operation',
        width: 180
    },
    {
        field: 'status',
        headerName: 'Status',
        width: 180,
        editable: false,
    },
];

const StudentTable = ({ rows, setParentState, refreshTable }) => {
    const [state, setState] = React.useState({
        studentToDelete: null,

        alert: false,
        message: null,
        severity: null,
    })

    const deleteStudent = async () => {
        let student = state.studentToDelete
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
            setState({
                alert: true,
                severity: "success",
                message: `${student.first_name} ${student.last_name} was removed successfully`,
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
        }
    }

    const align = "center"

    const showEditScreen = (student) => {
        setParentState({
            show_edit_student: true,
            student_to_edit: student
        })
    }

    const showDateFound = (student) => {
        setParentState({
            show_date_found: true,
            student_to_edit: student
        })
    }

    const renderStatus = (status) => {
        let className = 'status status-'

        switch (status) {
            case '1':
                className += "in-analysis"
                break;
            case '2':
                className += "invalid"
                break;
            case '3':
                className += "searching"
                break;
            case '4':
                className += "test-found"
                break;
            case '5':
                className += "paused"
                break;
        }

        return (
            <TableCell
                align={align}
            >
                <div className={className}>
                    {statusDict[status]}
                </div>
            </TableCell>
        )

    }

    return (
        <div id="student-table">
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            {columns.map(column => (
                                <TableCell className="table-header" align={align}>{column.headerName}</TableCell>

                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((student) => {
                            return (
                                <TableRow key={student.id}>
                                    <TableCell align={align}>{student.first_name}</TableCell>
                                    <TableCell align={align}>{student.last_name}</TableCell>
                                    <TableCell align={align}>{student.candidate_number}</TableCell>
                                    <TableCell align={align}>{student.birth_date}</TableCell>
                                    <TableCell align={align}>{SearchRangeDict[student.search_range]}</TableCell>
                                    <TableCell align={align}>{student.days_to_skip}</TableCell>
                                    {/* <TableCell align={align}>{statusDict[student.status]}</TableCell> */}
                                    <TableCell
                                        align={align}
                                    >
                                        <IconButton
                                            className="edit-button table-row-button"
                                            onClick={() => showEditScreen(student)}
                                        >
                                            <CreateOutlinedIcon />
                                        </IconButton>
                                        <IconButton
                                            className="delete-button table-row-button"
                                            onClick={() => setState({
                                                studentToDelete: student
                                            })}
                                        >
                                            <DeleteForeverOutlinedIcon />
                                        </IconButton>
                                        {
                                            student.status == 4
                                                ?
                                                <IconButton
                                                    className="test-found-button table-row-button"
                                                    onClick={() => showDateFound(student)}
                                                >
                                                    <SearchIcon />
                                                </IconButton>
                                                :
                                                <span className="button-filler"></span>
                                        }
                                    </TableCell>
                                    {renderStatus(student.status)}
                                </TableRow>
                            )
                        }
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            {state.studentToDelete
                ?
                <ConfirmDeleteDialog
                    deleteStudent={deleteStudent}
                    setParentState={state => setState(state)}
                />
                :
                null
            }
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
        </div>
    )
}

export default StudentTable;