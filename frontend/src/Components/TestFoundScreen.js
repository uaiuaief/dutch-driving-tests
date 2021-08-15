import React, { Component } from 'react';
import CloseIcon from '@material-ui/icons/Close';
import { Button, Box, TextField, Select, Fab } from '@material-ui/core'

class TestFoundScreen extends Component {
    closeWindow = (e) => {
        const { setParentState } = this.props
        setParentState({
            show_date_found: false
        })
    }

    formatDateString = (str) => {
        let arr = str.split('-')

        const formatted = `${arr[2]}/${arr[1]}/${arr[0]}`

        return formatted
    }

    render() {
        const { show, student } = this.props

        if (!student) return null

        let {date, start_time, end_time, test_center} = student.date_to_book

        return (
            show
                ?
                <div id="background-overlay">
                    <div id="date-found-screen">
                        <Fab
                            className="close-button"
                            size="small"
                            color="secondary"
                            aria-label="close"
                            onClick={this.closeWindow}
                        >
                            <CloseIcon />
                        </Fab>
                        <h1 className="title">Date Found</h1>
                        <div className="date-found-info">
                            <div className="block">
                                <p className="title">Test date</p>
                                <p>{this.formatDateString(date)}</p>
                            </div>
                            <div className="block">
                                <p className="title">Start time</p>
                                <p>{start_time.slice(0,5)}</p>
                            </div>
                            <div className="block">
                                <p className="title">End time</p>
                                <p>{end_time.slice(0,5)}</p>
                            </div>
                            <div className="block">
                                <p className="title">Test centre</p>
                                <p>{test_center.name}</p>
                            </div>
                        </div>
                    </div>
                </div>
                :
                null
        );
    }
}

export default TestFoundScreen;
