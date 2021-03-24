import React, { useState } from "react";

interface Chat {
  user: User;
  setUser: Function;
};

export type User = {
  id: string,
  username: string,
  type: string
};

export const ChatContext = React.createContext<Chat>({
  user: {id: "", username: "", type: ""},
  setUser: () => {},
});

const ChatProvider: React.FC<{children: any}> = ({ children }) => {
  const [user, setUser] = useState<User>({id: "", username: "", type: ""});

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
