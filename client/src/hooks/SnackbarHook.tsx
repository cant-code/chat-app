import { useContext } from "react";
import { SnackbarContext } from "../context/snackbar";

const useSnackbar = () => {
  const { msg, setMsg, removeMsg } = useContext(SnackbarContext);
  return { msg, setMsg, removeMsg };
};

export default useSnackbar;
