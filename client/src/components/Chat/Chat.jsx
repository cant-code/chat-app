import React, { useState, useEffect, useContext, useRef } from "react";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import { useStyles } from "./Chat.style";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import SendIcon from "@material-ui/icons/Send";
import Avatar from "@material-ui/core/Avatar";
import ForumIcon from "@material-ui/icons/Forum";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Tooltip from "@material-ui/core/Tooltip";
// import ScrollToBottom from "../ScrollToBottom/ScrollToBottom";
import { ChatContext } from "../../context/chat";
import SocketContext from "../../context/socket";

export default function Chat() {
  const classes = useStyles();
  const { user } = useContext(ChatContext);
  const clientId = useRef();
  clientId.current = user;
  const socket = useContext(SocketContext);
  const [msgs, setMsgs] = useState([]);
  const [text, setText] = useState("");
  const userId = localStorage.getItem("id");
  const fieldRef = useRef(null);
  const currWindow = useRef(null);

  useEffect(() => {
    socket.emit("clientInfo", { id: localStorage.getItem("id") });
  }, []);

  useEffect(() => {
    socket.on("messages", (body) => {
      if (
        clientId.current.id === body.from ||
        localStorage.getItem("id") === body.from ||
        clientId.current.type === "group"
      ) {
        setMsgs((m) => [...m, body]);
        handleScroll();
      }
    });
  }, [clientId]);

  useEffect(() => {
    async function getChat(url) {
      const requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${localStorage.getItem("token")}`,
        },
      };
      const res = await fetch(url, requestOptions);
      const data = await res.json();
      setMsgs(data);
      handleScroll();
    }
    if (Object.entries(user).length !== 0 && user.type !== "group")
      getChat(`/api/messages/convos/query?userId=${user.id}`);
    if (user.type === "group") {
      socket.emit("joingroup", user.id);
      if (user.id === "global") getChat("/api/messages/global/");
      else getChat(`/api/group/query?group=${user.id}`);
    }
  }, [user]);

  const submitMsg = async (e) => {
    e.preventDefault();
    if (text === "") return;
    let data, url;
    if (user.type === "group") {
      if (user.id === "global") {
        data = JSON.stringify({ data: text });
        url = "/api/messages/global/";
      } else {
        data = JSON.stringify({ group: user.id, data: text });
        url = "/api/group/";
      }
    } else {
      data = JSON.stringify({ to: user.id, data: text });
      url = "/api/messages/";
    }
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${localStorage.getItem("token")}`,
      },
      body: data,
    };
    const res = await fetch(url, requestOptions);
    setText("");
  };

  const handleScroll = () => {
    if (fieldRef.current !== null)
      fieldRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
  };

  return (
    <Box className={classes.root}>
      <Grid className={classes.chat}>
        <Grid container>
          <Grid item xs={12}>
            <Paper variant="outlined" square className={classes.userDetail}>
              <Avatar alt={user.username} className={classes.avatar}>
                {user.type === "group" ? <ForumIcon /> : null}
              </Avatar>
              <Typography variant="h4">
                {user.username ? user.username : "Select a chat"}
              </Typography>
            </Paper>
          </Grid>
        </Grid>
        <Container maxWidth={false} className={classes.container}>
          <Box className={classes.chatBox} ref={currWindow}>
            <Grid container className={classes.chatContainer}>
              {msgs.length > 0 &&
                msgs.map((m) => (
                  <Grid
                    key={m._id}
                    item
                    style={{ width: "100%", minHeight: 0 }}
                    ref={fieldRef}
                  >
                    <Paper
                      className={`${classes.paper} ${
                        m.from === userId ? classes.backgroundPrimary : null
                      }`}
                      style={{
                        marginLeft: m.from === userId ? "auto" : "0",
                      }}
                    >
                      <Grid container wrap="nowrap" spacing={2}>
                        <Grid item>
                          {user.type === "group" && (
                            <Tooltip title={m.fromObj[0].username} arrow>
                              <Avatar className={classes.userAvatar}>
                                {m.fromObj[0].username[0]}
                              </Avatar>
                            </Tooltip>
                          )}
                        </Grid>
                        <Grid item xs>
                          <Typography
                            variant="body1"
                            style={{ padding: "5px" }}
                          >
                            {m.body}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Paper>
                  </Grid>
                ))}
            </Grid>
            {/* {msgs.length > 0 && (
              <ScrollToBottom lastId={fieldRef} target={currWindow} />
            )} */}
          </Box>
          <Grid className={classes.sendMsg}>
            <form autoComplete="off" noValidate onSubmit={submitMsg}>
              <Grid container>
                <Grid item xs={11}>
                  <TextField
                    disabled={user.username ? false : true}
                    onChange={(e) => setText(e.target.value)}
                    value={text}
                    id="msg"
                    label="Type your message..."
                    variant="outlined"
                    margin="dense"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={1} className={classes.send}>
                  <IconButton
                    type="submit"
                    aria-label="add an alarm"
                    disabled={user.username ? false : true}
                  >
                    <SendIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Container>
      </Grid>
    </Box>
  );
}
