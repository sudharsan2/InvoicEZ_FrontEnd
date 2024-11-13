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
import ComparePage from "../pages/ComparePage";

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

const CompareDrawer = () => {
  const styles = useStyles();
  const [isOpen, setIsOpen] = useState(true);
  const [type, setType] = useState("overlay");

  const restoreFocusTargetAttributes = useRestoreFocusTarget();
  const restoreFocusSourceAttributes = useRestoreFocusSource();

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
          <ComparePage />
        </div>
      </Drawer>
    </div>
  );
};

export default CompareDrawer;
