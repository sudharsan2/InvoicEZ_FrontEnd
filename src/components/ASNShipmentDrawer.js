import React from "react";
import {
 
  Drawer,
  makeStyles,
  useRestoreFocusSource,
  
} from "@fluentui/react-components";
import ASNShipmentDrawerPage from "../pages/ASNShipmentDrawerPage";

const useStyles = makeStyles({
  root: {
    overflow: "hidden",
    display: "flex",
    height: "480px",
  },
  drawer: {
    width: "80vw",
    maxWidth: "80vw",
    overflowY: "auto",
    zIndex: 9999,
    backgroundColor: "#fff",
  },
  drawerContent: {
    width: "100%",
    marginLeft: "2em",
    marginTop: "1em",
  },
});

const ASNShipmentDrawer = ({ isOpen, setIsOpen }) => {
  const styles = useStyles();
  

 
  const restoreFocusSourceAttributes = useRestoreFocusSource();

  return (
    <div className={styles.root}>
      <Drawer
        {...restoreFocusSourceAttributes}
        type="overlay"
        position="end"
        separator
        open={isOpen}
        onOpenChange={(_, { open }) => setIsOpen(open)}
        className={styles.drawer}
      >
        <div className={styles.drawerContent}>
          <ASNShipmentDrawerPage />
        </div>
      </Drawer>
    </div>
  );
};

export default ASNShipmentDrawer;
