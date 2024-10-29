import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbDivider,
  BreadcrumbButton,
} from "@fluentui/react-components";
import {KeyMultipleRegular } from "@fluentui/react-icons"
import {  useId, Input, Label } from "@fluentui/react-components";
import  { useMemo } from 'react';

import {
    makeStyles,
    Button,
    Link,
    
    TabList,
    Tab,
    Table,
    TableCell,
    TableHeader,
    TableSelectionCell,
    TableRow,
    TableBody,
    TableHeaderCell,
    createTableColumn,
    useTableFeatures,
    useTableSort,
  } from "@fluentui/react-components";
import ApproveTable from "../components/approvetable";
import Search from "../components/Search"; 
import TagCounters from "../components/gridapprove";
import { FaRegCopy } from "react-icons/fa";
import  { useState, useCallback } from "react";
// import  { Calendar, DateRangeType } from "@fluentui/react-calendar-compat";
import { Calendar, DateRangeType } from "@fluentui/react";
import { DatePicker } from "@fluentui/react";
import { Field} from "@fluentui/react-components";
const path = "/admin";
const path1 = "http://localhost:3000/";
const path3 ="/matrimony"
// Grid
const counters = [
    { label: "Page Processed", value: 1556, color: "green" }, // Cyan
    { label: "Tokens Spent", value: 2, color: "#d62727" }, // Red
    { label: "Current Storage", value: 9, color: "#1f497d" }, // Dark Blue
    { label: "Document Sucess", value: 4, color: "#d21994" }, // Magenta
   
  ];
  const values = [
    { label: "User", value: "matrimony.com", color: "#00bfbf" }, // Cyan
    { label: "Invoice Processed", value: 1045, color: "#d62727" }, // Red
    
   
  ];

  const containerStyle = {
    width: "100%",
    display: "flex",
    justifyContent: "space-around",
    padding: "8px",
    marginLeft:"-8em"
  };
  const containerStyle2 = {
    
    width: "100%",
    display: "flex",
    justifyContent: "flex-start",
    padding: "8px",
    gap:"9em",
    marginLeft:"0.8em",
    marginBottom:"1em"

  };

  const itemStyle = {
    display: "flex",
    alignItems: "center",
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
    marginBottom:"10px"
  };

  const calendar = {
    color:"black !imporatant",
  }

  const valueStyle = {
    fontSize: "28px", 
    fontWeight: "bold",
    color: "#333", 
    marginLeft: "6px", 
  };


  const useStyles = makeStyles({
    root: {
      // width: "77vw",
      // height: "100vh",
      // display: "flex",
      // flexDirection: "column",
    },
    control: {
        maxWidth: "300px",
      },
    inputContainer: {
        position: "relative",
        display: "flex",
        alignItems: "center",
        width: "100%",
        marginRight:"10px"
      },
      inputWithIcon: {
        backgroundColor: "#e6e6e6",
        paddingRight: "30px", // Space for the icon inside the input
        flex: 1,
      },
      icon: {
        position: "absolute",
        marginLeft: "19.5em", // Positioning the icon inside the input
        cursor: "pointer",
        color: "#555",
        marginTop:"10px"
      },
  
    header: {
      padding: "20px",
    },
    input: {
        display: "flex",
        flexDirection: "row",
        gap: "2px",
        maxWidth: "400px",
        marginRight:"10px"
        
      },
    content1: {
      overflowY: "auto",
      paddingTop: "3vh",
      padding: "0 20px",
      maxHeight: "35vh",
    },
    wrapper: {
        display: "flex",
        flexDirection:"column",
        width:"8%",
       
        
      },
    content2: {
      width: "77vw",
      overflowY: "auto",
      // paddingTop: "3vh",
      padding: "0 20px",
  
      // maxHeight: "48vh",
    },
    controls: {
      display: "flex",
      gap: "20px",
      marginBottom: "20px",
    },
    container: {
      display: "grid",
      gap: "15px",
      fontFamily: "Arial, sans-serif",
    },
    section: {
      display: "flex",
      flexDirection: "column",
      gap: "10px",
      marginLeft: "0vw",
    },
    section2: {
      display: "flex",
      flexDirection: "column",
      gap: "10px",
      marginLeft: "7vw",
    },
    gridTemplate1: {
      gridTemplateColumns: "1fr 1fr",
      gridTemplateAreas: `
        "nameAndId managerInfo"
        "name empid"
        "email doj"
        "status dos"
        "role appraisal"
        "dept totalExperience"
        "editDetails focusRExperience"
      `,
    },
    heading: {
      fontWeight: "bold",
    },
    content: {
      fontSize: "13px",
      marginLeft: "10px",
    },
  });
