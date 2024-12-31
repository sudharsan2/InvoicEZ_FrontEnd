import React ,{useState} from "react";
import {Input} from "@fluentui/react-components";

import {ArrowLeft24Regular,ArrowUpload24Regular,  } from "@fluentui/react-icons";
import DatePickerComponent from "../components/DatePicker";

import {
 
  Button,
  makeStyles,
} from "@fluentui/react-components";


import {useNavigate} from "react-router-dom";













const useStyles = makeStyles({
    statusBullet: {
      display: "inline-block",
      width: "8px",
      height: "8px",
      borderRadius: "50%",
      marginRight: "8px",
    },
    statusRFQ: { backgroundColor: "yellow" },
    statusTodo: { backgroundColor: "red" },
    statusCompare: { backgroundColor: "green" },
    iconButtonContainer: {
      display: "flex",
      alignItems: "center",
      justifyContent:"flex-end",
      gap: "8px",
      marginTop: "2em",
      marginLeft: "65%",
    },
    iconButton: {
      display: "flex",
      alignItems: "center",
      backgroundColor: "transparent",
      border: "1px solid #fff",
      padding: "6px 12px",
      cursor: "pointer",
      gap: "8px",
    },
    icon: {
      color: "#1281d7",
      fontSize: "24px", 
    },
    popoverContent: {
      zIndex: 1500,
    },
  });
  

  
const ASNShipmentDrawerPage = () => {
    const [popoverOpen, setPopoverOpen] = useState(false);
    
 
  
  const navigate = useNavigate();
  return (
    <div style={{ maxHeight: "91vh", overflowY: "auto" }}>
      <div>
      <ArrowLeft24Regular onClick={()=>{navigate('/asncreate')}} style={{cursor:"pointer"}}/>
      </div>
      <div>
        <h2>Edit Details</h2>
      </div>
     <div style={{display:"flex",justifyContent:"space-between",width:"50%"}}>
        <div style={{display:"flex",flexDirection:"column"}}>
            <span>Enter Invoice Number</span>
               <Input></Input>
        </div>
        <div style={{display:"flex",flexDirection:"column"}}>
        <span>Enter DO Number</span>
        <Input></Input>
        </div>
        <div style={{display:"flex",flexDirection:"column",width:"30%"}}>
        <span>Invoice Date</span>
        <DatePickerComponent/>
        </div>
        
        
     </div>

     <div style={{marginTop:"2em",display:"flex",flexDirection:"column",gap:"20px",marginLeft:"2em"}}>
        <span>Upload Invoice</span>
        <ArrowUpload24Regular />
        </div>
     
        <div style={{ position: "relative", height: "50vh" }}> 
    <div style={{ position: "absolute", bottom: "0", right: "0", marginRight: "3em" }}>
        <Button style={{ color: "white", backgroundColor: "#3d98de" }}>Done</Button>
    </div>
</div>



        
        
       

     

      
      
    </div>
  );
};

export default ASNShipmentDrawerPage;
