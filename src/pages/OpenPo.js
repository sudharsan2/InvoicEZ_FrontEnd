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
    const handleCreate = (inputValue) => {
        const newOption = { value: inputValue, label: inputValue };
    
        setPONumberOPtions((prevOptions) => [...prevOptions, newOption]);
        setSelectedOption(newOption); 
      };
  return (
    <div style={{maxHeight:"91vh",overflowY:"auto"}}>
      <div style={{ height: "5vh" }}>
        <div className="Approvebreadcrump" style={{marginLeft:"3em"}}>
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
        <div style={{ maxHeight: "10vh",}}>
          <div
            style={{
              display: "flex",
              justifyContent: "flexStart",
              padding: "1px",
              marginLeft:"3em"
              
            }}
          >
            <h3 style={{ fontSize: "1.5em" }}>Open PO</h3>
          </div>
          <div style={{backgroundColor: "#F8FAFC",paddingBottom:"5px",marginRight:"20px",paddingTop:"10px",marginLeft:"3em"}}>

          <div 
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)", 
            gap: "1em", 
            padding: "1em", 
            marginLeft: "3em",
            marginRight:"1em"
          }}
          >
          <Input placeholder="PO_number" style={{width:"65%"}}/>
          <CreatableSelect
                  className="basic-single"
                  classNamePrefix="select"
                  value={selectedOption}
                //   onChange={handleChange}
                  name="po_number"
                //   options={PONumberOPtions}
                  styles={{
                    container: (provided) => ({ ...provided, width: 200 }),
                    marginTop: "20px",
                  }}
                  onCreateOption={handleCreate}
                  placeholder="PO Status"
                  isClearable
                />


                <CreatableSelect
                  className="basic-single"
                  classNamePrefix="select"
                  value={selectedOption}
                //   onChange={handleChange}
                  name="po_number"
                //   options={PONumberOPtions}
                  styles={{
                    container: (provided) => ({ ...provided, width: 200 }),
                    marginTop: "20px",
                  }}
                  onCreateOption={handleCreate}
                  placeholder="PO Type"
                  isClearable
                />

                <CreatableSelect
                  className="basic-single"
                  classNamePrefix="select"
                  value={selectedOption}
                //   onChange={handleChange}
                  name="po_number"
                //   options={PONumberOPtions}
                  styles={{
                    container: (provided) => ({ ...provided, width: 200 }),
                    marginTop: "20px",
                  }}
                  onCreateOption={handleCreate}
                  placeholder="Supplier Name"
                  isClearable
                />

<CreatableSelect
                  className="basic-single"
                  classNamePrefix="select"
                  value={selectedOption}
                //   onChange={handleChange}
                  name="po_number"
                //   options={PONumberOPtions}
                  styles={{
                    container: (provided) => ({ ...provided, width: 200 }),
                    marginTop: "20px",
                  }}
                  onCreateOption={handleCreate}
                  placeholder="Ship To"
                  isClearable
                />

<CreatableSelect
                  className="basic-single"
                  classNamePrefix="select"
                  value={selectedOption}
                //   onChange={handleChange}
                  name="po_number"
                //   options={PONumberOPtions}
                  styles={{
                    container: (provided) => ({ ...provided, width: 200 }),
                    marginTop: "20px",
                  }}
                  onCreateOption={handleCreate}
                  placeholder="Bill To"
                  isClearable
                />

<CreatableSelect
                  className="basic-single"
                  classNamePrefix="select"
                  value={selectedOption}
                //   onChange={handleChange}
                  name="po_number"
                //   options={PONumberOPtions}
                  styles={{
                    container: (provided) => ({ ...provided, width: 200 }),
                    marginTop: "20px",
                  }}
                  onCreateOption={handleCreate}
                  placeholder="Buyer Name"
                  isClearable
                />

                
                <Input placeholder="Total Amount" style={{width:"65%"}}/>
                <CreatableSelect
                  className="basic-single"
                  classNamePrefix="select"
                  value={selectedOption}
                //   onChange={handleChange}
                  name="po_number"
                //   options={PONumberOPtions}
                  styles={{
                    container: (provided) => ({ ...provided, width: 200 }),
                    marginTop: "20px",
                  }}
                  onCreateOption={handleCreate}
                  placeholder="Status"
                  isClearable
                />
                <Input placeholder="PO Header ID" style={{width:"65%"}}/>
                <Input placeholder="Vendor ID" style={{width:"65%"}}/>
                <Input placeholder="Vendor Site ID" style={{width:"65%"}}/>
                <Input placeholder="Vendor Number" style={{width:"65%"}}/>
                

          </div>
          <div style={{display:"flex",justifyContent:"flex-end",width:"50%",gap:"20px",marginLeft:"40em",marginBottom:"20px"}}>
                <Button style={{backgroundColor:"#3570c3",color:"white",cursor:"pointer",padding:"2px",height:"35px",width:"10%"}} >Find</Button>
                <Button style={{backgroundColor:"#3570c3",color:"white",cursor:"pointer",padding:"2px",height:"35px",width:"10%"}} >Clear</Button>
                </div>
 

          </div>
                 </div>
        <div style={{ width: "100%", height: "5vh" }} />
        <div style={{ display: 'flex', justifyContent: 'center' ,width: '90%',alignItems:"center",marginLeft:"3em"}}>
      <Divider style={{ marginTop:"21em"}} />
    </div>
        <div style={{marginLeft:"3em",marginTop:"-2em"}}>
          <OpenPoTable />
        </div>
      </div>
    </div>
  );
};

export default OpenPO;
