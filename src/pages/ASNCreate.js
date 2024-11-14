import React ,{useState} from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbDivider,
  BreadcrumbButton,
} from "@fluentui/react-components";
import TagCounters from "../components/gridapprove";
import Search from "../components/Search";
import ASNTable from "../components/ASNTable";
import DropDownComponent from "../components/DropDown";
import { ArrowClockwise28Regular } from "@fluentui/react-icons";
import {  TabList, Tab } from "@fluentui/react-components";
import { tokens, Divider } from "@fluentui/react-components";
import { Add28Regular,Add24Filled,Eye24Filled } from "@fluentui/react-icons";
import DatePickerComponent from "../components/DatePicker";
import { MdOutlineFilterAltOff } from "react-icons/md";
import { makeStyles, useId, Input, Label } from "@fluentui/react-components";
import ASNCreateTable from "../components/ASNCreationTable";
import {
  Popover,
  PopoverSurface,
  PopoverTrigger,
  Button,
  
} from "@fluentui/react-components";
import { useNavigate } from "react-router-dom";
import DropDown from "../components/DropDown";
import { DatePicker } from "antd";
import { Field, Textarea } from "@fluentui/react-components";
// import Search from "../components/Search";
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
    const inputId = useId("input");
  const styles = useStyles();

  const largeId = useId("input-large");
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
