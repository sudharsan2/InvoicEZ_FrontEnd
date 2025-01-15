import React  from "react";

import { makeStyles,Button } from "@fluentui/react-components";


import AckTable from "../components/AckTable";
const useStyles = makeStyles({
    root: {
    
      display: "flex",
      flexDirection: "column",
     
      gap: "2px",
      
      maxWidth: "400px",
    },
  });




  

  
const AckPage = ({data,onAcknowledge, onReject}) => {
  
  
  return (
    <div style={{ maxHeight: "91vh", overflowY: "auto" }}>
        
     <div style={{display:"flex",justifyContent:"space-between",width:"50%",marginLeft:"-2em",margintop:"-3em"}}>
     <div style={{display:"flex",justifyContent:"flex-start",padding:"6em"}}>
        <Button style={{color:"white",backgroundColor:"#3d98de"}} onClick={onAcknowledge}>Acknowledge</Button>
     </div>
     <div style={{display:"flex",justifyContent:"flex-start",padding:"6em"}}>
        <Button style={{color:"white",backgroundColor:"#3d98de"}} onClick={onReject}>Reject</Button>
     </div>
     </div>

     <AckTable data={data}/>
      
    </div>
  );
};

export default AckPage;
