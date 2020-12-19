import React, { useState } from "react";

export const ChatContext = React.createContext({
  user: {},
  setUser: () => {},
});

const ChatProvider = ({ children }) => {
  const [user, setUser] = useState({});

  return (
    <ChatContext.Provider value={{ user, setUser }}>
      {children}
    </ChatContext.Provider>
  );
};

export default ChatProvider;
