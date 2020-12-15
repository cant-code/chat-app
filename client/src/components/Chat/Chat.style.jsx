import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    display: "flex",
    paddingTop: "1em",
    [theme.breakpoints.up("sm")]: {
      borderTopLeftRadius: "15px",
      borderBottomLeftRadius: "15px",
    },
    background: "#000000",
    background: "-webkit-linear-gradient(to top, #434343, #000000)",
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
}));
