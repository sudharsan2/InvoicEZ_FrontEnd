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
        <div className="Approvebreadcrump" style={{ marginLeft: "3em" }}>
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
              marginLeft: "3em"

            }}
          >
            <h3 style={{ fontSize: "1.5em" }}>Open PO</h3>
          </div>
          <div
            style={{
              backgroundColor: "#F8FAFC",
              paddingBottom: "5px",
              marginRight: "20px",
              paddingTop: "10px",
              marginLeft: "3em",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: "1em",
                padding: "1em",
                marginLeft: "3em",
                marginRight: "1em",
              }}
            >
              <Input
                placeholder="PO Number"
                style={{
                  width: "200px", // Set consistent width
                  boxSizing: "border-box", // Ensure padding is included in width
                }}
              />
              <CreatableSelect
                className="basic-single"
                classNamePrefix="select"
                value={selectedStatus}
                onChange={handleStatusChange}
                options={statusOptions}
                styles={{
                  container: (provided) => ({
                    ...provided,
                    width: "200px", // Set consistent width
                  }),
                }}
                placeholder="PO Status"
                isClearable
              />
              <CreatableSelect
                className="basic-single"
                classNamePrefix="select"
                value={selectedType}
                onChange={handleTypeChange}
                options={typeOptions}
                styles={{
                  container: (provided) => ({
                    ...provided,
                    width: "200px", // Set consistent width
                  }),
                }}
                placeholder="PO Type"
                isClearable
              />
              <CreatableSelect
                className="basic-single"
                classNamePrefix="select"
                value={selectedsupplier}
                onChange={handlesupplierchange}
                options={supplieroptions}
                styles={{
                  container: (provided) => ({
                    ...provided,
                    width: "200px", // Set consistent width
                  }),
                }}
                onCreateOption={handleCreate}
                placeholder="Supplier Name"
                isClearable
              />
              <CreatableSelect
                className="basic-single"
                classNamePrefix="select"
                value={selectedOption}
                styles={{
                  container: (provided) => ({
                    ...provided,
                    width: "200px", // Set consistent width
                  }),
                }}
                onCreateOption={handleCreate}
                placeholder="Ship To"
                isClearable
              />
              <CreatableSelect
                className="basic-single"
                classNamePrefix="select"
                value={selectedOption}
                styles={{
                  container: (provided) => ({
                    ...provided,
                    width: "200px", // Set consistent width
                  }),
                }}
                onCreateOption={handleCreate}
                placeholder="Bill To"
                isClearable
              />
              <CreatableSelect
                className="basic-single"
                classNamePrefix="select"
                value={selectedOption}
                styles={{
                  container: (provided) => ({
                    ...provided,
                    width: "200px", // Set consistent width
                  }),
                }}
                onCreateOption={handleCreate}
                placeholder="Buyer Name"
                isClearable
              />
              <Input
                placeholder="Total Amount"
                style={{
                  width: "200px", // Set consistent width
                  boxSizing: "border-box",
                }}
              />
              <CreatableSelect
                className="basic-single"
                classNamePrefix="select"
                value={selectedOption}
                styles={{
                  container: (provided) => ({
                    ...provided,
                    width: "200px", // Set consistent width
                  }),
                }}
                onCreateOption={handleCreate}
                placeholder="Status"
                isClearable
              />
              <Input
                placeholder="PO Header ID"
                style={{
                  width: "200px", // Set consistent width
                  boxSizing: "border-box",
                }}
              />
              <Input
                placeholder="Vendor ID"
                style={{
                  width: "200px", // Set consistent width
                  boxSizing: "border-box",
                }}
              />
              <Input
                placeholder="Vendor Site ID"
                style={{
                  width: "200px", // Set consistent width
                  boxSizing: "border-box",
                }}
              />
              <Input
                placeholder="Vendor Number"
                style={{
                  width: "200px", // Set consistent width
                  boxSizing: "border-box",
                }}
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "20px",
                margin: "20px 0",
              }}
            >
              <Button
                style={{
                  backgroundColor: "#3570c3",
                  color: "white",
                  cursor: "pointer",
                  height: "35px",
                  width: "100px", // Consistent button width
                }}
              >
                Find
              </Button>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                  backgroundColor: Hovered2 ? "#e1e1e2" : "transparent",
                  padding: "6px 12px",
                  borderRadius: "4px",
                  cursor: "pointer",
                  marginRight: "20px"
                }}
                onMouseEnter={() => setIsHovered2(true)}
                onMouseLeave={() => setIsHovered2(false)}
              //   onClick={handleDeleteSelectedRows}
              >
                <DismissRegular
                  style={{
                    color: "#1281d7",
                    fontSize: "20px",
                    marginRight: "5px"
                  }}
                />
                <span
                  style={{
                    fontSize: "14px",
                    color: "#000",

                  }}
                >
                  Clear
                </span>
              </div>
            </div>
          </div>
        </div>
        <div style={{ width: "100%", height: "5vh" }} />
        <div style={{ display: 'flex', justifyContent: 'center', width: '90%', alignItems: "center", marginLeft: "3em" }}>
          <Divider style={{ marginTop: "22em" }} />
        </div>
        <div style={{ marginLeft: "3em", marginTop: "-2em" }}>
          <OpenPoTable status={selectedStatus} />
        </div>
      </div>
    </div>
  );
};

export default OpenPO;
