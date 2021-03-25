import React, { SetStateAction, useState } from "react";

interface Chat {
  user: User;
  setUser: React.Dispatch<SetStateAction<User>>;
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

const ChatProvider: React.FC = ({ children }) => {
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
