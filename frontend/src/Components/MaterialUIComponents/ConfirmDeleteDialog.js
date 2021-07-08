import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


export default function ConfirmDeleteDialog(props) {
  const { deleteStudent, setParentState } = props
  const [open, setOpen] = React.useState(true);

  const handleYes = () => {
    deleteStudent();
    setOpen(false);
    setParentState({
      open: false
    })
  };
  
  const handleNo = () => {
    setOpen(false);
    setParentState({
      open: false
    })
  };

  return (
    <Dialog
      open={open}
      onClose={handleNo}
    >
      <DialogTitle id="alert-dialog-title">{"Delete Student Confirmation"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure you want to delete this student?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleYes} color="primary">
          Yes
        </Button>
        <Button onClick={handleNo} color="primary" autoFocus>
          No
        </Button>
      </DialogActions>
    </Dialog>
  );
}