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
import { Add28Regular } from "@fluentui/react-icons";
import DatePickerComponent from "../components/DatePicker";
import { MdOutlineFilterAltOff } from "react-icons/md";
import { makeStyles, useId, Input, Label } from "@fluentui/react-components";
import {
  Popover,
  PopoverSurface,
  PopoverTrigger,
  Button,
} from "@fluentui/react-components";
import DropDown from "../components/DropDown";
import { DatePicker } from "antd";
import { Field, Textarea } from "@fluentui/react-components";

const useStyles = makeStyles({
    root: {
    
      display: "flex",
      flexDirection: "column",
     
      gap: "2px",
      
      maxWidth: "400px",
    },
  });




  

  
const QuotationDrawerPage = () => {
    const inputId = useId("input");
  const styles = useStyles();

  const largeId = useId("input-large");
  return (
    <div style={{ maxHeight: "91vh", overflowY: "auto" }}>
        <div style={{padding:"2em"}}>
            <h2>Comments</h2>
            <h3 style={{fontWeight:"normal"}}> Enter Your commands</h3>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", width: "50%", gap: "2em" ,marginLeft:"2em"}}>
  <div style={{ display: "flex", flexDirection: "column", flex: "1 1 30%", maxWidth: "30%" }}>
    <span style={{ marginBottom: "10px" }}>Price</span>
    <Input />
  </div>
  
  <div style={{ display: "flex", flexDirection: "column", flex: "1 1 30%", maxWidth: "30%" }}>
    <span style={{ marginBottom: "10px" }}>Freight term</span>
    <DropDown />
  </div>
  
  <div style={{ display: "flex", flexDirection: "column", flex: "1 1 30%", maxWidth: "30%" }}>
    <span style={{ marginBottom: "10px" }}>Delivery Schedule</span>
    <DatePickerComponent />
  </div>
  
  <div style={{ display: "flex", flexDirection: "column", flex: "1 1 30%", maxWidth: "30%" }}>
    <span style={{ marginBottom: "10px" }}>Payment Term</span>
    <Input />
  </div>
</div>
<div style={{marginLeft:"2em",marginTop:"3em"}}>
        <Label size="large" style={{fontWeight:"normal",marginBottom: "10px"}}>
          Remarks
        </Label>
        <Field style={{width:"80%"}}>
        <Textarea size="large" id={largeId} />
        </Field>
       
      </div>
     
     <div style={{display:"flex",justifyContent:"flex-end",padding:"6em",marginTop:"2em"}}>
        <Button style={{color:"white",backgroundColor:"#3d98de"}}>Submit</Button>
     </div>
      
    </div>
  );
};

export default QuotationDrawerPage;
