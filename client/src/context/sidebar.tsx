import React, { SetStateAction, useState } from "react";

interface SideBar {
  open: {};
  setOpen: React.Dispatch<SetStateAction<{}>>;
}

export const SidebarContext = React.createContext<SideBar>({
  open: true,
  setOpen: () => {},
});

const SidebarProvider: React.FC<{children: any}> = ({ children }) => {
  const [open, setOpen] = useState({});

  return (
    <SidebarContext.Provider value={{ open, setOpen }}>
      {children}
    </SidebarContext.Provider>
  );
};

export default SidebarProvider;
