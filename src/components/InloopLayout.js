
import { jwtDecode } from "jwt-decode";
import React, { useState, useEffect ,useRef} from "react";

import {
  
  PopoverTrigger,
  PopoverSurface,
  Popover,
  Avatar,
  shorthands,
  Link, makeStyles, Text
 
} from "@fluentui/react-components";

import { AlertBadgeRegular } from "@fluentui/react-icons";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./layout.css";

import axios from "axios";
import frLogo from "../media/frlogo.png";

const useStyles2 = makeStyles({
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
  const styles = useStyles2();
  
  const darktheme = useSelector((state) => state.theme.dark);
  const themestate = useSelector((state) => state.theme.theme);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [empId, setEmpId] = useState("");
  // Define the table columns and data  

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

        setEmail(emailFromToken);
        setEmpId(empIdFromToken);
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


const CustomLayoutLoop = ({ children }) => {
  
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [notificationsVisible, setNotificationsVisible] = useState(false);
  const [newCandidate, setNewCandidate] = useState(false); 
  const themestate = useSelector((state) => state.theme.theme);
  const [data, setData] = useState([]);
  const notificationRef = useRef(null); 


  const handleNotificationClick = () => {
    setNotificationsVisible((prevState) => !prevState); 
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setNotificationsVisible(false); 
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
    document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const GetData = async (showMessage = false) => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await axios.get("https://invoicezapi.focusrtech.com:57/user/storetrue-invoice", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const fetchedItems = response.data;
      console.log("fetchedItems...", fetchedItems);
      



      const mappedItems = fetchedItems.map((item, index) => {
        return {
          Id: item.InvoiceId,
          supplier_name: item.po_headers[0].supplier_name,
          po_number: item.po_headers[0].po_number,
          amount: item.po_headers[0].total_amount,
          date: item.InvoiceDate
        };
      });

      setData(mappedItems);
      console.log("mappedItems", mappedItems)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    GetData()
  }, [])

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);


  

  

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
            ref={notificationRef} // Attach ref here
            className="notification-container"
            onClick={handleNotificationClick}
            style={{
              position: "relative",
              cursor: "pointer",
              marginRight: "20px",
              marginBottom: "10px"// Add spacing between elements
            }}
          >
            <AlertBadgeRegular
              style={{
                color: "#fff",
                height: "30px",
                width: "50px",
                marginTop: "-4px"
              }}
            />
            {notificationsVisible && (
              <div
                style={{
                  position: "fixed",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: "60%",
                  background: themestate ? "#333" : "#fff",
                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
                  borderRadius: "8px",
                  padding: "20px",
                  zIndex: 1000,
                }}
                onclick={handleNotificationClick}

              >
                <Text
                  weight="bold"
                  style={{
                    display: "flex",
                    fontSize: "20px",
                    justifyContent: "space-between",
                    alignItems: "center", // Ensures vertical alignment
                    borderBottom: "1px solid #ddd",
                    paddingBottom: "10px",
                    marginBottom: "20px",
                    gap: "20px",


                  }}
                >
                  New Gate Entry
                </Text>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between", // Space between tables
                    alignItems: "flex-start", // Ensures tables align to the top
                    gap: "20px", // Adds consistent spacing between tables
                  }}
                >
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
                            padding: "8px",
                            borderBottom: "1px solid #ddd",
                            color: "#555",
                          }}
                        >
                          Invoice No
                        </th>
                        <th
                          style={{
                            textAlign: "left",
                            padding: "8px",
                            borderBottom: "1px solid #ddd",
                            color: "#555",
                          }}
                        >
                          Supplier Name
                        </th>
                        <th
                          style={{
                            textAlign: "left",
                            padding: "8px",
                            borderBottom: "1px solid #ddd",
                            color: "#555",
                          }}
                        >
                          PO Number
                        </th>
                        <th
                          style={{
                            textAlign: "left",
                            padding: "8px",
                            borderBottom: "1px solid #ddd",
                            color: "#555",
                          }}
                        >
                          Amount
                        </th>
                        <th
                          style={{
                            textAlign: "left",
                            padding: "8px",
                            borderBottom: "1px solid #ddd",
                            color: "#555",
                          }}
                        >
                          Date
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((item, index) => (
                        <tr key={index}>
                          <td style={{
                            padding: "5px",
                            borderBottom: "1px solid #ddd",
                            color: "#333",
                          }}>
                            {item.Id}
                          </td>

                          <td style={{
                            padding: "5px",
                            borderBottom: "1px solid #ddd",
                            color: "#333",
                          }}>
                            {item.supplier_name}
                          </td>
                          <td style={{
                            padding: "5px",
                            borderBottom: "1px solid #ddd",
                            color: "#333",
                          }}>
                            {item.po_number}
                          </td>
                          <td style={{
                            padding: "5px",
                            borderBottom: "1px solid #ddd",
                            color: "#333",
                          }}>
                            {item.amount}
                          </td>
                          <td style={{
                            padding: "5px",
                            borderBottom: "1px solid #ddd",
                            color: "#333",
                          }}>
                            {item.date}
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
                          onClick={() => {
                            setData([]); // Closes the notification container
                            setNotificationsVisible(false); // Clears notifications
                          }}
                        >
                          Clear
                        </button> 
                      </div>
                  </table>
                </div>
              </div>
            )}

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

      Children Components
      < div style={{ marginTop: "15px" }}> {children}</div >
    </div >
  );
};

export default CustomLayoutLoop;

