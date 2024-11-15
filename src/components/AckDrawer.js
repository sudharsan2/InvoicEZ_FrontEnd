import React, { useState,useEffect } from "react";
import {
  DrawerBody,
  DrawerHeader,
  DrawerHeaderTitle,
  Drawer,
  makeStyles,
  tokens,
  useId,
  useRestoreFocusSource,
  useRestoreFocusTarget,
} from "@fluentui/react-components";
import AckPage from "../pages/AckPage";

const useStyles = makeStyles({
  root: {
   
    overflow: "hidden",
    display: "flex",
    height: "480px",
    backgroundColor: "#fff",
  },
  drawer: {
    width: "80vw", 
    maxWidth: "80vw",
    overflowY: "auto",
  },
  drawerContent: {
    width: "100%",
    marginLeft:"2em" ,
    marginTop:"1em"
  },
});

const AckDrawer = ({data,setIsOpen,isOpen}) => {
  const styles = useStyles();
  // const [isOpen, setIsOpen] = useState(true);
  const [type, setType] = useState("overlay");

  const restoreFocusTargetAttributes = useRestoreFocusTarget();
  const restoreFocusSourceAttributes = useRestoreFocusSource();
  useEffect(()=>{
  console.log("Data",data);
  },[data])
  return (
    <div className={styles.root}>
      <Drawer
        {...restoreFocusSourceAttributes}
        type={type}
        position="end"
        separator
        open={isOpen}
        onOpenChange={(_, { open }) => setIsOpen(open)}
        className={styles.drawer}
      >
        <div className={styles.drawerContent}>
          <AckPage data={data}/>
        </div>
      </Drawer>
    </div>
  );
};

export default AckDrawer;
