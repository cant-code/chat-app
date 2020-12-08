import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import MuiListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import MuiAvatar from "@material-ui/core/Avatar";
import Divider from "@material-ui/core/Divider";
import InboxIcon from "@material-ui/icons/Inbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
  },
}));

const ListItem = withStyles((theme) => ({
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

const Avatar = withStyles({
  root: {
    backgroundColor: "white",
  },
})(MuiAvatar);

export default function ListWrapper() {
  const classes = useStyles();
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleListItemClick = (index) => {
    setSelectedIndex(index);
  };

  return (
    <div className={classes.root}>
      <Typography component="h1" variant="h2" align="center">
        Hello
      </Typography>
      <List component="nav" aria-label="main mailbox folders">
        <ListItem
          button
          dense
          selected={selectedIndex === 0}
          onClick={() => handleListItemClick(0)}
        >
          <ListItemAvatar>
            <Avatar>
              <InboxIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Inbox" secondary="08-12-2020" />
        </ListItem>
        <ListItem
          button
          dense
          selected={selectedIndex === 1}
          onClick={() => handleListItemClick(1)}
        >
          <ListItemAvatar>
            <Avatar>
              <DraftsIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Drafts" secondary="08-12-2020" />
        </ListItem>
      </List>
      <Divider />
      <List component="nav" aria-label="secondary mailbox folder">
        <ListItem
          button
          dense
          selected={selectedIndex === 2}
          onClick={() => handleListItemClick(2)}
        >
          <ListItemText inset primary="Trash" secondary="08-12-2020" />
        </ListItem>
        <ListItem
          button
          dense
          selected={selectedIndex === 3}
          onClick={() => handleListItemClick(3)}
        >
          <ListItemText inset primary="Spam" secondary="08-12-2020" />
        </ListItem>
      </List>
    </div>
  );
}
