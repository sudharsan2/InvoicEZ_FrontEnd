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
import { themeActions } from "../Store/Store";
import { calc } from "antd/es/theme/internal";
import { DarkModeSwitch } from "react-toggle-dark-mode";
// import { useNavigate } from "react-router-dom";
import {jwtDecode} from 'jwt-decode';
const { Header, Content, Footer, Sider } = Layout;
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
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [empId, setEmpId] = useState('');
  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    console.log(storedUsername)
    if (storedUsername) {
      setUsername(storedUsername);
    }  
  }, []);
  useEffect(() => {
    
    const token = localStorage.getItem('access_token'); 
    console.log(typeof(token));
    if (token) {
      try {
       
        const decodedToken = jwtDecode(token);
        console.log(decodedToken);
        const emailFromToken = decodedToken.email;
        const empIdFromToken = decodedToken.empId;

       

        setEmail(emailFromToken);
        setEmpId(empIdFromToken);

      } catch (error) {
        console.error('Invalid token:', error);
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
  href="http://localhost:3000/"
  onClick={() => {
    // Clear tokens from local storage
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("username");

    // Navigate to the login page
    navigate("");
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
           {empId}{/* Replace this with dynamic data if needed */}
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
  const [username, setUsername] = useState('');  // Add username state
  const toggleDarkMode = (checked) => {
    setDarkMode(checked);
  };
 
  const handleTheme = () => {
    dispatch(themeActions.toggletheme());
  };

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
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
 
    // Clean up the event listener on component unmount
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
 
  return (
    <div style={{}}>
      <div>
        <div className={themestate ? "navbardark" : "navbarlight"}>
          <div className="left-part">
            <div className="focusr-logo">
              <img src={frLogo} alt="FRLogo" className="focusr-logo-img"></img>
            </div>
            <span className="focusR-text">EZinvoice</span>
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
            <div className="questionmark-container">
              <a
                href="https://focusrtech.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <QuestionRegular
                  style={{ color: "#fff", height: "100%", width: "100%" }}
                />
              </a>
            </div>
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
    </div>
  );
};
 
export default CustomLayout;
 
 
 
