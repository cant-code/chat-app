import React from "react";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Fab from "@material-ui/core/Fab";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import Zoom from "@material-ui/core/Zoom";
import { useStyles } from "./ScrollToBottom.style";

function ScrollToBottom({ lastId, target }) {
  const classes = useStyles();

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 1000,
    target: target.current ? target.current : window,
  });

  const handleClick = (event) => {
    lastId.current.scrollIntoView({ behavior: "smooth", block: "end" });
  };

  return (
    <Zoom in={trigger}>
      <div onClick={handleClick} className={classes.root}>
        <Fab
          size="small"
          aria-label="scroll back to top"
          style={{ backgroundColor: "#009E7F", color: "white" }}
        >
          <KeyboardArrowDownIcon />
        </Fab>
      </div>
    </Zoom>
  );
}

export default ScrollToBottom;
