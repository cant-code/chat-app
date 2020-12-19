import React, { useState, useEffect, useContext } from "react";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import { useStyles } from "./Chat.style";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import SendIcon from "@material-ui/icons/Send";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import { ChatContext } from "../../context/chat";

export default function Chat() {
  const classes = useStyles();
  const { id } = useContext(ChatContext);
  const [msgs, setMsgs] = useState([]);

  useEffect(() => {
    async function getChat() {
      const requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${localStorage.getItem("token")}`,
        },
      };
      const res = await fetch(
        `/api/messages/convos/query?userId=${id}`,
        requestOptions
      );
      const data = await res.json();
      setMsgs(data);
      console.log(msgs);
    }
    if (id !== "") getChat();
  }, [id]);

  return (
    <Box className={classes.root}>
      <Grid className={classes.chat}>
        <Grid container>
          <Grid item xs={12}>
            <Paper variant="outlined" square className={classes.userDetail}>
              <Avatar
                alt="Remy Sharp"
                src="/static/images/avatar/1.jpg"
                className={classes.avatar}
              />
              <Typography variant="h4">XYZ</Typography>
            </Paper>
          </Grid>
        </Grid>
        <Container maxWidth={false} className={classes.container}>
          <Grid container className={classes.chatBox}>
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17].map(
              (m) => (
                <Grid
                  key={m}
                  item
                  style={{ display: "flex", width: "100%", minHeight: 0 }}
                >
                  <Paper
                    className={`${classes.paper} ${
                      m % 2 === 0 ? classes.backgroundPrimary : null
                    }`}
                    style={{
                      marginLeft: m % 2 === 0 ? "auto" : "0",
                      marginRight: "1em",
                    }}
                  >
                    <Grid container wrap="nowrap" spacing={2}>
                      <Grid item xs>
                        <Typography variant="body1" style={{ padding: "5px" }}>
                          lorem50
                        </Typography>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
              )
            )}
          </Grid>
          <Grid className={classes.sendMsg}>
            <form autoComplete="off">
              <Grid container>
                <Grid item xs={11}>
                  <TextField
                    id="msg"
                    label="Type your message..."
                    variant="outlined"
                    margin="dense"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={1} className={classes.send}>
                  <IconButton type="submit" aria-label="add an alarm">
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
