import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    display: "flex",
    paddingTop: "1em",
    overflowX: "hidden",
    [theme.breakpoints.up("sm")]: {
      // borderTopLeftRadius: "15px",
      // borderBottomLeftRadius: "15px",
      paddingRight: 0,
    },
    background: "#000000",
    // eslint-disable-next-line
    background: "-webkit-linear-gradient(to top, #434343, #000000)",
    // eslint-disable-next-line
    background: "linear-gradient(to top, #434343, #000000)",
  },
  chat: {
    width: "100%",
  },
  chatBox: {
    height: "90%",
    width: "100%",
    display: "flex",
    alignItems: "flex-end",
  },
  sendMsg: {
    height: "10%",
    width: "100%",
  },
  send: {
    display: "flex",
  },
  message: {
    // padding: theme.spacing(2),
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
    [theme.breakpoints.down("xs")]: {
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
    [theme.breakpoints.down("xs")]: {
      maxWidth: "100%",
    },
  },
  backgroundPrimary: {
    backgroundColor: theme.palette.secondary.main,
  },
}));
