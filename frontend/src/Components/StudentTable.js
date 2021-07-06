import { DataGrid } from '@material-ui/data-grid'
import { Button, Box, Container } from '@material-ui/core'


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

const StudentTable = ({rows}) => (
    <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        // checkboxSelection
        disableSelectionOnClick
        disableColumnResize={false}
    />
)

export default StudentTable;