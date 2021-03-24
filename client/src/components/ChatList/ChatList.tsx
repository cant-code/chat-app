import React from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import ContactsIcon from "@material-ui/icons/Contacts";
import ForumIcon from "@material-ui/icons/Forum";
import ListWrapper from "../ListWrapper/ListWrapper";
import Box from "@material-ui/core/Box";
import { AppBar, useStyles } from "./ChatList.style";

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
  className: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, index, value, ...other } = props;

  return <div {...other}>{value === index && <Box>{children}</Box>}</div>;
}

const IconLabelTabs: React.FC = () => {
  const [value, setValue] = React.useState<number>(0);
  const [loader, setLoader] = React.useState<boolean>(true);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setLoader(true);
    setValue(newValue);
  };

  const classes = useStyles();

  return (
    <>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="secondary"
          aria-label="icon label tabs example"
          variant="fullWidth"
          centered
        >
          <Tab icon={<ContactsIcon />} label="Users" />
          <Tab icon={<ForumIcon />} label="Chat Rooms" />
        </Tabs>
      </AppBar>
      <TabPanel className={classes.tabPanel} index={value} value={value}>
        <ListWrapper
          currSelected={value}
          loader={loader}
          setLoader={setLoader}
        />
      </TabPanel>
    </>
  );
}

export default IconLabelTabs;
