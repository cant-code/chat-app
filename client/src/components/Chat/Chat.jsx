import React from "react";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import { useStyles } from "./Chat.style";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import SendIcon from "@material-ui/icons/Send";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";

export default function Chat() {
  const classes = useStyles();

  return (
    <Container maxWidth={false} className={classes.root}>
      <Grid className={classes.chat}>
        <Grid className={classes.chatBox}>
          <Box className={`${classes.box}`}>
            <Paper className={classes.message}>
              <Grid container wrap="nowrap" spacing={2}>
                <Box
                  component={Grid}
                  item
                  display={{ xs: "none", md: "block" }}
                >
                  <Avatar>W</Avatar>
                </Box>
                <Grid item xs>
                  <Typography>
                    Truncation should be conditionally applicable on this long
                    line of text as this is a much longer line than what the
                    container can support.
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </Box>
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
