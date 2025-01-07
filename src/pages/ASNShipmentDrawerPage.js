import React  from "react";

import {ArrowLeft24Regular,ArrowUpload24Regular,  } from "@fluentui/react-icons";
import DatePickerComponent from "../components/DatePicker";

import {
 
  Button,
  Input
} from "@fluentui/react-components";


import {useNavigate} from "react-router-dom";














  

  
const ASNShipmentDrawerPage = () => {
   
    
 
  
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
