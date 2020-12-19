import React, { useState } from "react";

export const ChatContext = React.createContext({
  id: "",
  setId: () => {},
});

const ChatProvider = ({ children }) => {
  const [id, setId] = useState("");

  return (
    <ChatContext.Provider value={{ id, setId }}>
      {children}
    </ChatContext.Provider>
  );
};

export default ChatProvider;
