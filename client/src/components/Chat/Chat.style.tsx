import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    display: "flex",
    overflow: "hidden",
    [theme.breakpoints.up("md")]: {
      paddingRight: 0,
    },
    // background: "#000000",
    // eslint-disable-next-line
    // background: "-webkit-linear-gradient(to top, #434343, #000000)",
    // eslint-disable-next-line
    background: "linear-gradient(to top, #434343, #000000)",
  },
  avatar: {
    marginRight: "1em",
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.getContrastText(theme.palette.secondary.main),
  },
  userAvatar: {
    marginLeft: "0.3em",
    backgroundColor: "white",
  },
  userDetail: {
    backgroundColor: "#000",
    padding: "7px 20px",
    display: "flex",
  },
  container: {
    height: "100%",
  },
  paper: {
    maxWidth: "90%",
    minWidth: "5%",
    width: "fit-content",
    paddingRight: "1em",
    marginTop: "1em",
    marginRight: "1em",
    marginBottom: "1em",
  },
  chat: {
    width: "100%",
    overflow: "hidden",
  },
  chatContainer: {
    height: "fit-content",
    maxHeight: "100%",
  },
  chatBox: {
    height: "81%",
    width: "100%",
    display: "flex",
    alignItems: "flex-end",
    overflowY: "auto",
    [theme.breakpoints.down("sm")]: {
      height: "76%",
    },
  },
  sendMsg: {
    height: "10%",
    width: "100%",
  },
  backgroundPrimary: {
    backgroundColor: theme.palette.primary.dark,
  },
}));
