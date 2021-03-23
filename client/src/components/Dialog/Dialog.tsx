import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import useSnackbar from "../../hooks/SnackbarHook";

export default function FormDialog({ open, handleModal, type, setUsers }) {
  const [name, setName] = useState("");
  const { setMsg } = useSnackbar();

  const closeDialog = () => {
    setName("");
    handleModal("");
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const send = JSON.stringify({
      type: type,
      name: name,
    });
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${localStorage.getItem("token")}`,
      },
      body: send,
    };
    const res = await fetch("/api/group/room/", requestOptions);
    const data = await res.json();
    if (res.status === 200) {
      setUsers((m) => [...m, data]);
      setMsg("Successfully created room", "success");
      closeDialog();
    } else setMsg(data.error, "error");
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
      <form autoComplete="off" noValidate onSubmit={onSubmit}>
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
