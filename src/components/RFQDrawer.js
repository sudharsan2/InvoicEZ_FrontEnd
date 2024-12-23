import React, { useState } from "react";
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
  const [type, setType] = useState("overlay");

  const restoreFocusTargetAttributes = useRestoreFocusTarget();
  const restoreFocusSourceAttributes = useRestoreFocusSource();

  const handleClose = () => {
    setIsOpen(false);
    if (onClose) onClose(); 
  };

  return (
    <div className={styles.root}>
      <Drawer
        {...restoreFocusSourceAttributes}
        type={type}
        position="end"
        separator
        open={isOpen}
        onOpenChange={(_, { open }) => {
          setIsOpen(open)
          if (!open) handleClose(); // Trigger close logic when the drawer closes
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
