import React from "react";
import Navbar from "../components/Navbar";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import ChatList from "../components/ChatList/ChatList";
import Chat from "../components/Chat/Chat";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: "1em",
  },
  paper: {
    [theme.breakpoints.down("xs")]: {
      height: "calc(100vh - 56px - 2em)",
    },
    [theme.breakpoints.up("sm")]: {
      height: "calc(100vh - 64px - 2em)",
    },
  },
  chatList: {
    [theme.breakpoints.up("sm")]: {
      borderTopLeftRadius: "15px",
      borderBottomLeftRadius: "15px",
    },
  },
}));

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
