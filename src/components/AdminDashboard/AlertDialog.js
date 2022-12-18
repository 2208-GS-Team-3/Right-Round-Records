import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { deleteRecord, setRecords } from "../../store/recordsSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  setEditInProgress,
  setUpdatedRecordInfo,
} from "../../store/editRecordSlice";

export default function AlertDialog() {
  const [open, setOpen] = React.useState(false);
  const recordToEdit = useSelector((state) => state.recordToEdit.recordToEdit);

  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteRecord = async (event) => {
    try {
      event.preventDefault();
      // get token of logged in user
      const token = window.localStorage.getItem("token");
      // data to send to backend
      const tokenData = {
        headers: {
          authorization: token,
        },
      };
      await axios.delete(`/api/records/${recordToEdit[0].id}`, tokenData);
      dispatch(
        deleteRecord({
          id: recordToEdit[0].id,
        })
      );
      const allNewRecords = await axios.get("/api/records");
      dispatch(setRecords(allNewRecords.data));
      dispatch(setEditInProgress(false));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Delete Product
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to delete this record?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Record data cannot be recovered once deleted.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Nevermind</Button>
          <Button
            onClick={handleDeleteRecord}
            style={{ color: "red" }}
            autoFocus
          >
            DELETE
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
