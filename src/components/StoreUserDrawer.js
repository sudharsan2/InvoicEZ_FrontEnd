import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toggleDrawerPosition } from "../Store/refreshSlice";
import {
  NavItem,
  NavDrawer,
  NavDrawerBody,
  NavDrawerFooter,
  NavDrawerHeader,
  NavDrawerHeaderNav,
} from "@fluentui/react-nav-preview";
import {
  Board24Filled,
  Board24Regular,
 
  bundleIcon,
  BoxMultipleCheckmark24Regular,
  BoxMultipleCheckmark24Filled,
 
  Navigation24Filled,
  Navigation24Regular,
  History24Regular,
  History24Filled,
  DatabaseSearch24Filled ,
  DatabaseSearch24Regular
} from "@fluentui/react-icons";

import {
  Button,
  
  makeStyles,
  shorthands,
  tokens,
 
  Tooltip,
} from "@fluentui/react-components";

import { jwtDecode } from "jwt-decode";
import { icons } from "lucide-react";
const useStyles = makeStyles({
  root: {
    
    ...shorthands.overflow("hidden"),
    

    position: "fixed",
    left: 0,
    width: "100%",
    height: "100%",
    display: "flex",

    backgroundColor: "#fff",
  },
  content: {
    ...shorthands.flex(1),
    ...shorthands.padding("16px"),

    display: "grid",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    gridTemplateColumns: "1fr",
    width: "100%",

    gridRowGap: tokens.spacingVerticalXXL,
    gridAutoRows: "max-content",
  },
  field: {
    display: "grid",
    gridRowGap: tokens.spacingVerticalS,
  },

  headingContent: {
    marginInlineStart: `10px`,
  },
  hamburger: {
    
    textDecorationLine: "none",
    marginLeft: "5px",
    marginTop: "10px",

   
  },
  navItemlight: {
    marginTop: "10px",
    left: 0,

    "&:hover": {
      backgroundColor: "#ccc", // Change background color on hover
    },
  },
  navItemdark: {
    marginTop: "10px",
    left: 0,
    backgroundColor: "rgb(33,33,33)",

    "&:hover": {
      backgroundColor: "#616161", // Change background color on hover
    },
  },
  navbody: {
    backgroundColor: "black",
  },
  navfooter: {
    "&:hover": {
      backgroundColor: "#f0f0f0", // Change background color on hover
    },
  },

  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    backgroundColor: "#282c34",
    color: "white",
  },
  brand: {
    fontSize: "24px",
    fontWeight: "bold",
  },
  dropdown: {
    minWidth: "200px", // Adjust as per your design
  },
  linkContainer: {
    display: "flex",
    gap: "20px",
    alignItems: "center",
  },
  link: {
    color: "white",
    textDecoration: "none",
    fontSize: "16px",
    "&:hover": {
      textDecoration: "underline",
    },
  },
});


const Dashboard = bundleIcon(Board24Filled, Board24Regular);


const LayerDiagonalPersonRegular = bundleIcon(
  BoxMultipleCheckmark24Filled,
  BoxMultipleCheckmark24Regular,
);


const Navi = bundleIcon(Navigation24Filled, Navigation24Regular);

const OpenPo = bundleIcon(DatabaseSearch24Filled ,DatabaseSearch24Regular )

