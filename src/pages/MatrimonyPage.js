import React, { useEffect } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbDivider,
  BreadcrumbButton,
} from "@fluentui/react-components";
import { KeyMultipleRegular } from "@fluentui/react-icons";
import { useId, Input, Label } from "@fluentui/react-components";
import { useMemo } from "react";

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
import { useState, useCallback } from "react";
// import  { Calendar, DateRangeType } from "@fluentui/react-calendar-compat";
import { Calendar, DateRangeType } from "@fluentui/react";
import { notification } from "antd";
import { DatePicker } from "@fluentui/react";
import { Field } from "@fluentui/react-components";
const path = "/admin";
const path1 = "http://localhost:3000/";
const path3 = "/matrimony";
// Grid
const counters = [
  { label: "Page Processed", value: 1556, color: "green" }, // Cyan
  { label: "Tokens Spent", value: 2, color: "#d62727" }, // Red
  { label: "Blob Storage Usage", value: 9, color: "#1f497d" }, // Dark Blue
  { label: "Direct Approval", value: 4, color: "#d21994" }, // Magenta
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
  marginLeft: "-8em",
};
const containerStyle2 = {
  width: "100%",
  display: "flex",
  justifyContent: "flex-start",
  padding: "8px",
  gap: "9em",
  marginLeft: "0.8em",
  marginBottom: "1em",
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
  marginBottom: "10px",
};

