import "./layout.css";

import frLogo from "../media/frlogo.png";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import React, { useState, useEffect, useRef } from "react";

import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toggleDrawerPosition } from "../Store/refreshSlice";

import {
  Avatar,
  PopoverTrigger,
  PopoverSurface,
  makeStyles,
  Popover,
  Text,
  Link,
} from "@fluentui/react-components";
import {
  AlertBadgeRegular,
  QuestionRegular,
  ShareIos24Filled,
} from "@fluentui/react-icons";

import { jwtDecode } from "jwt-decode";

import axios from "axios";

import { Modal, Upload, message, Layout } from "antd";
import WalkInCandidate from "./WalkinCandidate.jsx";

import { refreshActions } from "../Store/Store";

const { Header, Content, Footer, Sider } = Layout;
const { Dragger } = Upload;
const useStyles = makeStyles({
  contentHeader: {
    marginTop: "0",
  },
  text: {
    overflow: "hidden",
    width: "240px",
    display: "block",
    color: "#424242",
  },
  r1572tok: {
    boxSizing: "border-box",
    color: "white",
    display: "flex",
  },
});

const ExampleContent = () => {
  const styles = useStyles();

  const darktheme = useSelector((state) => state.theme.dark);
  const themestate = useSelector((state) => state.theme.theme);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [empId, setEmpId] = useState("");
  const [id, setId] = useState("");
  const dispatch = useDispatch();

  const setValue = (value) => {
    dispatch(toggleDrawerPosition(value));
  };

  console.log(id);
  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    console.log(storedUsername);
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    console.log(typeof token);
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        console.log(decodedToken);
        const emailFromToken = decodedToken.email;
        const empIdFromToken = decodedToken.empId;
        const userid = decodedToken.user_id;

        setEmail(emailFromToken);
        setEmpId(empIdFromToken);
        setId(userid);
        console.log("IDD", userid);
      } catch (error) {
        console.error("Invalid token:", error);
      }
    }
  }, []);
  return (
    <div style={{ marginBottom: "20px" }}>
      <div
        style={{
          width: "320px",
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "40px",
        }}
      >
        <Text
          truncate
          wrap={false}
          className={styles.text}
          style={
            themestate
              ? { width: "75%", color: darktheme.fontcolordark }
              : { width: "75%" }
          }
        >
          FocusR Consultancy and Technologies Pvt Ltd.
        </Text>
        <Link
          appearance="subtle"
          // href="http://localhost:3000/"
          onClick={() => {
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
            localStorage.removeItem("username");
            setValue("1");

            navigate("/");
          }}
          style={
            themestate
              ? {
                  width: "25%",
                  textAlign: "right",
                  color: darktheme.fontcolordark,
                  WebkitTapHighlightColor: "transparent",
                }
              : {
                  width: "25%",
                  textAlign: "right",
                  WebkitTapHighlightColor: "transparent",
                }
          }
        >
          Sign out
        </Link>
      </div>
      <div style={{ display: "flex", width: "370px", marginBottom: "10px" }}>
        <Avatar
          active="active"
          color="colorful"
          name={username}
          size={96}
          style={{ marginLeft: "5%" }}
        />
        <div
          style={{
            width: "55%",
            marginLeft: "10%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Text
            wrap={false}
            weight="bold"
            className={styles.text}
            style={
              themestate
                ? {
                    fontSize: "20px",
                    width: "100%",
                    marginBottom: "10px",
                    color: darktheme.fontcolordark,
                  }
                : { fontSize: "1.5 em", width: "100%", marginBottom: "10px" }
            }
          >
            {username}
          </Text>
          <Text
            truncate
            wrap={false}
            style={
              themestate
                ? {
                    fontSize: "14px",
                    width: "100%",
                    marginBottom: "10px",
                    color: darktheme.fontcolordark,
                  }
                : {
                    fontSize: "14px",
                    width: "100%",
                    marginBottom: "10px",
                    color: "#424242",
                  }
            }
          >
            {email}
          </Text>
          <Text
            truncate
            wrap={false}
            className={styles.text}
            style={
              themestate
                ? {
                    fontSize: "14px",
                    width: "100%",
                    color: darktheme.fontcolordark,
                  }
                : { fontSize: "14px", width: "100%" }
            }
          >
            {empId}
          </Text>
        </div>
      </div>
    </div>
  );
};

const CustomLayout = ({ children }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  console.log(windowWidth);
  const navigate = useNavigate();

  const lighttheme = useSelector((state) => state.theme.light);
  const darktheme = useSelector((state) => state.theme.dark);
  console.log(lighttheme, darktheme);
  const themestate = useSelector((state) => state.theme.theme);
  const [username, setUsername] = useState("");

  const [newCandidate, setNewCandidate] = useState(false);
  const [isCardOpen, setIsCardOpen] = useState(false);
  const [items, setItems] = useState([]);
  const notificationRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false); // State to handle loading state
  const [isCleared, setIsCleared] = useState(false);
  const [total, setTotal] = useState("");
  const [newResponse, setNewResponse] = useState([]);
  const [grnResponse, setGrnResponse] = useState([]);

  const dispatch = useDispatch();

  const [data, setData] = useState([]);

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      console.log(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    fetchData();
    GetData();
  }, [total]);

  const fetchData = async (showMessage = false) => {
    if (showMessage) {
      message.success("Refreshing...");
    }
    try {
      const token = localStorage.getItem("access_token");
      const response = await axios.get(
        "https://invoicezapi.focusrtech.com:57/user/grn-history",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const fetchedItems = response.data;
      const lengths = fetchedItems.length;
      console.log("22222222222", lengths);
      setGrnResponse(fetchedItems);
      uptotal(lengths);

      const mappedItems = fetchedItems.map((item) => {
        return {
          Id: item.InvoiceId,
          grn_num: item.gate_entry_no,
          location:
            item.po_headers && item.po_headers.length > 0
              ? item.po_headers[0].ship_to
              : null,
          supplier_name: item.VendorName,
          id: item.id,
          PO_Headers: item.po_headers,
        };
      });

      setData(mappedItems); // Update the table data
      console.log("FETCHED", mappedItems);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Function to fetch the unread documents for the notifications
  const GetData = async (showMessage = false) => {
    if (showMessage) {
      message.success("Refreshing...");
    }
    try {
      const response = await axios.get(
        "https://invoicezapi.focusrtech.com:57/user/unread-documents",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      const fetchedItems = response.data;

      console.log("API", fetchedItems);
      const length = fetchedItems.length;
      console.log("lllllllll", length);
      uptotal(length);
      setNewResponse(fetchedItems);
      const mappedItems = fetchedItems.map((item) => {
        let Status = "";

        if (item.invoiceInfo.po_headers.length === 0) {
          Status = "No Match Found";
        } else if (item.invoiceInfo.po_headers.length === 1) {
          Status = "Match Found";
        } else if (item.invoiceInfo.po_headers.length > 1) {
          Status = "Multiple Match Found";
        }

        return {
          Id: item.invoiceInfo.InvoiceId,
          supplier_name: item.invoiceInfo.VendorName,
          Status: Status,
          PO_Headers: item.invoiceInfo.po_headers,
        };
      });

      setItems(mappedItems); // Update the notifications data
      console.log("FETCHED NEW ENTRY", mappedItems);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const clearNotifications = async () => {
    try {
      const response = await axios.post(
        "https://invoicezapi.focusrtech.com:57/user/mark-all-documents-as-read/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // 'Authorization': `Bearer`,
          },
        },
      );

      if (response.ok) {
        setData([]);
        setIsCleared(true);
        alert("All notifications cleared successfully!");
      } else {
        const errorData = await response.json();
        console.error("Error clearing notifications:", errorData);
        alert("Failed to clear notifications. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false); // Reset the loading state
    }
  };

  const handleClearButtonClick = async (e) => {
    e.stopPropagation();
    setIsLoading(true);
    setData([]);
    setIsCleared(true);
    setIsLoading(false);
    clearNotifications(); // Call the clearNotifications API
  };

  const uptotal = () => {
    setTotal(newResponse.length + grnResponse.length);
  };

  const toggleCard = () => {
    setIsCardOpen((prevState) => !prevState);
    fetchData();
    GetData();
  };

  const handleNewCandidate = () => {
    setNewCandidate(false);
  };
  const handleNewCandidateBtn = () => {
    console.log("btn clicked");
    setNewCandidate(true);
  };

  console.log(isLoading);

  console.log("Cleared", isCleared);

  return (
    <div>
      {/* Navbar */}
      <div className={themestate ? "navbardark" : "navbarlight"}>
        {/* Left Part */}
        <div className="left-part">
          <div className="focusr-logo">
            <img src={frLogo} alt="FRLogo" className="focusr-logo-img" />
          </div>
          <span className="focusR-text">InvoicEZ</span>
        </div>

        {/* Right Part */}
        <div className="right-part">
          {/* Share Button */}
          <div
            style={{
              color: "#fff",
              cursor: "pointer",
              height: "100%",
              width: "100%",
              position: "relative",
            }}
            onClick={handleNewCandidateBtn}
          >
            <ShareIos24Filled />
          </div>

          {/* Notification Icon and Popover Card */}
          <div
            style={{
              position: "relative",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div
              ref={notificationRef}
              className="notification-container"
              onClick={toggleCard}
              style={{ cursor: "pointer" }}
            >
              <AlertBadgeRegular
                style={{
                  color: "#fff",
                  height: "90%",
                  width: "90%",
                  cursor: "pointer",
                }}
              />
              <span style={{ color: "#fff", margintop: "-5px" }}>{total}</span>
            </div>

            {isCardOpen && (
              <div
                style={{
                  position: "fixed",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  zIndex: 1000,
                }}
                onClick={toggleCard}
              >
                <div
                  className="card"
                  style={{
                    background: "#fff",
                    width: "1200px", // Adjusted width for two tables
                    borderRadius: "10px",
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                    padding: "20px",
                  }}
                >
                  {/* Header Section */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center", // Ensures vertical alignment
                      borderBottom: "1px solid #ddd",
                      paddingBottom: "10px",
                      marginBottom: "20px",
                      gap: "20px",
                    }}
                  >
                    {/* Left Header */}
                    <h3
                      style={{
                        fontSize: "1.3em",
                        marginLeft: "5px",
                        marginBottom: "10px",
                        textAlign: "left",
                        // borderBottom: "1px solid #ddd",
                        paddingBottom: "5px",
                      }}
                    >
                      New Upload
                    </h3>

                    {/* Right Header */}

                    <h3
                      style={{
                        fontSize: "1.3em",
                        textAlign: "center",
                        marginBottom: "10px",
                        // borderBottom: "1px solid #ddd",
                        paddingBottom: "5px",
                        display: "flex",
                        justifyContent: "flex-start",
                        width: "49%",
                      }}
                    >
                      GRN Created
                    </h3>
                  </div>

                  {/* Tables Section */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between", // Space between tables
                      alignItems: "flex-start", // Ensures tables align to the top
                      gap: "20px", // Adds consistent spacing between tables
                    }}
                  >
                    {/* Left Table */}
                    <table
                      style={{
                        width: "100%", // Adjust table width for proper alignment
                        borderCollapse: "collapse",
                      }}
                    >
                      <thead>
                        <tr>
                          <th
                            style={{
                              textAlign: "left",
                              padding: "5px",
                              borderBottom: "1px solid #ddd",
                              color: "#555",
                            }}
                          >
                            Invoice No
                          </th>
                          <th
                            style={{
                              textAlign: "left",
                              padding: "5px",
                              borderBottom: "1px solid #ddd",
                              color: "#555",
                            }}
                          >
                            Supplier Name
                          </th>
                          <th
                            style={{
                              textAlign: "left",
                              padding: "5px",
                              borderBottom: "1px solid #ddd",
                              color: "#555",
                            }}
                          >
                            Status
                          </th>
                          <th
                            style={{
                              textAlign: "left",
                              padding: "5px",
                              borderBottom: "1px solid #ddd",
                              color: "#555",
                            }}
                          >
                            View
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {items.map((row, index) => (
                          <tr key={index}>
                            <td
                              style={{
                                padding: "5px",
                                borderBottom: "1px solid #ddd",
                                color: "#333",
                              }}
                            >
                              {row.Id}
                            </td>
                            <td
                              style={{
                                padding: "5px",
                                borderBottom: "1px solid #ddd",
                                color: "#333",
                              }}
                            >
                              {row.supplier_name}
                            </td>

                            <td
                              style={{
                                padding: "2px 2px",
                                borderBottom: "1px solid #ddd",
                                color: "#fff",
                                fontSize: "12px",
                                textAlign: "left",
                                backgroundColor: (() => {
                                  if (
                                    row.Status === "Match Found" ||
                                    row.Status === "Multiple Match Found"
                                  ) {
                                    return "#107c10";
                                  } else if (row.Status === "No Match Found") {
                                    return "#c50f1f";
                                  } else {
                                    return "transparent";
                                  }
                                })(),
                              }}
                            >
                              {row.Status}
                            </td>

                            <td
                              style={{
                                padding: "5px",
                                borderBottom: "1px solid #ddd",
                                color: "#333",
                              }}
                            >
                              <FaArrowUpRightFromSquare
                                style={{
                                  cursor: "pointer",
                                  marginLeft: "1rem",
                                }}
                                onClick={() => {
                                  const status =
                                    row.Status?.trim().toLowerCase(); // Normalize the status
                                  if (status === "match found") {
                                    dispatch(toggleDrawerPosition("3"));
                                    console.log("ROWData", row);
                                    navigate(
                                      `/approvepage?poNumber=${row.PO_Headers[0].po_number}&Id=${row.PO_Headers[0].id}`,
                                    );
                                    // navigate("/approve");
                                  } else if (
                                    status === "multiple match found"
                                  ) {
                                    dispatch(toggleDrawerPosition("4")); // Set the drawer position to "5"

                                    navigate(
                                      `/aidetail?invoiceNumber=${row.id}`,
                                    );
                                  } else if (status === "no match found") {
                                    dispatch(toggleDrawerPosition("5")); // Set the drawer position to "5"

                                    navigate(
                                      `/issuefixdetails?invoiceNo=${row.id}`,
                                    );
                                  } else {
                                    console.error(
                                      "Unknown status:",
                                      row.Status,
                                    );
                                  }
                                }}
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                      {/* Bottom Button Section */}
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center", // Centers the button horizontally
                          marginTop: "20px", // Adds spacing between table and button
                          marginBottom: "20px", // Ensures some spacing at the bottom
                        }}
                      >
                        <button
                          style={{
                            padding: "10px 20px",
                            // backgroundColor: "#007bff",
                            // color: "#fff",
                            border: "none",
                            // borderRadius: "5px",
                            cursor: "pointer",
                            fontSize: "1em",
                            marginLeft: "-60px",
                          }}
                          // onClick={(e) => {
                          //   e.stopPropagation();
                          //   setData([]);
                          // }}
                          onClick={handleClearButtonClick}
                        >
                          Clear
                        </button>
                      </div>
                    </table>

                    {/* Right Table */}
                    <table
                      style={{
                        width: "100%", // Adjust table width for proper alignment
                        borderCollapse: "collapse",
                      }}
                    >
                      <thead>
                        <tr>
                          <th
                            style={{
                              textAlign: "left",
                              padding: "5px",
                              borderBottom: "1px solid #ddd",
                              color: "#555",
                            }}
                          >
                            Invoice No
                          </th>
                          <th
                            style={{
                              textAlign: "left",
                              padding: "5px",
                              borderBottom: "1px solid #ddd",
                              color: "#555",
                            }}
                          >
                            Supplier Name
                          </th>
                          <th
                            style={{
                              textAlign: "left",
                              padding: "5px",
                              borderBottom: "1px solid #ddd",
                              color: "#555",
                            }}
                          >
                            GRN Number
                          </th>
                          <th
                            style={{
                              textAlign: "left",
                              padding: "5px",
                              borderBottom: "1px solid #ddd",
                              color: "#555",
                            }}
                          >
                            View
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.map((row, index) => (
                          <tr key={index}>
                            <td
                              style={{
                                padding: "5px",
                                borderBottom: "1px solid #ddd",
                                color: "#333",
                              }}
                            >
                              {row.Id}
                            </td>
                            <td
                              style={{
                                padding: "5px",
                                borderBottom: "1px solid #ddd",
                                color: "#333",
                              }}
                            >
                              {row.supplier_name}
                            </td>
                            <td
                              style={{
                                padding: "5px",
                                borderBottom: "1px solid #ddd",
                                color: "#333",
                              }}
                            >
                              {row.grn_num}
                            </td>
                            <td
                              style={{
                                padding: "5px",
                                borderBottom: "1px solid #ddd",
                                color: "#333",
                              }}
                            >
                              <FaArrowUpRightFromSquare
                                style={{
                                  cursor: "pointer",
                                  marginLeft: "1rem",
                                }}
                                onClick={() => {
                                  dispatch(toggleDrawerPosition("7"));
                                  console.log("ROWData", row);
                                  navigate(
                                    `/historypage?poNumber=${row.PO_Headers[0].po_number}&Id=${row.PO_Headers[0].id}`,
                                  );
                                  // navigate("/history");
                                }}
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "left", // Centers the button horizontally
                          marginTop: "20px", // Adds spacing between table and button
                          marginBottom: "20px", // Ensures some spacing at the bottom
                        }}
                      >
                        <button
                          style={{
                            padding: "10px 20px",
                            // backgroundColor: "#007bff",
                            // color: "#fff",
                            border: "none",
                            // borderRadius: "5px",
                            cursor: "pointer",
                            fontSize: "1em",
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            setData([]); // Closes the notification container
                          }}
                        >
                          Clear
                        </button>
                      </div>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
          {/* Question Mark Icon */}
          <div className="questionmark-container">
            <a
              href="https://focusrtech.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <QuestionRegular
                style={{ color: "#fff", height: "33px", width: "35px" }}
              />
            </a>
          </div>

          <Popover appearance={themestate ? "inverted" : ""}>
            <PopoverTrigger disableButtonEnhancement>
              <div
                style={{
                  marginRight: "15px",
                  height: "48px",
                  width: "48px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  cursor: "pointer",
                  WebkitTapHighlightColor: "transparent",
                }}
              >
                <Avatar color="colorful" name={username} size={36} />
              </div>
            </PopoverTrigger>
            <PopoverSurface tabIndex={-5}>
              <ExampleContent />
            </PopoverSurface>
          </Popover>
        </div>
      </div>

      {/* Children Components */}
      <div style={{ marginTop: "48px" }}>{children}</div>

      {/* Modal */}
      <Modal
        open={newCandidate}
        onCancel={handleNewCandidate}
        width={540}
        footer={null}
      >
        <WalkInCandidate />
      </Modal>
    </div>
  );
};

export default CustomLayout;
