import React, { Component } from 'react';
import { Formik } from 'formik';
import CloseIcon from '@material-ui/icons/Close';
import AddStudentForm from "./Forms/AddStudentForm"
import { Button, Box, TextField, Select, Fab } from '@material-ui/core'
import "../Assets/instructordashboard.css"

class CreateStudentScreen extends Component {
    closeWindow = (e) => {
        const { setParentState } = this.props
        setParentState({
            show_add_student: false
        })
    }

    render() {
        const { setParentState, show, refreshTable} = this.props
        return (
            show
                ?
                <div id="background-overlay">
                    <div id="create-student-screen">
                        <Fab
                            className="close-button"
                            size="small"
                            color="secondary"
                            aria-label="close"
                            onClick={this.closeWindow}
                        >
                            <CloseIcon />
                        </Fab>
                        <h1>Add New Student</h1>
                        <AddStudentForm 
                            refreshTable={refreshTable}
                        />
                    </div>
                </div>
                :
                null
        );
    }
}

export default CreateStudentScreen;