const Matrimony = () => {
    
   


    const [selectedtab, setSelectedTab] = React.useState("tab1");
    const handleTabSelect2 = (event, data) => {
        // console.log({"currentmonth":currentMonthEmployees})
        setSelectedTab(data.value);
      };
      const styles = useStyles();
      const themestate = false;
      const inputId = useId("input");
    //   copy to cliboard
    const handleCopy = () => {
        // navigator.clipboard.writeText(inputValue);
        // alert("Copied to clipboard!");
      };
  const [selectedDateRange, setSelectedDateRange] = useState();
  const [selectedDate, setSelectedDate] = useState();

  const onSelectDate = useCallback((date, selectedDateRangeArray) => {
    setSelectedDate(date);
    setSelectedDateRange(selectedDateRangeArray);
  }, []);

  let dateRangeString = "Not set";
  if (selectedDateRange) {
    const rangeStart = selectedDateRange[0];
    const rangeEnd = selectedDateRange[selectedDateRange.length - 1];
    dateRangeString = rangeStart.toDateString() + " - " + rangeEnd.toDateString();
  }
  return (
    <div>
        {/* First Part */}
            <div>
                <div style={{display:"flex",flexDirection:"row",justifyContent:"space-between"}}>
                <div className="Approvebreadcrump">
        <Breadcrumb aria-label="Breadcrumb default example">
          <BreadcrumbItem>
            <BreadcrumbButton href={path1}>Home</BreadcrumbButton>
          </BreadcrumbItem>
          <BreadcrumbDivider />
          <BreadcrumbItem>
            <BreadcrumbButton href={path}>Control Center</BreadcrumbButton>
          </BreadcrumbItem>
          <BreadcrumbDivider />
          <BreadcrumbItem>
            <BreadcrumbButton href={path3}>Matrimony.com</BreadcrumbButton>
          </BreadcrumbItem>
        </Breadcrumb>

      </div>
      <div style={{display:"flex",flexDirection:"column"}}>
      {/* <Field label="Select a date"> */}
      {/* <DatePicker
        allowTextInput
        placeholder="Select a date..."
        className={styles.control}
      /> */}
      {/* ----------------------- */}
      {/* <div>Selected date: {selectedDate ? selectedDate.toDateString() : "Not set"}</div>
      <div>Selected range: {dateRangeString}</div> */}
      <Calendar
        dateRangeType={DateRangeType.Month}
        showGoToToday
        highlightSelectedMonth
        isDayPickerVisible={false}
        onSelectDate={onSelectDate}
        value={selectedDate}
        
      />
    {/* </Field> */}
        <Button appearance="primary" style={{color:"fff",marginLeft:"7em"}} className={styles.wrapper}>
        Pause
      </Button>
      </div>

                </div>
            
      <div style={{ display: "flex", justifyContent: "flexStart", padding: "1px" ,marginTop:"-15em"}}>
        <h3 style={{ fontSize: "1.5em", marginLeft: "5px" }}>Usage for Oct's 2024</h3>
      </div>
      <div>
        {/* First Tag counter */}
      <div style={containerStyle2}>
        {values.map((item, index) => (
          <div style={itemStyle} key={index}>
            <div style={lineStyle(item.color)} />
            <div>
              <div style={labelStyle}>{item.label}</div>
              <div style={valueStyle}>{item.value}</div>
            </div>
          </div>
        ))}
      </div>
      {/* Second Tag counters */}
      <div style={containerStyle}>
        {counters.map((item, index) => (
          <div style={itemStyle} key={index}>
            <div style={lineStyle(item.color)} />
            <div>
              <div style={labelStyle}>{item.label}</div>
              <div style={valueStyle}>{item.value}</div>
            </div>
          </div>
        ))}
      </div>
        
      </div>
      
        
      

        </div>
      

      {/* ------------------------------Second Part------------------------------------------- */}
      {/* Keys */}
     <div>
        <div style={{display:"flex",justifyContent:"flex-start",marginTop:"2em"}}>
        <h3 style={{gap:"10px",marginLeft:"1em"}}> <KeyMultipleRegular /> Keys</h3>
        </div>
        {/* Tablist */}
        <div>
        <TabList
              defaultSelectedValue="tab1"
              appearance="subtle"
              onTabSelect={handleTabSelect2}
              style={{
                marginLeft: "0vw",
                marginTop: "0vh",
                paddingBottom: "2vh",
                borderBottom: "1px solid rgb(200,200,200)",
              }}
            >
              <Tab
                value="tab1"
                className={themestate ? "tab dark drawer" : "tab"}
                style={{ border: "1px solid transparent" }}
              >
                LLM
              </Tab>
              <Tab
                value="tab2"
                className={themestate ? "tab dark drawer" : "tab"}
                style={{ border: "1px solid transparent" }}
              >
                Cloud
              </Tab>
              {/* <Tab
              value="tab3"
              className={themestate ? "tab dark drawer" : "tab"}
              style={{ border: "1px solid transparent" }}
            >
              PO
            </Tab>
            <Tab
              value="tab4"
              className={themestate ? "tab dark drawer" : "tab"}
              style={{ border: "1px solid transparent" }}
            >
              Supplier
            </Tab> */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "10px",
                  fontSize: "17px",
                  marginLeft: "auto",
                  alignItems: "center",
                  cursor: "pointer",
                }}
              >
                {/* <ArrowDownload28Regular
                  style={{ color: "#1281d7" }}
                //   onClick={handleViewInvoice}
                />{" "} */}
                {/* <span onClick={handleViewInvoice}> View Invoice</span> */}
              </div>
            </TabList>
           {/* Tabs start */}
            <div>
            {selectedtab === "tab1" && (
            <div style={{ marginTop: "20px" }}>
                {/* API Key */}
                <div style={{marginLeft:"1.5em"}}>
                    <h3 style={{fontSize:"20px",fontWeight:"Normal",fontFamily:"Segoe UI"}}>API Key</h3>
                    <div className={styles.input} >
                    <Input
                    id={inputId}
                    // value={inputValue}
                    // onChange={(e) => setInputValue(e.target.value)}
                    className={styles.inputWithIcon}/>
        <FaRegCopy className={styles.icon} onClick={handleCopy} />
        <Button style={{marginLeft:"10px",color:"gray",borderColor:"black"}}>Hide</Button>
                    </div>
                    
                </div>

                {/* Model */}

                <div style={{marginLeft:"1.5em"}}>
                    <h3 style={{fontSize:"20px",fontWeight:"Normal",fontFamily:"Segoe UI"}}>Model</h3>
                    <div className={styles.input} >
                    <Input
                    id={inputId}
                    // value={inputValue}
                    // onChange={(e) => setInputValue(e.target.value)}
                    className={styles.inputWithIcon}/>
        <FaRegCopy className={styles.icon} onClick={handleCopy} />
        <Button style={{marginLeft:"10px",color:"gray",borderColor:"black"}} >Hide</Button>

                    </div>
                    
                </div>
             
              
            </div>
          )}

          {selectedtab === "tab2" && (
  <div
  style={{
    width: "100%",
    display: "flex",
    flexWrap: "wrap",
    overflowY: "auto",
    height: "40vh",
    marginTop: "10px",
  }}
>
  {/* Storage Account Name */}
  <div style={{ flex: "1 1 45%", margin: "10px", }}>
    <h2 style={{fontWeight:"normal",fontFamily:"Segoe UI",fontSize:"20px"}}>Storage Account Name</h2>
    <div className={styles.input}>
      <Input
        id={inputId}
        className={styles.inputWithIcon}
      />
      <FaRegCopy className={styles.icon} onClick={handleCopy} />
      <Button style={{marginLeft:"10px",color:"gray",borderColor:"black"}}>Hide</Button>
    </div>
  </div>

  {/* Container Name */}
  <div style={{ flex: "1 1 45%", margin: "10px" }}>
    <h2 style={{fontWeight:"normal",fontFamily:"Segoe UI",fontSize:"20px"}}>Container Name</h2>
    <div className={styles.input}>
      <Input
        id={inputId}
        className={styles.inputWithIcon}
      />
      <FaRegCopy className={styles.icon} onClick={handleCopy} />
      <Button style={{marginLeft:"10px",color:"gray",borderColor:"black"}}>Hide</Button>
    </div>
  </div>

  {/* Key */}
  <div style={{ flex: "1 1 45%", marginLeft: "10px", marginTop: "-20px"}}>
    <h2 style={{fontWeight:"normal",fontFamily:"Segoe UI",fontSize:"20px"}}>Key</h2>
    <div className={styles.input}>
      <Input
        id={inputId}
        className={styles.inputWithIcon}
      />
      <FaRegCopy className={styles.icon} onClick={handleCopy} />
      <Button style={{marginLeft:"10px",color:"gray",borderColor:"black"}}>Hide</Button>
    </div>
  </div>

  {/* Connection String */}
  <div style={{ flex: "1 1 45%", marginLeft: "10px", marginTop: "-20px", }}>
    <h2 style={{fontWeight:"normal",fontFamily:"Segoe UI",fontSize:"20px"}}>Connection String</h2>
    <div className={styles.input}>
      <Input
        id={inputId}
        className={styles.inputWithIcon}
      />
      <FaRegCopy className={styles.icon} onClick={handleCopy} />
      <Button style={{marginLeft:"10px",color:"gray",borderColor:"black"}}>Hide</Button>
    </div>
  </div>
</div>

          )}
                </div>
            
{/* Tabs end */}
        </div> 
       

        
        

     </div>
    </div>
  );
};

export default Matrimony;
