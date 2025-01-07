import React, { useState } from "react";
import LineChartPage from "../components/Linechart";
import InvoiceStatusPieChart from "../components/piechart";


import {
    Hamburger,
    NavDrawer,
    NavDrawerBody,
    NavDrawerHeader,
    NavItem,
} from "@fluentui/react-nav-preview";

import {
    Tooltip,
    makeStyles,
    tokens,
} from "@fluentui/react-components";
import SankeyChart from "./SankeyChart";
import CalendarComponent from "./calendar";
import { Space } from "antd";
import Column from "antd/es/table/Column";
const useStyles = makeStyles({
    root: {
        // overflow: "hidden",
        display: "flex",
        height: "600px",
    },
    content: {
        flex: "1",
        padding: "16px",
        display: "grid",
        justifyContent: "flex-start",
        alignItems: "flex-start",
    },
    field: {
        display: "flex",
        marginTop: "4px",
        marginLeft: "8px",
        flexDirection: "column",
        gridRowGap: tokens.spacingVerticalS,
    },
});


const containerStyle = {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",

    // justifyContent: "space-around",
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
    marginTop:"-20px"
});

const labelStyle = {
    fontSize: "14px",
    fontWeight: "normal",
    marginBottom: "5px",
    marginTop:"-20px"


};

const valueStyle = {
    fontSize: "28px",
    fontWeight: "bold",
    color: "#333",
    marginLeft: "0px",
    marginTop:"0px"

};



const DashboardNav = () => {
    const styles = useStyles();
    const [isOpen, setIsOpen] = useState(true);
    const [selectedItem, setSelectedItem] = useState("Live Count");

    // Define your navigation items
    const navItems = ["Live Count", "To-Do Count", "PO Calendar", "Others"];


    const counters = [
        { label: "Dashboard", value: "PO Calendar", color: "#1f497d" },
        {
            label: "Open Pos",
            // value: jsonData["LineItemsMatchingCount"],
            color: "#d21994",
        } // Cyan
    ];


    const renderContent = () => {
        switch (selectedItem) {
            case "Live Count":
                return <div>{<SankeyChart />}</div>;
            case "To-Do Count":
                return <div>To-Do Count Content</div>;
            case "PO Calendar":
                return <div>
                    <div style={containerStyle}>
                        {counters.map((item, index) => (
                            <div style={itemStyle} key={index}>
                                <div style={lineStyle(item.color)} />
                                <div>
                                    <div style={labelStyle}>{item.label}</div>
                                    <div
                                        style={{
                                            ...valueStyle,
                                            color: "#1f497d",
                                            fontSize: "18px",
                                            fontWeight: "bold",
                                            textAlign: "left"
                                        }}
                                    >
                                        {item.value}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {<CalendarComponent />}
                </div>;
            case "Others":
                return <div style={{
                    display: "flex",
                  //   gridTemplateColumns: "repeat(2, 1fr)", 
                     //gap: "20px", 
                  flexDirection:"column",
                  flexWrap:"wrap",
                  alignContent:"space-between"
                  
                  }}> 
                    
                <LineChartPage/>
                
               
                <InvoiceStatusPieChart />
              
              </div>;
            default:
                return <div>Select an item from the navigation</div>;
        }
    };

    const renderHamburgerWithToolTip = () => {
        return (
            <Tooltip content="Navigation" relationship="label">
                <Hamburger onClick={() => setIsOpen(!isOpen)} />
            </Tooltip>
        );
    };

    return (
        <div className={styles.root}>
            <NavDrawer
                defaultSelectedValue={0}
                open={isOpen}
                style={{ backgroundColor: "#fff" }}
            >
                <NavDrawerHeader>{renderHamburgerWithToolTip()}</NavDrawerHeader>

                <NavDrawerBody>
                    {navItems.map((item, index) => (
                        <NavItem
                            key={index}
                            value={index}
                            style={{
                                backgroundColor: selectedItem === item ? "#e0e0e0" : "#fff",
                                cursor: "pointer",
                                maxWidth: "200px",
                            }}
                            onClick={() => setSelectedItem(item)} // Update selected item
                        >
                            {item}
                        </NavItem>
                    ))}
                </NavDrawerBody>
            </NavDrawer>
            <div className={styles.content}>
                {renderContent()} {/* Render content based on selected item */}
            </div>
        </div>
    );
};

export default DashboardNav;
