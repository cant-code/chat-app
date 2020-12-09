import { withStyles } from "@material-ui/core/styles";
import MuiAppBar from "@material-ui/core/AppBar";

export const AppBar = withStyles({
  root: {
    borderTopRightRadius: "15px",
  },
})(MuiAppBar);
