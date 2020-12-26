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

  // useEffect(() => {
  //   if (list === 1) {
  //     const global = {
  //       _id: "global",
  //       username: "Global",
  //     };
  //     socket.emit("rooms", {});
  //     socket.on("rooms", (rooms) => {
  //       setUsers([global]);
  //     });
  //   }
  //   // return () => socket.disconnect();
  // }, [socket, list]);

  const handleListItemClick = (id, username) => {
    if (user.type === "group") {
      socket.emit("endgroup", id);
    }
    let type = list === 0 ? "chat" : "group";
    setSelected(id);
    setUser({ id, username, type });
  };

  useEffect(() => {
    async function getUsers(url) {
      const requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${localStorage.getItem("token")}`,
        },
      };
      const res = await fetch(url, requestOptions);
      const data = await res.json();
      console.log(data);
      setUsers(data);
    }
    if (list === 0) getUsers("/api/users/");
    else if (list === 1) getUsers("/api/group/");
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
        {list === 1 && (
          <React.Fragment>
            <ListItem
              button
              dense
              selected={selected === "global"}
              onClick={() => handleListItemClick("global", "Global")}
            >
              <ListItemAvatar>
                <Avatar></Avatar>
              </ListItemAvatar>
              <ListItemText primary="Global" />
            </ListItem>
            <Divider />
          </React.Fragment>
        )}
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
