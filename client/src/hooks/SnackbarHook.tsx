import { useContext } from "react";
import { SnackbarContext } from "../context/snackbar";

const useSnackbar = () => {
  const { msg: string, setMsg, removeMsg } = useContext(SnackbarContext);
  return { msg: string, setMsg, removeMsg };
};

export default useSnackbar;
