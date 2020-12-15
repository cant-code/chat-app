import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: "1em",
  },
  paper: {
    [theme.breakpoints.down("xs")]: {
      height: "calc(100vh - 56px - 1em)",
    },
    [theme.breakpoints.up("sm")]: {
      height: "calc(100vh - 64px - 2em)",
    },
  },
  chatList: {
    [theme.breakpoints.up("sm")]: {
      borderTopLeftRadius: "15px",
      borderBottomLeftRadius: "15px",
    },
  },
}));