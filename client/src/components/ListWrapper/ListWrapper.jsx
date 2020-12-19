import React, { useState, useEffect } from "react";
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Divider from "@material-ui/core/Divider";
import { useStyles, ListItem, Avatar } from "./ListWrapper.style";

export default function ListWrapper() {
  const classes = useStyles();
  const [selected, setSelected] = useState(1);
  const [users, setUsers] = useState([]);

  const handleListItemClick = (id) => {
    setSelected(id);
  };

  useEffect(() => {
    async function getUsers() {
      const requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${localStorage.getItem("token")}`,
        },
      };
      const res = await fetch("/api/users/", requestOptions);
      const data = await res.json();
      setUsers(data);
    }
    getUsers();
  }, []);

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
        {users.map((item) => (
          <React.Fragment key={item._id}>
            <ListItem
              button
              dense
              selected={selected === item._id}
              onClick={() => handleListItemClick(item._id)}
            >
              <ListItemAvatar>
                <Avatar></Avatar>
              </ListItemAvatar>
              <ListItemText primary={item.username} secondary="08-12-2020" />
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>
    </div>
  );
}
