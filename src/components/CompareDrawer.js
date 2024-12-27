import React, { useState,useEffect } from "react";
import {
  
  Drawer,
  makeStyles,
 
  useRestoreFocusSource,
 
} from "@fluentui/react-components";

import ComparePage from "../pages/ComparePage";
import {  useSelector } from "react-redux";
import axios from "axios";
import {message} from "antd";
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

const CompareDrawer = ({data,onClose}) => {
  const styles = useStyles();
  const [isOpen, setIsOpen] = useState(true);
  

  const handleClose = () => {
    setIsOpen(false);
    if (onClose) onClose(); 
  };

  
  const restoreFocusSourceAttributes = useRestoreFocusSource();

  const selectedSupplier = useSelector(
    (state) => state.refresh.conformedSupplier,
  );

  const handleSubmit= async ()=>{
    console.log("Compare API ")
    try{
      
      const response = await axios.put(`http://172.235.21.99:57/user/update-supplier/${data.id}/`, { supplier_id: selectedSupplier });
      if (response.status === 200) {
        
        handleClose();
        message.success("Supplier Response submitted successfully");
  
      }
    }
    catch(error)
  {
    message.error("Error while submitting Supplier response");
     console.log("Error",error);
  }

  
  
}
  useEffect(() => {
    console.log("selected table", data);
 }, [data]);
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
          <ComparePage data={data} onSubmit={handleSubmit}/>
        </div>
      </Drawer>
    </div>
  );
};

export default CompareDrawer;
