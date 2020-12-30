import React, { useState, useEffect, useContext } from "react";
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Divider from "@material-ui/core/Divider";
import PublicIcon from "@material-ui/icons/Public";
import GroupIcon from "@material-ui/icons/Group";
import AddIcon from "@material-ui/icons/Add";
import CreateIcon from "@material-ui/icons/Create";
import CircularProgress from "@material-ui/core/CircularProgress";
import Dialog from "../Dialog/Dialog";
import SocketContext from "../../context/socket";
import { ChatContext } from "../../context/chat";
import { useStyles, ListItem, Avatar } from "./ListWrapper.style";

export default function ListWrapper({ currSelected, loader, setLoader }) {
  const classes = useStyles();
  const { user, setUser } = useContext(ChatContext);
  const list = currSelected;
  const [selected, setSelected] = useState(user.id);
  const [users, setUsers] = useState([]);
  const socket = useContext(SocketContext);
  const [open, setOpen] = useState(false);
  const [dialogType, setDialog] = useState("");

  const handleModal = (type) => {
    setOpen((m) => !m);
    setDialog(type);
  };

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
          Accept: "application/json",
          Authorization: `${localStorage.getItem("token")}`,
        },
      };
      try {
        const res = await fetch(url, requestOptions);
        const data = await res.json();
        setUsers(data);
      } catch (e) {}
      setLoader(false);
    }
    if (list === 0) getUsers("/api/users/");
    else if (list === 1) getUsers("/api/group/");
  }, [list, setLoader]);

  return (
    <div className={classes.root}>
      {loader ? (
        <div className={classes.loader}>
          <CircularProgress color="secondary" />
        </div>
      ) : (
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
              <ListItem button dense onClick={() => handleModal("Create")}>
                <ListItemAvatar>
                  <Avatar>
                    <CreateIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Create new Room" />
              </ListItem>
              <Divider />
              <ListItem button dense onClick={() => handleModal("Join")}>
                <ListItemAvatar>
                  <Avatar>
                    <AddIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Join a Room" />
              </ListItem>
              <Divider />
              <ListItem
                button
                dense
                selected={selected === "global"}
                onClick={() => handleListItemClick("global", "Global")}
              >
                <ListItemAvatar>
                  <Avatar>
                    <PublicIcon />
                  </Avatar>
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
                    <Avatar>{list === 1 ? <GroupIcon /> : null}</Avatar>
                  </ListItemAvatar>
                  {item.username && <ListItemText primary={item.username} />}
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
        </List>
      )}
      <Dialog
        open={open}
        handleModal={handleModal}
        type={dialogType}
        setUsers={setUsers}
      />
    </div>
  );
}
