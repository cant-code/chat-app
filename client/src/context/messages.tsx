import React, { SetStateAction, useState } from "react";

interface MessageType {
  msgCount: Message[];
  setMsgCount: React.Dispatch<SetStateAction<Message[]>>;
}

type Message = {
  id: string,
  count: number,
};

export const MessageContext = React.createContext<MessageType>({
  msgCount: [{id: "", count: 0}],
  setMsgCount: () => {},
});

const MessageProvider: React.FC = ({ children }) => {
  const [msgCount, setMsgCount] = useState<Message[]>([{id: '', count: 0}]);

  return (
    <MessageContext.Provider value={{ msgCount, setMsgCount }}>
      {children}
    </MessageContext.Provider>
  );
};

export default MessageProvider;
