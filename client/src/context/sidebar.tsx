import React, { useState } from "react";

export const SidebarContext = React.createContext({
  open: true,
  setOpen: () => {},
});

const SidebarProvider = ({ children }) => {
  const [open, setOpen] = useState({});

  return (
    <SidebarContext.Provider value={{ open, setOpen }}>
      {children}
    </SidebarContext.Provider>
  );
};

export default SidebarProvider;
