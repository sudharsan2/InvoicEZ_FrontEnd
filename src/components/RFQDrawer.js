import React, { useState } from "react";
import {
  
  Drawer,
  makeStyles,
  
  useRestoreFocusSource,
  
} from "@fluentui/react-components";
import RFQPage from "../pages/RFQ";

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

const RFQDrawer = ({data,onClose}) => {
  const styles = useStyles();
  const [isOpen, setIsOpen] = useState(true);
  

  
  const restoreFocusSourceAttributes = useRestoreFocusSource();

  const handleClose = () => {
    setIsOpen(false);
    if (onClose) onClose(); 
  };

  return (
    <div className={styles.root}>
      <Drawer
        {...restoreFocusSourceAttributes}
        type="overlay"
        position="end"
        separator
        open={isOpen}
        onOpenChange={(_, { open }) => {
          setIsOpen(open)
          if (!open) handleClose(); 
        }}
        className={styles.drawer}
      >
        <div className={styles.drawerContent}>
          <RFQPage data={data}/>
        </div>
      </Drawer>
    </div>
  );
};

export default RFQDrawer;