const NavDrawerDefaultStore = (props) => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const lighttheme = useSelector((state) => state.theme.light);

  const darktheme = useSelector((state) => state.theme.dark);

  const themestate = useSelector((state) => state.theme.theme);

  const [collapse, setCollapse] = useState(false);

  const styles = useStyles();

  

  const [isOpen, setIsOpen] = useState(true);
  
  const [username, setUsername] = useState("");
 
  const [empId, setEmpId] = useState("");
  
  const History = bundleIcon(History24Filled,History24Regular);
  const drawerPosition = useSelector((state) => state.refresh.drawerPosition);
  const value = localStorage.getItem("userDrawerPosition");
  console.log("value", { value });
  
  const setValue = (value) => {
    dispatch(toggleDrawerPosition(value));
  };
  useEffect(() => {
    const storedUsername = localStorage.getItem("username"); 
    
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
       
        const empIdFromToken = decodedToken.empId;

       
        setEmpId(empIdFromToken);
      } catch (error) {
        console.error("Invalid token:", error);
      }
    }
  }, []);

  // style

  const headerStyle = collapse
  ? {
      width: `59px`,
      transition: "width 0.5s",
      borderRightStyle: "none",
    }
  : { transition: "width 0.5s", borderRightStyle: "none" }
  
  const navStyle = themestate
  ? {
      backgroundColor: darktheme.sidebarcolordark,
      cursor: "pointer",
      WebkitTapHighlightColor: "transparent",
    }
  : { cursor: "pointer", WebkitTapHighlightColor: "transparent" }


  const iconStyle = themestate
  ? { color: darktheme.fontcolordark }
  : { color: lighttheme.fontcolorlight }


  const divStyle = themestate
  ? { marginTop: "2px", color: darktheme.fontcolordark }
  : { marginTop: "2px", color: lighttheme.fontcolorlight }


  const appearanceStyle = themestate ? "inverted" : "normal";

  const classStyle = themestate ? styles.navItemdark : styles.navItemlight;

  return (
    <div className={styles.root} style={{ height: "calc(100vh - 48px)" }}>
     
      <NavDrawer
        defaultSelectedValue={drawerPosition}
       

        open={isOpen}
        type="inline"
        onOpenChange={(_, { open }) => setIsOpen(open)}
        size="small"
        className={useStyles.navdrawer}
        style={
          headerStyle
        }
      >
        

        <NavDrawerHeader
          style={
            navStyle
          }
        >
          <NavDrawerHeaderNav
            onClick={() => {
              setCollapse(!collapse);
            }}
          >
            <Button
              appearance="transparent"
              icon={
                <Navi
                  style={
                    iconStyle
                  }
                />
              }
              className={styles.hamburger}
              onClick={() => {
                setCollapse(!collapse);
              }}
            />
          </NavDrawerHeaderNav>
        </NavDrawerHeader>
        <div
          style={
            themestate
              ? { backgroundColor: darktheme.sidebarcolordark, height: "20px" }
              : { height: "20px" }
          }
        ></div>

        {collapse ? (
          <NavDrawerBody
            style={
              navStyle
            }
          >
            <Tooltip
              content={"Dashboard"}
              positioning="after"
              withArrow={true}
              appearance={appearanceStyle}
            >
              <NavItem
                target="_blank"
                icon={
                  <Dashboard
                    style={
                      iconStyle
                    }
                  />
                }
                onClick={() => {
                  navigate("/storedashboard");
                  setValue("1");
                }}
                value="1"
                className={
                  classStyle
                }
              ></NavItem>
            </Tooltip>

            <Tooltip
              content={"Generate Gate Entry"}
              positioning="after"
              withArrow={true}
              appearance={appearanceStyle}
            >
              <NavItem
                target="_blank"
                icon={
                  <LayerDiagonalPersonRegular
                    style={
                      iconStyle
                    }
                  />
                }
                onClick={() => {
                  navigate("/storeuser");
                  setValue("2");
                }}
                value="2"
                className={
                  classStyle
                }
              ></NavItem>
            </Tooltip>

            <Tooltip
              content={"Open PO"}
              positioning="after"
              withArrow={true}
              appearance={appearanceStyle}
            >
              <NavItem
                target="_blank"
                icon={
                  <OpenPo
                    style={
                      iconStyle
                    }
                  />
                }
                onClick={() => {
                  navigate("/storeopenpo");
                  setValue("4");
                }}
                value="4"
                className={
                  classStyle
                }
              ></NavItem>
            </Tooltip>

            <Tooltip
              content={"History"}
              positioning="after"
              withArrow={true}
              appearance={appearanceStyle}
            >
              <NavItem
                target="_blank"
                icon={
                  <History
                    style={
                      iconStyle
                    }
                  />
                }
                onClick={() => {
                  navigate("/storehistory");
                  setValue("3");
                }}
                value="3"
                className={
                  classStyle
                }
              ></NavItem>
            </Tooltip>

            
          </NavDrawerBody>
        ) : (
          <NavDrawerBody
            style={
              navStyle
            }
          >
            {/* DETAILS OF USER  */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "0",
                marginLeft: "-2em",
              }}
            >
              <h3>{username}</h3>
              <h4
                style={{
                  marginTop: "-1em",
                  padding: "5px",
                  fontWeight: "normal",
                }}
              >
                {empId}
              </h4>
              <h4
                style={{
                  marginTop: "-1.5em",
                  padding: "5px",
                  fontWeight: "normal",
                }}
              >
                Invoice Page
              </h4>
            </div>
            {/* 1 */}
            <div style={{ width: "100%" }}>
              <NavItem
                target="_blank"
                icon={
                  <Dashboard
                    style={
                      iconStyle
                    }
                  />
                }
                
                value="1"
                className={
                  classStyle
                }
                style={{ marginTop: "10px", fontSize: "17px" }}
                onClick={() => {
                  navigate("/storedashboard");
                  setValue("1");
                }}
              >
                <div
                  style={
                    divStyle
                  }
                >
                  Dashboard
                </div>
              </NavItem>
            </div>
            <div style={{ width: "100%" }}>
              <NavItem
                target="_blank"
                icon={
                  <LayerDiagonalPersonRegular
                    style={
                      iconStyle
                    }
                  />
                }
                onClick={() => {
                  navigate("/storeuser");
                  setValue("2");
                }}
                value="2"
                className={
                  classStyle
                }
                style={{ marginTop: "10px", fontSize: "17px" }}
              >
                <div
                  style={
                    divStyle
                  }
                >
                  Generate Gate Entry
                </div>
              </NavItem>
            </div>

            <div style={{ width: "100%" }}>
              <NavItem
                target="_blank"
                icon={
                  <OpenPo
                    style={
                      iconStyle
                    }
                  />
                }
                onClick={() => {
                  navigate("/storeopenpo");
                  setValue("4");
                }}
                value="4"
                className={
                  classStyle
                }
                style={{ marginTop: "10px", fontSize: "17px" }}
              >
                <div
                  style={
                   divStyle
                  }
                >
                  Open PO
                </div>
              </NavItem>
            </div>
            <div style={{ width: "100%" }}>
              <NavItem
                target="_blank"
                icon={
                  <History
                    style={
                      iconStyle
                    }
                  />
                }
                onClick={() => {
                  navigate("/storehistory");
                  setValue("3");
                }}
                value="3"
                className={
                  classStyle
                }
                style={{ marginTop: "10px", fontSize: "17px" }}
              >
                <div
                  style={
                    divStyle
                  }
                >
                  History
                </div>
              </NavItem>
            </div>
            
           

            
          </NavDrawerBody>
        )}

        <NavDrawerFooter
          style={
            themestate ? { backgroundColor: darktheme.sidebarcolordark } : {}
          }
        >
          {!collapse && (
            
            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <p
                style={
                  themestate
                    ? { marginBottom: "30px", color: darktheme.fontcolordark }
                    : { marginBottom: "30px", color: lighttheme.fontcolorlight }
                }
              >
                by FocusR AI
              </p>
              <p
                style={
                  themestate
                    ? { marginTop: "-20px", color: darktheme.fontcolordark }
                    : { marginTop: "-20px", color: lighttheme.fontcolorlight }
                }
              >
                V 0.0.1
              </p>
            </div>
            
          )}
          
        </NavDrawerFooter>
        
      </NavDrawer>
      

      <div
        className={styles.content}
        style={themestate ? { background: darktheme.contentpagedark } : {}}
      >
        

        {props.children}
      </div>
    </div>
  );
};

export default NavDrawerDefaultStore;
