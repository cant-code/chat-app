import React, { useState, useCallback } from "react";
import Snackbar from "../components/SnackBar";

interface Context {
  msg: Message;
  setMsg: (message: string, type: string) => void;
  removeMsg: () => void;
};

interface Message {
  msg: string;
  type: string;
}

export const SnackbarContext = React.createContext<Context>({
  msg: {msg: "", type: ""},
  setMsg: () => {},
  removeMsg: () => {},
});

const SnackbarProvider: React.FC = ({ children }) => {
  const [msg, setMsg] = useState<Message>({msg: "", type: ""});
  const removeMsg = () => setMsg({msg: "", type: ""});
  const addMsg = (msg: string, type: string) => setMsg({ msg, type });

  const contextValue = {
    msg,
    setMsg: useCallback((message: string, type: string) => addMsg(message, type), []),
    removeMsg: useCallback(() => removeMsg(), []),
  };

  return (
    <SnackbarContext.Provider value={contextValue}>
      {children}
      <Snackbar />
    </SnackbarContext.Provider>
  );
}

export default SnackbarProvider;
