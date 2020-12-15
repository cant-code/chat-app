import { makeStyles, withStyles } from "@material-ui/core/styles";
import MuiListItem from "@material-ui/core/ListItem";
import MuiAvatar from "@material-ui/core/Avatar";

export const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxHeight: "86%",
  },
}));

export const ListItem = withStyles((theme) => ({
  root: {
    "&$selected": {
      backgroundColor: theme.palette.primary.dark,
      color: "white",
    },
    "&$selected:hover": {
      backgroundColor: theme.palette.primary.main,
      color: "white",
    },
  },
  selected: {},
}))(MuiListItem);

export const Avatar = withStyles({
  root: {
    backgroundColor: "white",
  },
})(MuiAvatar);
