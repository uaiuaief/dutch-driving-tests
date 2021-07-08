import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Button, Box, Container, Paper } from '@material-ui/core'


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
        headerName: '',
        width: 180
    },
];

const StudentTable = ({ rows, setParentState }) => {
    const showEditScreen = (student) => {
        setParentState({
            show_edit_student: true,
            student_to_edit: student
        })
    }

    const align = "left"
    return (
        <div>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            {columns.map(column => (
                                <TableCell align={align}>{column.headerName}</TableCell>

                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((student) => {
                            let test_centers = student.test_centers.reduce((test_centers, each) => test_centers + `, ${each}`)
                            return (
                                <TableRow key={student.id}>
                                    <TableCell align={align}>{student.first_name}</TableCell>
                                    <TableCell align={align}>{student.last_name}</TableCell>
                                    <TableCell align={align}>{student.candidate_number}</TableCell>
                                    <TableCell align={align}>{student.birth_date}</TableCell>
                                    <TableCell align={align}>{student.test_type}</TableCell>
                                    <TableCell align={align}>{test_centers}</TableCell>
                                    <TableCell align={align}>{student.earliest_test_date}</TableCell>
                                    <TableCell align={align}>{student.days_to_skip}</TableCell>
                                    <TableCell align={align}><strong>
                                        <Button
                                            onClick={() => showEditScreen(student)}
                                            variant="contained"
                                            color="primary"
                                            size="small"
                                        // style={{ marginLeft: 16 }}
                                        >
                                            Edit
                                        </Button>
                                    </strong></TableCell>
                                </TableRow>
                            )
                        }
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default StudentTable;