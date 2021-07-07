import React, { Component } from 'react';
import { Formik } from 'formik';
import CloseIcon from '@material-ui/icons/Close';
import AddStudentForm from "./Forms/AddStudentForm"
import { Button, Box, TextField, Select, Fab } from '@material-ui/core'
import "../Assets/instructordashboard.css"

class EditStudentScreen extends Component {
    closeWindow = (e) => {
        const {setParentState} = this.props
        setParentState({
            show_add_student: false
        })
    }

    render() {
        const {setParentState, show} = this.props
        return (
            show
                ?
                <div id="edit-student-screen">
                    <Fab
                        className="close-button"
                        size="small"
                        color="secondary"
                        aria-label="close"
                        onClick={this.closeWindow}
                    >
                        <CloseIcon />
                    </Fab>
                    <h1>Update Student</h1>
                    <AddStudentForm />
                </div>
                :
                null
        );
    }
}

export default EditStudentScreen;
