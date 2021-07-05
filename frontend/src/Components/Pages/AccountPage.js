import React, { Component } from 'react';
import { Button, Box, Container } from '@material-ui/core'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { DataGrid } from '@material-ui/data-grid'


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
        field: 'test_type',
        headerName: 'Test Type',
        width: 150,
        editable: false,
    },
    {
        field: 'test_centers',
        headerName: 'Test Centers',
        width: 350,
        editable: false,
    },
    {
        field: 'earliest_date',
        headerName: 'Earliest Date',
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
        headerName: 'Edit',
        width: 180,
        renderCell: (params) => (
            <strong>
              <Button
                variant="contained"
                color="primary"
                size="small"
                // style={{ marginLeft: 16 }}
              >
                Edit
              </Button>
            </strong>
          ),
    },
];

class AccountPage extends Component {
    state = {
        user: null,
        rows: null
    }

    fetchProfile = async () => {
        let res = await fetch('/api/get-profile/')
        let data = await res.json()

        return data
    }

    componentDidMount() {
        this.fetchProfile().then((data) => {
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

    render() {
        return (
            <div
                style={{
                    // "margin": "auto",
                    // "marginTop": "150px",
                    "height": "400px",
                    "width": "100%"
                }}
            >
                {this.state.rows === null
                    ?
                    null
                    :
                    <DataGrid
                        rows={this.state.rows}
                        columns={columns}
                        pageSize={5}
                        // checkboxSelection
                        disableSelectionOnClick
                        disableColumnResize={false}
                    />
                }
            </div>
        );
    }
}

export default AccountPage;
