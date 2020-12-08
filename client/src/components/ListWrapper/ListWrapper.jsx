import React from "react";
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import InboxIcon from "@material-ui/icons/Inbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import Typography from "@material-ui/core/Typography";
import { useStyles, ListItem, Avatar } from "./ListWrapper.style";

export default function ListWrapper() {
  const classes = useStyles();
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleListItemClick = (index) => {
    setSelectedIndex(index);
  };

  return (
    <div className={classes.root}>
      <Typography component="h2" variant="h3" align="center">
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
