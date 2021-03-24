import React, { useState, useEffect, useContext, useRef } from "react";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import { useStyles } from "./Chat.style";
import Avatar from "@material-ui/core/Avatar";
import ForumIcon from "@material-ui/icons/Forum";
import Typography from "@material-ui/core/Typography";
import Box, { BoxProps } from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Tooltip from "@material-ui/core/Tooltip";
import ChatBar from "../ChatBar/ChatBar";
import ScrollToBottom from '../ScrollToBottom/ScrollToBottom';
import { ChatContext, User } from "../../context/chat";
import SocketContext from "../../context/socket";

const Chat: React.FC = () => {
  const classes = useStyles();
  const { user } = useContext(ChatContext);
  const clientId = useRef<User>();
  clientId.current = user;
  const socket = useContext(SocketContext);
  const [msgs, setMsgs] = useState<string[]>([]);
  const userId = localStorage.getItem("id");
  const fieldRef = useRef<HTMLDivElement>(null);
  const currWindow = useRef<HTMLDivElement>(null);

  useEffect(() => {
    socket.emit("clientInfo", { id: localStorage.getItem("id") });
  }, []);

  useEffect(() => {
    socket.on("messages", (body: any) => {
      if (
        clientId!.current!.id === body?.from ||
        localStorage.getItem("id") === body.from ||
        clientId!.current!.type === "group"
      ) {
        setMsgs((m) => [...m, body]);
        handleScroll();
      }
    });
  }, [clientId]);

  useEffect(() => {
    async function getChat(url: string) {
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
    if (user.type !== "group" && user.id !== "")
      getChat(`/api/messages/convos/query?userId=${user.id}`);
    if (user.type === "group") {
      socket.emit("joingroup", user.id);
      if (user.id === "global") getChat("/api/messages/global/");
      else getChat(`/api/group/query?group=${user.id}`);
    }
  }, [user]);

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
          <Box className={classes.chatBox} {...{ ref: currWindow } as any }>
            <Grid container className={classes.chatContainer}>
              {msgs.length > 0 &&
                msgs.map((m: any) => (
                  <Grid
                    key={m._id}
                    item
                    style={{ width: "100%", minHeight: 0 }}
                    ref={fieldRef}
                  >
                    <Paper
                      className={`${classes.paper} ${m.from === userId ? classes.backgroundPrimary : null
                        }`}
                      style={{
                        marginLeft: m.from === userId ? "auto" : "0",
                      }}
                    >
                      <Grid container wrap="nowrap" spacing={2}>
                        <Grid item>
                          {user.type === "group" && m.fromObj && (
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
            <ScrollToBottom lastId={fieldRef} target={currWindow} />
          </Box>
          <Grid className={classes.sendMsg}>
            <ChatBar user={user} />
          </Grid>
        </Container>
      </Grid>
    </Box>
  );
};

export default Chat;