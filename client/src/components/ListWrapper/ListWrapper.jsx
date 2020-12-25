import React, { useState, useEffect, useContext } from "react";
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Divider from "@material-ui/core/Divider";
import SocketContext from "../../context/socket";
import { ChatContext } from "../../context/chat";
import { useStyles, ListItem, Avatar } from "./ListWrapper.style";

export default function ListWrapper(props) {
  const classes = useStyles();
  const { user, setUser } = useContext(ChatContext);
  const list = props.selected;
  const [selected, setSelected] = useState(user.id);
  const [users, setUsers] = useState([]);
  const socket = useContext(SocketContext);

  useEffect(() => {
    if (list === 1) {
      const global = {
        _id: "global",
        username: "Global",
      };
      socket.emit("rooms", {});
      socket.on("rooms", (rooms) => {
        console.log(rooms);
        setUsers([global]);
      });
    }
    // return () => socket.disconnect();
  }, [socket, list]);

  const handleListItemClick = (id, username) => {
    if (selected === "global") socket.emit("endglobal");
    setSelected(id);
    setUser({ id, username });
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
    if (list === 0) getUsers();
  }, [list]);

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
        {users.length > 0 &&
          users.map((item) => (
            <React.Fragment key={item._id}>
              <ListItem
                button
                dense
                selected={selected === item._id}
                onClick={() => handleListItemClick(item._id, item.username)}
              >
                <ListItemAvatar>
                  <Avatar></Avatar>
                </ListItemAvatar>
                {item.username && <ListItemText primary={item.username} />}
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
      </List>
    </div>
  );
}
