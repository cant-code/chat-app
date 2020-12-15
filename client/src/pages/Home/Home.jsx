import React from "react";
import Navbar from "../../components/Navbar";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import ChatList from "../../components/ChatList/ChatList";
import Chat from "../../components/Chat/Chat";
import { useStyles } from "./Home.style";

export default function Home() {
  const classes = useStyles();

  return (
    <>
      <Navbar />
      <Grid container className={classes.root}>
        <Grid item xs={3} component={Box} display={{ xs: "none", sm: "block" }}>
          <Paper
            variant="outlined"
            square
            className={classes.paper}
            style={{
              marginRight: "1em",
              borderTopRightRadius: "15px",
              borderBottomRightRadius: "15px",
            }}
          >
            <ChatList />
          </Paper>
        </Grid>
        <Grid item xs>
          <Paper
            variant="outlined"
            className={`${classes.paper} ${classes.chatList}`}
            square
          >
            <Chat />
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}
