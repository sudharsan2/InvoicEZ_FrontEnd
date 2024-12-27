



import React, { useState } from "react";
import {
  
  Drawer,
  makeStyles,
  useRestoreFocusSource,
  
} from "@fluentui/react-components";

import ASNDrawerPage from "../pages/ASNDrawerPage";

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

const ASNDrawer = ({ isOpen, setIsOpen }) => {
  const styles = useStyles();
  const [type, setType] = useState("overlay");

  
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
          <ASNDrawerPage />
        </div>
      </Drawer>
    </div>
  );
};

export default ASNDrawer;
