



import React, { useEffect, useState } from "react";
import {
  
  Drawer,
  makeStyles,
  useRestoreFocusSource,
  useRestoreFocusTarget,
} from "@fluentui/react-components";
import TodoPage from "../pages/Todo";
import { notification ,message} from "antd";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
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

const TodoDrawer = ({data,onClose}) => {
  const styles = useStyles();
  const [isOpen, setIsOpen] = useState(true);
  const [type, setType] = useState("overlay");
 

  const handleClose = () => {
    setIsOpen(false);
    if (onClose) onClose(); 
  };

  
  const restoreFocusSourceAttributes = useRestoreFocusSource();
  useEffect(() => {
    console.log("selected", data);

 }, [data]);

 const suppliers1 = useSelector((state) => state.refresh.suppliers);
 const navigate = useNavigate();
 const handleSubmit = async () => {
  console.log("submitted");
  try {
   
    const response = await axios.post(
      "https://invoicezapi.focusrtech.com:57/user/store-purchase-details",
      { details: [data], suppliers:suppliers1 }
    );

    if(response.status===200)
    {
      handleClose();
      message.success("PR successfully Submitted");
      navigate('/inloop')
    }
    
  } catch (error) {
    console.error("Error submitting PR:", error);
    notification.error({
      message: "PR submission failed",
      description: "There was an issue submitting your PR. Please try again later.",
    });
  }
};
  return (
    <div className={styles.root}>
      <Drawer
        {...restoreFocusSourceAttributes}
        type={type}
        position="end"
        separator
        open={isOpen}
        // onOpenChange={(_, { open }) => setIsOpen(open)}
        onOpenChange={(_, { open }) => {
          setIsOpen(open)
          if (!open) handleClose(); // Trigger close logic when the drawer closes
        }}
        className={styles.drawer}
      >
        <div className={styles.drawerContent}>
        <TodoPage data={data} onSubmit={handleSubmit} />
        </div>
      </Drawer>
    </div>
  );
};

export default TodoDrawer;
