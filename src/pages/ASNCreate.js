import React  from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbDivider,
  BreadcrumbButton,makeStyles,Divider
} from "@fluentui/react-components";

import Search from "../components/Search";

import {Add24Filled,Eye24Filled } from "@fluentui/react-icons";
import DatePickerComponent from "../components/DatePicker";

import ASNCreateTable from "../components/ASNCreationTable";
import { useNavigate } from "react-router-dom";
import DropDown from "../components/DropDown";


const useStyles = makeStyles({
    root: {
    
      display: "flex",
      flexDirection: "column",
     
      gap: "2px",
      
      maxWidth: "400px",
    },
  });




  
  const path = "/asncreate";
  const path1 = "http://localhost:3000/";
  
const ASNCreate = () => {
    const navigate = useNavigate();
   
  

  
  return (
    <div style={{ maxHeight: "91vh", overflowY: "auto" }}>

<div >
          <Breadcrumb aria-label="Breadcrumb default example">
            <BreadcrumbItem>
              <BreadcrumbButton href={path1}>Home</BreadcrumbButton>
            </BreadcrumbItem>
            <BreadcrumbDivider />
            <BreadcrumbItem>
              <BreadcrumbButton href={path}>ASN Creation</BreadcrumbButton>
            </BreadcrumbItem>
            <BreadcrumbDivider />
          </Breadcrumb>
        </div>
        <div style={{padding:"2em"}}>
           
        
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", width: "50%", gap: "2em" ,marginLeft:"2em"}}>
        <div style={{ display: "flex", flexDirection: "column", flex: "1 1 30%", maxWidth: "30%" }}>
    <span style={{ marginBottom: "10px" }}>Type</span>
    <DropDown />
  </div>

  <div style={{ display: "flex", flexDirection: "column", flex: "1 1 30%", maxWidth: "30%" }}>
    <span style={{ marginBottom: "10px" }}>Organization</span>
    <DropDown />
  </div>


  <div style={{ display: "flex", flexDirection: "column", flex: "1 1 30%", maxWidth: "50%",marginTop:"-1em" }}>
    <Search placeholder="Search PO or ItemCode"/>
  </div>
  
  <div style={{ display: "flex", flexDirection: "row", flex: "1 1 30%",gap:"40px",}}>
   <div style={{display:"flex",flexDirection:"column",width:"30%" }}>
   <span style={{ marginBottom: "10px" }}>From Date</span>
   <DatePickerComponent />
   </div>
    
   <div style={{display:"flex",flexDirection:"column",width:"30%" }}>
   <span style={{ marginBottom: "10px" }}>To Date</span>
   <DatePickerComponent />
   </div>
  </div>
  
</div>
<div style={{display:"flex",alignItems:"center",justifyContent:"center",marginTop:"2em",gap:"2em"}}>
    <div style={{display:"flex",flexDirection:"row",gap:"1em",}}>
    
    <Add24Filled style={{color:"#0078d4"}}/>
    <span>Add to Cart</span>
    
    </div>

    <div style={{display:"flex",flexDirection:"row",gap:"1em",}}>
    <Eye24Filled style={{color:"#0078d4",cursor:"pointer"}} onClick={()=>{navigate('/preview')}}/>
    <span>Preview</span>
    </div>
    

</div>
<Divider style={{marginTop:"2em"}}/>

<ASNCreateTable/>


     
      
    </div>
  );
};

export default ASNCreate;
