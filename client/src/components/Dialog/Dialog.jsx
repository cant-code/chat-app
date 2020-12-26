import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function FormDialog({ open, handleModal, type }) {
  const [name, setName] = useState("");

  const closeDialog = () => {
    setName("");
    handleModal("");
  };

  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      open={open}
      onClose={closeDialog}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">{type} a Room</DialogTitle>
      <form autoComplete="off" noValidate>
        <DialogContent>
          <TextField
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
            margin="dense"
            id="name"
            label="Room Name"
            type="text"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog} color="primary">
            Cancel
          </Button>
          <Button type="submit" color="primary">
            {type} Room
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
