import React, { useState } from "react";

export const ChatContext = React.createContext({
  user: {},
  setUser: () => {},
});

const ChatProvider = ({ children }) => {
  const [user, setUser] = useState({});

  const value = React.useMemo(
    () => ({
      user,
      setUser,
    }),
    [user]
  );

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

export default ChatProvider;
