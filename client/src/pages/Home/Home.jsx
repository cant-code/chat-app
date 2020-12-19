import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import SocketContext from "../../context/socket";
import ChatList from "../../components/ChatList/ChatList";
import Chat from "../../components/Chat/Chat";
import { useStyles } from "./Home.style";

export default function Home() {
  const classes = useStyles();
  const history = useHistory();
  const socket = React.useContext(SocketContext);

  useEffect(() => {
    console.log(process.env.REACT_APP_API);
    socket.on("connection", () => console.log(socket.id));
    socket.emit("Hi", "Hi");
    socket.on("rooms", (rooms) => console.log("Hi", rooms));
    return () => {
      socket.disconnect();
    };
  }, [socket]);

  useEffect(() => {
    async function verifyUser() {
      const requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${localStorage.getItem("token")}`,
        },
      };
      const res = await fetch("/api/users/", requestOptions);
      if (res.status === 401) history.push("/login");
    }
    verifyUser();
  }, [history]);

  return (
    <>
      <Navbar />
      <Grid container className={classes.root}>
        <Grid
          item
          xs={3}
          component={Box}
          display={{ xs: "none", sm: "none", md: "block" }}
        >
          <Paper variant="outlined" square className={classes.paper}>
            <ChatList />
          </Paper>
        </Grid>
        <Grid item xs>
          <Paper variant="outlined" className={classes.paper} square>
            <Chat />
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}
