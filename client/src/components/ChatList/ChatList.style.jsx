import { withStyles, makeStyles } from "@material-ui/core/styles";
import MuiAppBar from "@material-ui/core/AppBar";

export const AppBar = withStyles({
  root: {
    maxWidth: "inherit",
  },
})(MuiAppBar);

export const useStyles = makeStyles((theme) => ({
  tabPanel: {
    backgroundColor: theme.palette.grey[900],
    height: "inherit",
  },
}));
