import React, { Component } from 'react';
import { Formik } from 'formik';
import { Button, Box, TextField, Select, MenuItem, InputLabel, Input, Chip } from '@material-ui/core'
import "../Assets/instructordashboard.css"
import AddStudentForm from "./Forms/AddStudentForm"

class CreateStudentScreen extends Component {
    render() {
        return (
            this.props.show
                ?
                <div id="create-student-screen">
                    <h1>Add a new Student</h1>
                    <AddStudentForm />
                </div>
                :
                null
        );
    }
}

export default CreateStudentScreen;
