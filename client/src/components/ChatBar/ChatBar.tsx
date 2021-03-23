import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import SendIcon from "@material-ui/icons/Send";
import { User } from "../../context/chat";
import { useStyles } from "./ChatBar.style";

type prop = {
  user: User;
};

const ChatBar: React.FC<prop> = ({ user }) => {
  const [text, setText] = useState("");
  const classes = useStyles();

  const submitMsg = async (e: React.FormEvent<HTMLFormElement>) => {
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
    await fetch(url, requestOptions);
    setText("");
  };

  return (
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
            aria-label="Send"
            disabled={user.username ? false : true}
          >
            <SendIcon />
          </IconButton>
        </Grid>
      </Grid>
    </form>
  );
}

export default ChatBar;