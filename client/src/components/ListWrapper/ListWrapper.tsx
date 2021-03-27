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
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import Dialog from "../Dialog/Dialog";
import SocketContext from "../../context/socket";
import { ChatContext } from "../../context/chat";
import { SidebarContext } from "../../context/sidebar";
import { MessageContext } from '../../context/messages';
import { useStyles, ListItem, Avatar, StyledBadge } from "./ListWrapper.style";

interface ListWrapperProps {
  currSelected: number;
  loader: boolean;
  setLoader: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface UserType {
  _id: string;
  username: string;
  email: string;
  error?: string;
}

const ListWrapper: React.FC<ListWrapperProps> = ({ currSelected, loader, setLoader }) => {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));
  const classes = useStyles();
  const { user, setUser } = useContext(ChatContext);
  const { setOpen } = useContext(SidebarContext);
  const { msgCount, setMsgCount } = useContext(MessageContext);
  const list = currSelected;
  const [selected, setSelected] = useState(user.id);
  const [users, setUsers] = useState<UserType[]>([]);
  const [online, setOnline] = useState<string[]>([]);
  const socket = useContext(SocketContext);
  const [open, setModal] = useState(false);
  const [dialogType, setDialog] = useState("");

  const handleModal = (type: string) => {
    setModal((m) => !m);
    setDialog(type);
  };

  const handleListItemClick = (id: string, username: string) => {
    if (user.type === "group") {
      socket.emit("endgroup", id);
    }
    const res = msgCount.filter(el => el.id !== id);
    setMsgCount(res);
    let type = list === 0 ? "chat" : "group";
    setSelected(id);
    setUser({ id, username, type });
    if (mobile) setOpen(false);
  };

  useEffect(() => {
    async function getUsers(url: string) {
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
        const data: UserType[] = await res.json();
        setUsers(data);
      } catch (e) {}
      setLoader(false);
    }
    if (list === 0) getUsers("/api/users/");
    else if (list === 1) getUsers("/api/group/");
  }, [list, setLoader]);

  useEffect(() => {
    socket.on("users", (body: UserType) => {
      setUsers(d => [...d, body]);
    });
    socket.on("userlist", (body: string[]) => {
      setOnline(body);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getNoMsg = (id: string) => {
    const res = msgCount.find(el => el.id === id);
    if (res === undefined) return false;
    return res.count;
  }

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
            users.map((item: UserType) => (
              <React.Fragment key={item._id}>
                <ListItem
                  button
                  dense
                  selected={selected === item._id}
                  onClick={() => handleListItemClick(item._id, item.username)}
                >
                  <ListItemAvatar>
                    {online.includes(item._id) ? (
                      <StyledBadge
                        overlap="circle"
                        anchorOrigin={{
                          vertical: 'top',
                          horizontal: 'right'
                        }}
                        variant="dot"
                        >
                          <Avatar>{list === 1 ? <GroupIcon /> : null}</Avatar>
                        </StyledBadge>
                    ) : (
                        <Avatar>{list === 1 ? <GroupIcon /> : null}</Avatar>
                    )}
                  </ListItemAvatar>
                  {item.username && <ListItemText primary={item.username} />}
                  {getNoMsg(item._id)}
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

export default ListWrapper;