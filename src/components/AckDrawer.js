import React, {useEffect } from "react";
import {
  Drawer,
  makeStyles,
  useRestoreFocusSource,
} from "@fluentui/react-components";
import AckPage from "../pages/AckPage";
import {message} from "antd"; 
import axios from "axios";
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

const AckDrawer = ({data,setIsOpen,isOpen,onClose}) => {
  const styles = useStyles();


 
  const restoreFocusSourceAttributes = useRestoreFocusSource();
  useEffect(()=>{
  console.log("Data",data);
  },[data])


  const handleClose = () => {
    setIsOpen(false);
    if (onClose) onClose(); 
  };


  const handleAcknowledge = async () => {
    console.log("ACK API ")
    try{
      
      const response = await axios.put(`https://invoicezapi.focusrtech.com:57/user/acknowledge-purchase-requisition/${data.id}/`);
      if (response.status === 200) {
        
        handleClose();
        message.success("Supplier Accepted Successfully!!!");
  
      }
    }
    catch(error)
  {
    message.error("Error while Accepting !!!");
     console.log("Error",error);
  }

 
  };

  
  const handleReject = async () => {
    console.log("REJ API ")
    try{
      
      const response = await axios.put(`https://invoicezapi.focusrtech.com:57/user/update-status/${data.id}/`);
      if (response.status === 200) {
        
        handleClose();
        message.success("Supplier Rejected Successfully!!!");
  
      }
    }
    catch(error)
  {
    message.error("Error while Rejecting !!!");
     console.log("Error",error);
  }
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
          if (!open) handleClose(); // Trigger close logic when the drawer closes
        }}
        className={styles.drawer}
      >
        <div className={styles.drawerContent}>
          <AckPage data={data} onAcknowledge={handleAcknowledge}
            onReject={handleReject}/>
        </div>
      </Drawer>
    </div>
  );
};

export default AckDrawer;
