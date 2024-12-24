import React, { useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbDivider,
  BreadcrumbButton,
  Divider,
  Button
} from "@fluentui/react-components";
import CreatableSelect from "react-select/creatable";
import {
  CalendarMonthFilled,
  CalendarMonthRegular,
  bundleIcon,
  DismissRegular,
} from "@fluentui/react-icons";
import TagCounters from "../components/gridapprove";

import Search from "../components/Search";
import OpenPoTable from "../components/OpenPoTable";
import { makeStyles, useId, Input, Label } from "@fluentui/react-components";
// const CalendarMonth = bundleIcon(CalendarMonthFilled, CalendarMonthRegular);
const path = "/openpo";
const path1 = "/dashboard";


const useStyles = makeStyles({
  root: {

    display: "flex",
    flexDirection: "column",
    gap: "2px",
    maxWidth: "400px",
  },
});



const OpenPO = () => {
  const styles = useStyles();
  const [selectedOption, setSelectedOption] = useState(null);
  const [PONumberOPtions, setPONumberOPtions] = useState([]);
  const [Hovered2, setIsHovered2] = useState(false);
  const [selectedType, setSelectedType] = useState(null);
  const [selectedsupplier, setselectedsupplier] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [typeValue, setTypeValue] = useState("");





  const handleCreate = (inputValue) => {
    const newOption = { value: inputValue, label: inputValue };

    setPONumberOPtions((prevOptions) => [...prevOptions, newOption]);
    setSelectedOption(newOption);
  };

  const statusOptions = [
    { value: "Approved", label: "Approved" },
    { value: "In Process", label: "In Process" },
  ];

  const handleStatusChange = (newValue) => {
    setSelectedStatus(newValue);

  };

  const typeOptions = [
    { value: "Standard", label: "Standard" },
  ];

  const handleTypeChange = (newValue) => {
    setSelectedType(newValue);
    setTypeValue(newValue ? newValue.value : "");
  };

  const supplieroptions = [
    { value: "JOINT HEALTH CARE", label: "JOINT HEALTH CARE" },
    { value: "Medvin Group", label: "Medvin Group" },
    { value: "PROFRAMA SH.a.", label: "PROFRAMA SH.a." },
  ];

  const handlesupplierchange = (newValue) => {
    setselectedsupplier(newValue);
    setTypeValue(newValue ? newValue.value : "");
  };



  return (
    <div style={{ maxHeight: "91vh", overflowY: "auto" }}>
      <div style={{ height: "5vh" }}>
        <div className="Approvebreadcrump" >
          <Breadcrumb aria-label="Breadcrumb default example">
            <BreadcrumbItem>
              <BreadcrumbButton href={path1}>Home</BreadcrumbButton>
            </BreadcrumbItem>
            <BreadcrumbDivider />
            <BreadcrumbItem>
              <BreadcrumbButton href={path}>Open PO</BreadcrumbButton>
            </BreadcrumbItem>
            {/* <BreadcrumbDivider /> */}
          </Breadcrumb>
        </div>
      </div>
      <div>
        <div style={{ maxHeight: "10vh", }}>
          <div
            style={{
              display: "flex",
              justifyContent: "flexStart",
              padding: "1px",
              // marginLeft:"3em"
              
            }}
          >
            <h3 style={{ fontSize: "1.5em" }}>Open PO</h3>
          </div>
         
                </div>
        <div style={{ width: "100%", height: "5vh" }} />
        <div style={{ display: 'flex', justifyContent: 'center' ,width: '90%',alignItems:"center",marginLeft:"3em"}}>
      {/* <Divider style={{ marginTop:"22em"}} /> */}
    </div>
        <div style={{marginTop:"-2em"}}>
          <OpenPoTable />
        </div>
      </div>
    </div>
  );
};

export default OpenPO;
