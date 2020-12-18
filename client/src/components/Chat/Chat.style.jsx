import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    display: "flex",
    overflow: "hidden",
    [theme.breakpoints.up("md")]: {
      paddingRight: 0,
    },
    background: "#000000",
    // eslint-disable-next-line
    background: "-webkit-linear-gradient(to top, #434343, #000000)",
    // eslint-disable-next-line
    background: "linear-gradient(to top, #434343, #000000)",
  },
  avatar: {
    marginRight: "1em",
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.getContrastText(theme.palette.secondary.main),
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
    paddingRight: "1em",
    // width: "max-content",
    marginTop: "1em",
  },
  chat: {
    width: "100%",
    overflow: "hidden",
  },
  chatBox: {
    height: "81%",
    width: "100%",
    display: "flex",
    // flexDirection: "column",
    justifyContent: "flex-end",
    overflowY: "auto",
    // overflowX: "hidden",
  },
  sendMsg: {
    height: "10%",
    width: "100%",
  },
  send: {
    display: "flex",
  },
  message: {
    marginTop: theme.spacing(1),
    maxWidth: "75%",
  },
  list: {
    width: "100%",
    paddingRight: 0,
  },
  right: {
    maxWidth: "75%",
    paddingLeft: 0,
    [theme.breakpoints.down("sm")]: {
      maxWidth: "90%",
    },
  },
  box: {
    display: "flex",
    width: "inherit",
    padding: theme.spacing(2),
    maxWidth: "100%",
    paddingLeft: 0,
    paddingRight: 0,
    [theme.breakpoints.down("sm")]: {
      maxWidth: "100%",
    },
  },
  backgroundPrimary: {
    backgroundColor: theme.palette.primary.dark,
  },
}));
