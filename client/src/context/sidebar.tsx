import React, { SetStateAction, useState } from "react";

interface SideBar {
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
}

export const SidebarContext = React.createContext<SideBar>({
  open: true,
  setOpen: () => {},
});

const SidebarProvider: React.FC = ({ children }) => {
  const [open, setOpen] = useState(true);

  return (
    <SidebarContext.Provider value={{ open, setOpen }}>
      {children}
    </SidebarContext.Provider>
  );
};

export default SidebarProvider;
