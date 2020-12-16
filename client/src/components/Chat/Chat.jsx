import React from "react";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import { useStyles } from "./Chat.style";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import SendIcon from "@material-ui/icons/Send";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import Box from "@material-ui/core/Box";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import Paper from "@material-ui/core/Paper";

export default function Chat() {
  const classes = useStyles();

  return (
    <Container maxWidth={false} className={classes.root}>
      <Grid className={classes.chat}>
        <Grid container className={classes.chatBox}>
          <Grid item className={classes.box}>
            <List
              className={classes.list}
              style={{ maxHeight: "75vh", overflow: "auto" }}
            >
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((m) => (
                <Box
                  component={Paper}
                  style={{ marginLeft: m % 2 === 0 ? "auto" : "0" }}
                  className={`${classes.message} ${
                    m % 2 === 0 ? classes.backgroundPrimary : null
                  }`}
                  key={m}
                >
                  <ListItem spacing={2}>
                    {m % 2 !== 0 && (
                      <Box
                        component={ListItemAvatar}
                        display={{ xs: "none", md: "block" }}
                      >
                        <Avatar>W</Avatar>
                      </Box>
                    )}
                    <ListItemText
                      primary={
                        <Typography component="span" variant="body2">
                          Truncation should be conditionally applicable on this
                          long line of text as this is a much longer line than
                          what the container can support.
                        </Typography>
                      }
                      secondary=""
                    />
                  </ListItem>
                </Box>
              ))}
            </List>
          </Grid>
        </Grid>
        <Grid className={classes.sendMsg}>
          <form>
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
      </Grid>
    </Container>
  );
}
