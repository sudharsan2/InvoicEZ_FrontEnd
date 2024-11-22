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
    const inputId = useId("input");
  const styles = useStyles();

  const largeId = useId("input-large");
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
