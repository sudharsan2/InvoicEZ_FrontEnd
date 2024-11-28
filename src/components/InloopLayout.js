import { Layout, Button } from "antd";
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

// export default ExampleContent;

const CustomLayoutLoop = ({ children }) => {
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
    <div style={{}}>
      <div>
        <div className={themestate ? "navbardark" : "navbarlight"}>
          <div className="left-part">
            <div className="focusr-logo">
              <img src={frLogo} alt="FRLogo" className="focusr-logo-img"></img>
            </div>
            <span className="focusR-text">InvoiceEZ</span>
          </div>
          {/* <Field
            style={
              themestate
                ? {
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "rgb(41,41,41)",
                    borderRadius: "5px",
                  }
                : {
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#fff",
                    borderRadius: "5px",
                  }
            }
          >
            <SearchBox
              placeholder="Search..."
              style={getSearchBoxStyle()}
              className={
                themestate &&
                "searchboxicon searchboxinputtext searchboxinputplaceholder"
              }
              size="medium"
              appearance="filled-darker"
            />
          </Field> */}
          <div className="right-part">
            {/* <div
              className="theme-container"
              onClick={handleTheme}
              style={{ WebkitTapHighlightColor: "transparent" }}
            >
              <DarkModeSwitch
                checked={isDarkMode}
                onChange={toggleDarkMode}
                sunColor="rgb(239, 213, 112)"
                moonColor="rgb(246, 241, 150)"
                size={26}
              />
            </div> */}
            {/* <input type="file" onChange={handleFileChange} /> */}
            <div>
              {/* The button that triggers file selection */}
              {/* <div
                style={{ color: "#fff", cursor: "pointer", height: "100%",
                  width: "100%", }}
                onClick={handleButtonClick}
            >
                <ShareIos24Filled />
                <InvoiceUpload fileInputRef={fileInputRef} />
            </div> */}
              <div
                style={{
                  color: "#fff",
                  cursor: "pointer",
                  height: "100%",
                  width: "100%",
                  position: "relative", // To position the hidden input
                }}
                onClick={handleButtonClick}
              >
                {/* <ShareIos24Filled onClick={handleNewCandidateBtn} /> */}
                {/* <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: "none" }} // Hide the file input
                  onChange={showModal} // Add the onChange prop to handle file input changes
                /> */}
              </div>
            </div>
            <div className="notification-container">
              <AlertBadgeRegular
                style={{
                  color: "#fff",
                  height: "100%",
                  width: "100%",
                  cursor: "pointer",
                }}
              />
            </div>
            {/* <div className="questionmark-container">
              <a
                href="https://focusrtech.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <QuestionRegular
                  style={{ color: "#fff", height: "100%", width: "100%" }}
                />
              </a>
            </div> */}
            <Popover appearance={themestate ? "inverted" : ""}>
              <PopoverTrigger disableButtonEnhancement>
                <div
                  style={{
                    marginRight: "15px",
                    height: "48px",
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
      </div>
      <div style={{ marginTop: "48px" }}>{children}</div>
      {/* <Modal
        title="Upload File"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Dragger {...uploadProps}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            Click or drag file to this area to upload
          </p>
          <p className="ant-upload-hint">
            Support for a single file upload. Strictly prohibited from uploading
            company data or other banned files.
          </p>
        </Dragger>
      </Modal> */}
      {/* <Modal
        open={newCandidate}
        onCancel={handleNewCandidate}
        width={540}
        footer={[]}
      >
        <WalkInCandidate isWalkinUpload={handleIsWalkinUpload} />
      </Modal> */}
    </div>
  );
};

export default CustomLayoutLoop;
