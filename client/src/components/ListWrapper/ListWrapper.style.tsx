import { Theme, makeStyles, withStyles, createStyles } from "@material-ui/core/styles";
import { fade } from "@material-ui/core/styles/colorManipulator";
import MuiListItem from "@material-ui/core/ListItem";
import MuiAvatar from "@material-ui/core/Avatar";
import Badge from '@material-ui/core/Badge';

export const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxHeight: "86%",
    backgroundColor: theme.palette.grey[900],
  },
  loader: {
    display: "flex",
    justifyContent: "center",
    marginTop: "2em",
  },
}));

export const ListItem = withStyles((theme) => ({
  root: {
    "&$selected": {
      backgroundColor: fade(theme.palette.primary.dark, 0.7),
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

export const StyledBadge = withStyles((theme: Theme) =>
  createStyles({
    badge: {
      backgroundColor: '#44b700',
      color: '#44b700',
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      '&::after': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        animation: '$ripple 1.2s infinite ease-in-out',
        border: '1px solid currentColor',
        content: '""',
      },
    },
    '@keyframes ripple': {
      '0%': {
        transform: 'scale(.8)',
        opacity: 1,
      },
      '100%': {
        transform: 'scale(2.4)',
        opacity: 0,
      },
    },
  }),
)(Badge);

export const SmallAvatar = withStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 22,
      height: 22,
      border: `2px solid ${theme.palette.background.paper}`,
    },
  }),
)(MuiAvatar);