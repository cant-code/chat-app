import React from "react";
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import InboxIcon from "@material-ui/icons/Inbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import Divider from "@material-ui/core/Divider";
import { useStyles, ListItem, Avatar } from "./ListWrapper.style";

export default function ListWrapper() {
  const classes = useStyles();
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleListItemClick = (index) => {
    setSelectedIndex(index);
  };

  return (
    <div className={classes.root}>
      <List
        component="nav"
        style={{
          maxHeight: "79vh",
          paddingTop: 0,
          overflow: "auto",
        }}
        aria-label="main mailbox folders"
      >
        <Divider />
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
        <Divider />
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
        <Divider />
        <ListItem
          button
          dense
          selected={selectedIndex === 2}
          onClick={() => handleListItemClick(2)}
        >
          <ListItemText inset primary="Trash" secondary="08-12-2020" />
        </ListItem>
        <Divider />
        <ListItem
          button
          dense
          selected={selectedIndex === 3}
          onClick={() => handleListItemClick(3)}
        >
          <ListItemText inset primary="Spam" secondary="08-12-2020" />
        </ListItem>
        <Divider />
        <ListItem
          button
          dense
          selected={selectedIndex === 4}
          onClick={() => handleListItemClick(4)}
        >
          <ListItemText inset primary="Spam" secondary="08-12-2020" />
        </ListItem>
        <Divider />
        <ListItem
          button
          dense
          selected={selectedIndex === 5}
          onClick={() => handleListItemClick(5)}
        >
          <ListItemText inset primary="Spam" secondary="08-12-2020" />
        </ListItem>
        <Divider />
        <ListItem
          button
          dense
          selected={selectedIndex === 6}
          onClick={() => handleListItemClick(6)}
        >
          <ListItemText inset primary="Spam" secondary="08-12-2020" />
        </ListItem>
        <Divider />
        <ListItem
          button
          dense
          selected={selectedIndex === 7}
          onClick={() => handleListItemClick(7)}
        >
          <ListItemText inset primary="Spam" secondary="08-12-2020" />
        </ListItem>
        <Divider />
        <ListItem
          button
          dense
          selected={selectedIndex === 8}
          onClick={() => handleListItemClick(8)}
        >
          <ListItemText inset primary="Spam" secondary="08-12-2020" />
        </ListItem>
        <Divider />
        <ListItem
          button
          dense
          selected={selectedIndex === 9}
          onClick={() => handleListItemClick(9)}
        >
          <ListItemText inset primary="Spam" secondary="08-12-2020" />
        </ListItem>
        <Divider />
      </List>
    </div>
  );
}
