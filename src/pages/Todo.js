




import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbDivider,
  BreadcrumbButton,
} from "@fluentui/react-components";

import TodoTable from "../components/TodoTable";
import DropDown from "../components/DropDown";
import { refreshActions } from "../Store/Store";
import { useDispatch} from "react-redux";

import { useNavigate } from "react-router-dom";
const path = "/inloop";
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

const TodoPage = ({data,onSubmit }) => {
  const navigate = useNavigate();

  const  dispatch = useDispatch();
  const counters = [
    
    {
      label: "Requestor",
      value: (
        <span style={{ color: "#004378" }}>{data.lines[0].requestor}</span>
      ),
      color: "#004378",
    },
    {
      label: "PR Number",
      value: <span style={{ color: "#00a2ad" }}>{data.document_number}</span>,
      color: "#00a2ad",
    },
  ];
  
    
   
  
  return (
    <div style={{ maxHeight: "91vh", overflowY: "auto" }}>
      <div
        style={{
          height: "5vh",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <div className="Approvebreadcrump">
          <Breadcrumb aria-label="Breadcrumb default example">
            <BreadcrumbItem>
              <BreadcrumbButton href={path1}>Home</BreadcrumbButton>
            </BreadcrumbItem>
            <BreadcrumbDivider />
            <BreadcrumbItem>
              <BreadcrumbButton href={path}>PR</BreadcrumbButton>
            </BreadcrumbItem>
            <BreadcrumbDivider />
            <BreadcrumbItem>
              <BreadcrumbButton href={path}>
                Supplier Selection
              </BreadcrumbButton>
            </BreadcrumbItem>
          </Breadcrumb>
        </div>
        <div style={{ padding: "2.5em" }}>
          <DropDown />
        </div>
      </div>

      <div>
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

        <div style={{ height: "5vh", marginTop: "4em" }} />
        <TodoTable data={data} />
      </div>

      <div style={buttonContainerStyle}>
      <button 
    style={{ color: "#0078d5", border: "none", backgroundColor: "white" }} 
    onClick={() => {
        navigate('/inloop')
        onSubmit();
        dispatch(refreshActions.handleMessageNotify());
    }}
>
    Submit
</button>
      </div>
    </div>
  );
};

export default TodoPage;

