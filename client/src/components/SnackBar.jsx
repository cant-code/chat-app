import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import SnackBar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import ErrorOutlineOutlinedIcon from "@material-ui/icons/ErrorOutlineOutlined";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import Slide from "@material-ui/core/Slide";
import useSnackbar from "../hooks/SnackbarHook";

const useStyles = makeStyles((theme) => ({
  success: {
    backgroundColor: theme.palette.success.main,
    color: "#fff",
    fontWeight: 500,
  },
  error: {
    backgroundColor: theme.palette.error.main,
    color: "#fff",
    fontWeight: 500,
  },
}));

export default function DisplaySnackBar() {
  const styles = useStyles();
  const [open, setOpen] = useState(false);
  const { msg, removeMsg } = useSnackbar();

  useEffect(() => {
    if (msg !== null && msg.message.length > 0) setOpen(true);
  }, [msg]);

  const handleClose = () => {
    removeMsg();
    setOpen(false);
  };

  function TransitionLeft(props) {
    return <Slide {...props} direction="left" />;
  }

  return (
    <>
      {open && (
        <SnackBar
          open={open}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          autoHideDuration={6000}
          TransitionComponent={TransitionLeft}
          onClose={handleClose}
        >
          <SnackbarContent
            message={
              msg !== null && (
                <>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      fontSize: "1.3em",
                    }}
                  >
                    {msg.type === "error" ? (
                      <ErrorOutlineOutlinedIcon
                        style={{ marginRight: "0.3em", fontSize: "1.4em" }}
                      />
                    ) : (
                      <CheckCircleOutlineIcon
                        style={{ marginRight: "0.3em", fontSize: "1.4em" }}
                      />
                    )}
                    {msg.message}
                  </div>
                </>
              )
            }
            className={
              msg !== null && msg.type === "error"
                ? styles.error
                : styles.success
            }
            action={
              <>
                <IconButton
                  size="small"
                  aria-label="close"
                  color="inherit"
                  onClick={handleClose}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              </>
            }
          />
        </SnackBar>
      )}
    </>
  );
}
