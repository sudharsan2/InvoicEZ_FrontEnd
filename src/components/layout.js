import { Layout } from "antd";
import {
  SearchOutlined,
  BellOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import "./layout.css";
import {
  UserOutlined,
  BarChartOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import frLogo from "../media/frlogo.png";
import React, { useState, useEffect } from "react";
import Login from "../pages/Login";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Drawer1 from "./drawer";
import {
  SearchBox,
  Field,
  Avatar,
  PopoverTrigger,
  PopoverSurface,
  makeStyles,
  Popover,
  Text,
  shorthands,
  Link,
  InfoLabel,
} from "@fluentui/react-components";
import {
  AlertBadgeRegular,
  QuestionRegular,
  WeatherSunnyRegular,
  WeatherMoonRegular,
} from "@fluentui/react-icons";
import { themeActions, refreshActions } from "../Store/Store";
import { calc } from "antd/es/theme/internal";
import { DarkModeSwitch } from "react-toggle-dark-mode";
// import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { ShareIos24Filled } from "@fluentui/react-icons";
import axios from "axios";
import InvoiceUpload from "./UploadInvoice";
import { useRef } from "react";
import { InboxOutlined, UploadOutlined } from "@ant-design/icons";
import { Modal, Upload, notification, message } from "antd";
import WalkInCandidate from "./WalkinCandidate.jsx";
import { Button } from "@fluentui/react-components";
const { Header, Content, Footer, Sider } = Layout;
const { Dragger } = Upload;
const useStyles = makeStyles({
  contentHeader: {
    marginTop: "0",
  },
  text: {
    ...shorthands.overflow("hidden"),
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
  const lighttheme = useSelector((state) => state.theme.light);
  const darktheme = useSelector((state) => state.theme.dark);
  const themestate = useSelector((state) => state.theme.theme);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [empId, setEmpId] = useState("");
  const [id, setId] = useState("");
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
            // Clear tokens from local storage
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            localStorage.removeItem("username");

            // Navigate to the login page
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
            {username} {/* Use the dynamically fetched username */}
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
            {email} {/* Dynamically generate email based on username */}
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
            {/* Replace this with dynamic data if needed */}
          </Text>
        </div>
      </div>
    </div>
  );
};

// export default ExampleContent;

const CustomLayout = ({ children }) => {
  const [isDarkMode, setDarkMode] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [logoutPopoverVisible, setLogoutPopoverVisible] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState("Dashboard");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const lighttheme = useSelector((state) => state.theme.light);
  const darktheme = useSelector((state) => state.theme.dark);
  const themestate = useSelector((state) => state.theme.theme);
  const [username, setUsername] = useState("");
  const [isWalkinUpload, setIsWalkinUpload] = useState(false);
  const [newCandidate, setNewCandidate] = useState(false);
  const [isCardOpen, setIsCardOpen] = useState(false);
  const [items, setItems] = useState([]);
  const notificationRef = useRef(null);

  useEffect(() => {
    const toggleCard = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setIsCardOpen(false);
      }
    };
    document.addEventListener("mousedown", toggleCard);
    return () => document.removeEventListener("mousedown", toggleCard);
  }, []);



  const [data, setData] = useState([]);
  const fetchData = async (showMessage = false) => {
    if (showMessage) {
      message.success("Refreshing...");
    }
    try {
      // const response = await axios.get(
      //   "https://invoicezapi.focusrtech.com:57/user/grn-history",
      // );
      const token = localStorage.getItem("access_token");
      const response = await axios.get("https://invoicezapi.focusrtech.com:57/user/grn-history", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const fetchedItems = response.data;
      console.log("fetchedItems", fetchedItems);
      // set_Po_id(fetchedItems[0]["po_headers"][0]["id"]);

      const mappedItems = fetchedItems.map((item, index) => {
        // Map over po_headers to get all po_numbers

        return {
          Id: item.InvoiceId,
          grn_num: item.gate_entry_no,
          location: item.po_headers && item.po_headers.length > 0 ? item.po_headers[0].ship_to : null,
          supplier_name: item.VendorName,

        };
      });

      setItems(mappedItems);
      console.log("FETCHED", mappedItems)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };


  const GetData = async (showMessage = false) => {
    if (showMessage) {
      message.success("Refreshing...");
    }
    try {
      // const response = await axios.get(
      //   "https://invoicezapi.focusrtech.com:57/user/grn-history",
      // );
      const token = localStorage.getItem("access_token");
      const response = await axios.get("https://invoicezapi.focusrtech.com:57/user/unread-documents", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${token}`,
        },
      });
      const fetchedItems = response.data;
      console.log("fetchedItems...", fetchedItems);
      // set_Po_id(fetchedItems[0]["po_headers"][0]["id"]);

      const mappedItems = fetchedItems.map((item, index) => {
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


        };
      });

      setData(mappedItems);
      console.log("FETCHED", mappedItems)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
    GetData();
  }, []);


  const toggleCard = () => {
    setIsCardOpen((prevState) => !prevState);
  }

  const navigateToPage = () => {
    // Add your navigation logic here
    window.location.href = "/your-target-page"; // Replace with your route
  };

  // const fileInputRef = useRef(null);

  // const handleButtonClick = () => {
  //     if (fileInputRef.current) {
  //         fileInputRef.current.click();
  //     }
  // };

  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    // Trigger the file input click
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleToggle = () => {
    dispatch(refreshActions.toggleInvoiceUploadRefresh()); // Dispatch the action to toggle the state
  };

  const handleFileChange = async (info) => {
    const { status, originFileObj: file } = info.file;

    if (status === "uploading") {
      // Ignore this, as we're handling the file manually
      return;
    }

    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await axios.post(
          "https://invoicezapi.focusrtech.com:57/user/invoice-upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          },
        );

        notification.success({
          message: "Upload Successful",
          description: `File ${file.name} uploaded successfully!`,
        });
        handleToggle();
      } catch (error) {
        console.error("Upload failed:", error);
        notification.error({
          message: "Upload Failed",
          description:
            "There was an error uploading the file. Please try again.",
        });
      }
    }
  };

  const uploadProps = {
    name: "file",
    multiple: false, // Single file upload
    onChange: handleFileChange, // This is where we handle the file change
  };

  const toggleDarkMode = (checked) => {
    setDarkMode(checked);
  };

  const handleTheme = () => {
    dispatch(themeActions.toggletheme());
  };

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

  const getSearchBoxStyle = () => {
    if (windowWidth < 500) {
      return {
        width: "30vw",
        height: "",
        backgroundColor: themestate ? "rgb(41,41,41)" : "#fff",
      };
    } else if (windowWidth < 863) {
      return {
        width: "40vw",
        height: "",
        backgroundColor: themestate ? "rgb(41,41,41)" : "#fff",
      };
    } else {
      return {
        width: "100vw",
        height: "",
        backgroundColor: themestate ? "rgb(41,41,41)" : "#fff",
      };
    }
  };

  const handleIsWalkinUpload = () => {
    console.log("yes it works");
    setIsWalkinUpload(true);
    setNewCandidate(false);
  };
  const handleNewCandidate = () => {
    setNewCandidate(false);
  };
  const handleNewCandidateBtn = () => {
    console.log("btn clicked");
    setNewCandidate(true);
  };

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
          <div style={{ position: "relative", display: "inline-block" }}>
            <div
              ref={notificationRef}
              className="notification-container"
              onClick={toggleCard}
              style={{ cursor: "pointer", display: "inline-block" }}
            >
              <AlertBadgeRegular
                style={{
                  color: "#fff",
                  height: "100%",
                  width: "100%",
                  cursor: "pointer",
                }}
              />
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
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    background: "#fff",
                    width: "800px", // Adjusted width for two tables
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
                        width: "49%"
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
                            Navigation
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
                                color: "#fff",
                                backgroundColor:
                                  row.Status === "Match Found" ? "#107c10" :
                                    row.Status === "Multiple Match Found" ? "#107c10" :
                                      row.Status === "No Match Found" ? "#c50f1f" :
                                        "transparent",
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
                              <Button
                                style={{
                                  marginRight: "10px",
                                  padding: "5px 10px",
                                  backgroundColor: "#007bff",
                                  color: "#fff",
                                  border: "none",
                                  borderRadius: "3px",
                                  cursor: "pointer",
                                }}
                                onClick={() => {
                                  if (row.Status === "Match found") {
                                    navigate('/approve');
                                  } else if (row.Status === "Multiple Match found") {
                                    navigate('/ai');
                                  } else if (row.Status === "No Match Found") {
                                    navigate('/issuefix');
                                  }
                                }}
                              >
                                Status
                              </Button>
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
                            backgroundColor: "#007bff",
                            color: "#fff",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                            fontSize: "1em",
                          }}
                          
                          onClick={(e) => {
                            e.stopPropagation();  
                            setData([]);
                          }}
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
                            Navigation
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
                              <Button
                                style={{
                                  marginRight: "10px",
                                  padding: "5px 10px",
                                  backgroundColor: "#007bff",
                                  color: "#fff",
                                  border: "none",
                                  borderRadius: "3px",
                                  cursor: "pointer",
                                }}
                                onClick={() => navigate('/history')}
                              >
                                History
                              </Button>

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
                            backgroundColor: "#007bff",
                            color: "#fff",
                            border: "none",
                            borderRadius: "5px",
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
                style={{ color: "#fff", height: "38px", width: "38px" }}
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

