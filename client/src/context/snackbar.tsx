import React, { useState, useCallback } from "react";
import Snackbar from "../components/SnackBar";

export const SnackbarContext = React.createContext({
  msg: null,
  setMsg: () => {},
  removeMsg: () => {},
});

export default function SnackbarProvider({ children }) {
  const [msg, setMsg] = useState(null);
  const removeMsg = () => setMsg(null);
  const addMsg = (message, type) => setMsg({ message, type });

  const contextValue = {
    msg,
    setMsg: useCallback((message, type) => addMsg(message, type), []),
    removeMsg: useCallback(() => removeMsg(), []),
  };

  return (
    <SnackbarContext.Provider value={contextValue}>
      {children}
      <Snackbar />
    </SnackbarContext.Provider>
  );
}