const calendar = {
  color: "black !imporatant",
};

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
    marginRight: "10px",
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
    marginTop: "10px",
  },

  header: {
    padding: "20px",
  },
  input: {
    display: "flex",
    flexDirection: "row",
    gap: "2px",
    maxWidth: "400px",
    marginRight: "10px",
  },
  content1: {
    overflowY: "auto",
    paddingTop: "3vh",
    padding: "0 20px",
    maxHeight: "35vh",
  },
  wrapper: {
    display: "flex",
    flexDirection: "column",
    width: "8%",
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
    dateRangeString =
      rangeStart.toDateString() + " - " + rangeEnd.toDateString();
  }

  // GET LLM
  const [apiKey, setApiKey] = useState("");
  const [model, setModel] = useState("");
  const [storage, setStorage] = useState("");
  const [container, setContainer] = useState("");
  const [key, setKey] = useState("");
  const [connnection, setConnection] = useState("");
  const [loading, setLoading] = useState(true);

  const inputId = "input"; // Define your input id if needed

  const handleCopy = () => {
    navigator.clipboard.writeText(apiKey);
    notification.success({
      message: "Message Copied to Clibboard",
    });
  };

  const fetchLLMDetails = async () => {
    try {
      const response = await fetch("http://172.235.21.99:57/user/llm-detail");
      const data = await response.json(); // Parse the JSON response

      if (data && data.llm_apikey && data.llm_model) {
        setApiKey(data.llm_apikey);
        setModel(data.llm_model);
      }

      console.log("LLM API Key:", data.llm_apikey);
      console.log("LLM Model:", data.llm_model);
    } catch (error) {
      console.error("Error fetching LLM details:", error);
    } finally {
      setLoading(false); // Set loading to false after fetch
    }
  };

  const fetchAzureDetails = async () => {
    try {
      const response = await fetch("http://172.235.21.99:57/user/azure-detail");
      const data = await response.json();
      if (data) {
        setStorage(data.storage_account_name);
        setContainer(data.container_name);
        setKey(data.azure_key);
        setConnection(data.connection_string);
      }
      console.log("sdfghj-------", data.storage_account_name);
    } catch (error) {
      console.error("Error fetching LLM details:", error);
      // console.log("sdfghj-------",data[0].llm_apikey);
    } finally {
      setLoading(false); // Set loading to false after fetch
    }
  };

  // PUT API --->LLM
  const handleUpdate = async (field, value) => {
    try {
      if (field === "llm_apikey") {
        setApiKey(value);
      } else if (field === "llm_model") {
        setModel(value);
      }

      const body = {
        llm_apikey: apiKey,
        llm_model: model,
      };

      body[field] = value;

      console.log("Payload:", JSON.stringify(body)); // Log payload for verification

      const response = await fetch("http://172.235.21.99:57/user/llm-detail", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const errorDetails = await response.json();
        console.error("Error details:", errorDetails);
        throw new Error(`Failed to update details: ${response.statusText}`);
      }

      const result = await response.json();
      console.log("Update successful:", result);
      notification.success({
        message: "Updated Successfully",
      });
    } catch (error) {
      console.error("Error updating details:", error);
      notification.error({
        message: "Error while updating the LLM details!!",
      });
    }
  };

  // PUT API ---> Azure

  const handleAzureUpdate = async (field, value) => {
    try {
      if (field === "azure_key") {
        setKey(value);
      } else if (field === "connection_string") {
        setConnection(value);
      } else if (field === "container_name") {
        setContainer(value);
      } else if (field === "storage_account_name") {
        setStorage(value);
      }

      const body = {
        azure_key: key,
        connection_string: connnection,
        container_name: container,
        storage_account_name: storage,
      };

      body[field] = value;

      console.log("Payload:", JSON.stringify(body));

      const response = await fetch(
        "http://172.235.21.99:57/user/azure-detail",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        },
      );

      if (!response.ok) {
        const errorDetails = await response.json();
        console.error("Error details:", errorDetails);
        throw new Error(`Failed to update details: ${response.statusText}`);
      }

      const result = await response.json();
      console.log("Update successful:", result);
      notification.success({
        message: "Azure details updated successfully",
      });
    } catch (error) {
      console.error("Error updating Azure details:", error);
      notification.error({ message: "Error while updating azure details" });
    }
  };

  useEffect(() => {
    fetchLLMDetails();
    fetchAzureDetails();
  }, []);

  return (
    <div>
      {/* First Part */}
      <div>
        <div
          style={{
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
                <BreadcrumbButton href={path3}>Control Center</BreadcrumbButton>
              </BreadcrumbItem>
              <BreadcrumbDivider />
              <BreadcrumbItem>
                <BreadcrumbButton href={path3}>Matrimony.com</BreadcrumbButton>
              </BreadcrumbItem>
            </Breadcrumb>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
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
            <Button
              appearance="primary"
              style={{ color: "fff", marginLeft: "7em" }}
              className={styles.wrapper}
            >
              Pause
            </Button>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "flexStart",
            padding: "1px",
            marginTop: "-15em",
          }}
        >
          <h3 style={{ fontSize: "1.5em", marginLeft: "5px" }}>
            Usage for Oct's 2024
          </h3>
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
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            marginTop: "2em",
          }}
        >
          <h3 style={{ gap: "10px", marginLeft: "1em" }}>
            {" "}
            <KeyMultipleRegular /> Keys
          </h3>
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
                <div style={{ marginLeft: "1.5em" }}>
                  <h3
                    style={{
                      fontSize: "20px",
                      fontWeight: "Normal",
                      fontFamily: "Segoe UI",
                    }}
                  >
                    API Key
                  </h3>
                  <div className={styles.input}>
                    <Input
                      id={inputId}
                      value={apiKey} // Use fetched API Key
                      onChange={(e) => setApiKey(e.target.value)}
                      onBlur={(e) => handleUpdate("apiKey", e.target.value)}
                      className={styles.inputWithIcon}
                    />
                    <FaRegCopy className={styles.icon} onClick={handleCopy} />
                    <Button
                      style={{
                        marginLeft: "10px",
                        color: "gray",
                        borderColor: "black",
                      }}
                    >
                      Hide
                    </Button>
                  </div>
                </div>

                {/* Model */}
                <div style={{ marginLeft: "1.5em" }}>
                  <h3
                    style={{
                      fontSize: "20px",
                      fontWeight: "Normal",
                      fontFamily: "Segoe UI",
                    }}
                  >
                    Model
                  </h3>
                  <div className={styles.input}>
                    <Input
                      id={inputId}
                      value={model}
                      onChange={(e) => setModel(e.target.value)}
                      onBlur={(e) => handleUpdate("model", e.target.value)}
                      className={styles.inputWithIcon}
                    />
                    <FaRegCopy className={styles.icon} onClick={handleCopy} />
                    <Button
                      style={{
                        marginLeft: "10px",
                        color: "gray",
                        borderColor: "black",
                      }}
                    >
                      Hide
                    </Button>
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
                <div style={{ flex: "1 1 45%", margin: "10px" }}>
                  <h2
                    style={{
                      fontWeight: "normal",
                      fontFamily: "Segoe UI",
                      fontSize: "20px",
                    }}
                  >
                    Storage Account Name
                  </h2>
                  <div className={styles.input}>
                    <Input
                      id={inputId}
                      value={storage}
                      onChange={(e) => setStorage(e.target.value)}
                      onBlur={(e) =>
                        handleAzureUpdate("storage", e.target.value)
                      }
                      className={styles.inputWithIcon}
                    />
                    <FaRegCopy className={styles.icon} onClick={handleCopy} />
                    <Button
                      style={{
                        marginLeft: "10px",
                        color: "gray",
                        borderColor: "black",
                      }}
                    >
                      Hide
                    </Button>
                  </div>
                </div>

                {/* Container Name */}
                <div style={{ flex: "1 1 45%", margin: "10px" }}>
                  <h2
                    style={{
                      fontWeight: "normal",
                      fontFamily: "Segoe UI",
                      fontSize: "20px",
                    }}
                  >
                    Container Name
                  </h2>
                  <div className={styles.input}>
                    <Input
                      id={inputId}
                      value={container}
                      onChange={(e) => setContainer(e.target.value)}
                      onBlur={(e) =>
                        handleAzureUpdate("container", e.target.value)
                      }
                      className={styles.inputWithIcon}
                    />
                    <FaRegCopy className={styles.icon} onClick={handleCopy} />
                    <Button
                      style={{
                        marginLeft: "10px",
                        color: "gray",
                        borderColor: "black",
                      }}
                    >
                      Hide
                    </Button>
                  </div>
                </div>

                {/* Key */}
                <div
                  style={{
                    flex: "1 1 45%",
                    marginLeft: "10px",
                    marginTop: "-20px",
                  }}
                >
                  <h2
                    style={{
                      fontWeight: "normal",
                      fontFamily: "Segoe UI",
                      fontSize: "20px",
                    }}
                  >
                    Key
                  </h2>
                  <div className={styles.input}>
                    <Input
                      id={inputId}
                      value={key}
                      onChange={(e) => setKey(e.target.value)}
                      onBlur={(e) => handleAzureUpdate("key", e.target.value)}
                      className={styles.inputWithIcon}
                    />
                    <FaRegCopy className={styles.icon} onClick={handleCopy} />
                    <Button
                      style={{
                        marginLeft: "10px",
                        color: "gray",
                        borderColor: "black",
                      }}
                    >
                      Hide
                    </Button>
                  </div>
                </div>

                {/* Connection String */}
                <div
                  style={{
                    flex: "1 1 45%",
                    marginLeft: "10px",
                    marginTop: "-20px",
                  }}
                >
                  <h2
                    style={{
                      fontWeight: "normal",
                      fontFamily: "Segoe UI",
                      fontSize: "20px",
                    }}
                  >
                    Connection String
                  </h2>
                  <div className={styles.input}>
                    <Input
                      id={inputId}
                      value={connnection}
                      onChange={(e) => setConnection(e.target.value)}
                      onBlur={(e) =>
                        handleAzureUpdate("connection", e.target.value)
                      }
                      className={styles.inputWithIcon}
                    />
                    <FaRegCopy className={styles.icon} onClick={handleCopy} />
                    <Button
                      style={{
                        marginLeft: "10px",
                        color: "gray",
                        borderColor: "black",
                      }}
                    >
                      Hide
                    </Button>
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
