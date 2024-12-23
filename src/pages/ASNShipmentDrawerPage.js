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
import {  TabList, Tab ,Input} from "@fluentui/react-components";
import { tokens, Divider } from "@fluentui/react-components";
import { Add28Regular,ArrowLeft24Regular,Document24Regular,ArrowUpload24Regular,  } from "@fluentui/react-icons";
import DatePickerComponent from "../components/DatePicker";
import { MdOutlineFilterAltOff } from "react-icons/md";
import {
  Popover,
  PopoverSurface,
  PopoverTrigger,
  Button,
  makeStyles,
} from "@fluentui/react-components";
// import DropDown from "../components/DropDown";
import { DatePicker } from "antd";
import {useNavigate} from "react-router-dom";
const path = "/asn";
const path1 = "http://localhost:3000/";




const containerStyle = {
  width: "100%",
  display: "flex",
  gap: "3em",
  padding: "8px",
  marginLeft: "0em",
};

const itemStyle = {
  display: "flex",
  alignItems: "flex-start",
};

const lineStyle = (color) => ({
  width: "3px",
  height: "50px",
  backgroundColor: color,
  marginRight: "12px",
});

const labelStyle = {
  fontSize: "14px",
  fontWeight: "normal",
  marginBottom: "10px",
};

const valueStyle = {
  fontSize: "28px",
  fontWeight: "bold",
  color: "#333",
  marginLeft: "0px",
};

const buttonContainerStyle = {
  display: "flex",
  justifyContent: "flex-start",
  padding: "16px 0",
};

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
    const togglePopover = () => setPopoverOpen(!popoverOpen);
 const styles = useStyles();
  const counters = [
    { label: "Generate ASN Number", value: <span style={{ color: "#d62727" }}>2</span>, color: "#d62727" },
    
  ];
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
