import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    [theme.breakpoints.up("md")]: {
      // marginTop: "1em",
    },
  },
  paper: {
    [theme.breakpoints.down("sm")]: {
      height: "calc(100vh - 56px + 1em)",
    },
    [theme.breakpoints.up("md")]: {
      height: "calc(100vh - 64px + 1em)",
    },
    backgroundColor: theme.palette.grey[900],
  },
}));
