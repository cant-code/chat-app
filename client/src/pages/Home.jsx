import React from "react";
import Navbar from "../components/Navbar";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      width: theme.spacing(83.5),
      height: theme.spacing(50),
    },
  },
  paper: {
    width: theme.spacing(40),
    height: theme.spacing(70),
    margin: theme.spacing(2),
  },
  paper2: {
    width: theme.spacing(120),
    height: theme.spacing(70),
    margin: theme.spacing(2),
  },
}));

export default function Home() {
  const classes = useStyles();

  return (
    <>
      <Navbar />
      <div className={classes.root}>
        <Paper variant="outlined" className={classes.paper} />
        <Paper variant="outlined" className={classes.paper2} />
      </div>
    </>
  );
}
