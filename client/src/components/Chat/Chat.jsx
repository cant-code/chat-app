import React from "react";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import { useStyles } from "./Chat.style";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import SendIcon from "@material-ui/icons/Send";

export default function Chat() {
  const classes = useStyles();

  return (
    <Container className={classes.root}>
      <Grid className={classes.chat}>
        <Grid xs={12} className={classes.chatBox}>
          Test
        </Grid>
        <Grid xs={12} className={classes.sendMsg}>
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
              <Grid item xs={1} className={classes.send} alignItems="center">
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
