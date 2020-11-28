import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import SnackBar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import ErrorOutlineOutlinedIcon from "@material-ui/icons/ErrorOutlineOutlined";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import Slide from "@material-ui/core/Slide";

const useStyles = makeStyles({
  success: {
    backgroundColor: "#4caf50",
    color: "#fff",
    fontWeight: 500,
  },
  error: {
    backgroundColor: "#f44336",
    color: "#fff",
    fontWeight: 500,
  },
});

export default function DisplaySnackBar({
  message,
  status,
  type,
  setPropOpen,
  open,
}) {
  const styles = useStyles();

  const handleClose = () => {
    setPropOpen(false);
  };

  function TransitionLeft(props) {
    return <Slide {...props} direction="left" />;
  }

  return (
    <>
      <SnackBar
        open={open}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        autoHideDuration={2000}
        TransitionComponent={TransitionLeft}
        onClose={handleClose}
      >
        <SnackbarContent
          message={
            <>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  fontSize: "1.3em",
                }}
              >
                {type === "error" ? (
                  <ErrorOutlineOutlinedIcon
                    style={{ marginRight: "0.3em", fontSize: "1.4em" }}
                  />
                ) : (
                  <CheckCircleOutlineIcon
                    style={{ marginRight: "0.3em", fontSize: "1.4em" }}
                  />
                )}
                {message}
              </div>
            </>
          }
          className={type === "error" ? styles.error : styles.success}
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
    </>
  );
}
