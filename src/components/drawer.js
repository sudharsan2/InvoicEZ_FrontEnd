import React, { useState ,useEffect} from "react";
import { useNavigate,} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toggleDrawerPosition } from "../Store/refreshSlice";
import {
 
  NavDrawer,
  NavDrawerBody,
  NavDrawerFooter,
  NavDrawerHeader,
  NavDrawerHeaderNav,
 
  NavItem,
  
} from "@fluentui/react-nav-preview";
import {
  Board24Filled,
  Board24Regular,
  
  
  bundleIcon,
  
  Navigation24Filled,
  Navigation24Regular,

  
  TargetArrow24Filled,
  TargetArrow24Regular,
  TargetDismiss24Filled,
  TargetDismiss24Regular,
  
  VehicleTruckProfile24Filled,
  VehicleTruckProfile24Regular,
  Form28Regular,
  Form28Filled,
  DocumentBulletListMultiple24Filled,
  DocumentBulletListMultiple24Regular,
  History24Regular,
  History24Filled,
  DatabaseSearch24Filled,
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

const useStyles = makeStyles({
  root: {
    overflow: "hidden",
   

    position: "fixed",
    left: 0,
    width: "100%",
    height: "100%",
    display: "flex",

    backgroundColor: "#fff",
  },
  content: {
    flex:1,
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
const History = bundleIcon(History24Filled,History24Regular);

const OpenPO = bundleIcon(DatabaseSearch24Filled,DatabaseSearch24Regular)




const Navi = bundleIcon(Navigation24Filled, Navigation24Regular);
const Match = bundleIcon(TargetArrow24Filled,TargetArrow24Regular);
const Multiple = bundleIcon(DocumentBulletListMultiple24Filled,DocumentBulletListMultiple24Regular)
const Fix = bundleIcon(TargetDismiss24Filled, TargetDismiss24Regular);
const Summary = bundleIcon(Form28Filled,Form28Regular);

const Truck = bundleIcon(VehicleTruckProfile24Filled,VehicleTruckProfile24Regular);


const NavDrawerDefault = (props) => {
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
  

  const drawerPosition = useSelector((state) => state.refresh.drawerPosition);
  
  const value = localStorage.getItem("userDrawerPosition");
  console.log("value", { value });
 
  const setValue = (value) => {
    dispatch(toggleDrawerPosition(value));
  };
  useEffect(() => {
    const storedUsername = localStorage.getItem("username"); // Fetch username from localStorage
    // const storedrole = localStorage.getItem('role')
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


  // Styles 

  const getDrawerStyles = () => ({
    transition: "width 0.5s",
    borderRightStyle: "none",
    ...(collapse && { width: "75px" }),  // Only apply width if collapse is true
  });
  
  // ---- NavDrawerHeader ----
  const getNavDrawerHeaderStyle = () => ({
    cursor: "pointer",
    WebkitTapHighlightColor: "transparent",
    ...(themestate && { backgroundColor: darktheme.sidebarcolordark }),
  });
  
  // ---- Navi Icon Style ----
  const iconStyle = {
    color: themestate ? darktheme.fontcolordark : lighttheme.fontcolorlight,
  };
  
  // ---- divStyle ----
  const divStyle = {
    height: "20px",
    ...(themestate && { backgroundColor: darktheme.sidebarcolordark }),
  };
  
  // ---- NavDrawerBody Style ----
  const navDrawerBodyStyle = {
    cursor: "pointer",
    WebkitTapHighlightColor: "transparent",
    ...(themestate && { backgroundColor: darktheme.sidebarcolordark }),
  };
  
  // ---- Appearance ----
  const appearanceValue = themestate ? "inverted" : "normal";
  
  // ---- Nav Item Class ----
  const navItemClass = themestate ? styles.navItemdark : styles.navItemlight;
  
  // ---- Footer Style ----
  const footerStyle = themestate ? { backgroundColor: darktheme.sidebarcolordark } : {};
  
  // ---- Body Style ----
  const bodyStyle = {
    marginTop: "0px",
    color: themestate ? darktheme.fontcolordark : lighttheme.fontcolorlight,
  };
  
  // ---- Base Style ----
  const baseStyle = {
    marginTop: "-20px",
    color: themestate ? darktheme.fontcolordark : lighttheme.fontcolorlight,
  };
  

  return (
    <div className={styles.root} style={{ height: "calc(100vh - 48px)" }}>
      
      <NavDrawer
        defaultSelectedValue={drawerPosition}
       
        open={isOpen}
        type="inline"
        onOpenChange={(_, { open }) => setIsOpen(open)}
        size="small"
        className={useStyles.navdrawer}
        style={getDrawerStyles()}
      >
        

        <NavDrawerHeader
          style={getNavDrawerHeaderStyle()}
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
                  
                    style={iconStyle}
                  
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
            divStyle
          }
        ></div>

        {collapse ? (
          <NavDrawerBody
            
              style={navDrawerBodyStyle}
            
          >
            <Tooltip
              content={"Home"}
              positioning="after"
              withArrow={true}
              appearance={appearanceValue}
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
                  navigate("/dashboard");
                  setValue("1");
                }}
                value="1"
                className={
                  navItemClass
                }
              ></NavItem>
            </Tooltip>

            <Tooltip
              content={"Gate Entry"}
              positioning="after"
              withArrow={true}
              appearance={appearanceValue}
            >
              <NavItem
                target="_blank"
                icon={
                  <Truck
                    style={
                      iconStyle
                    }
                  />
                }
                onClick={() => {
                  navigate("/gateentry");
                  setValue("2");
                }}
                value="2"
                className={
                  navItemClass
                }
              ></NavItem>
            </Tooltip>

            <Tooltip
              content={"Summary"}
              positioning="after"
              withArrow={true}
              appearance={appearanceValue}
            >
              <NavItem
                target="_blank"
                icon={
                  <Summary
                    style={
                      iconStyle
                    }
                  />
                }
                onClick={() => {
                  navigate("/summary")
                  setValue("6");
                }}
                value="6"
                className={
                  navItemClass
                }
              ></NavItem>
            </Tooltip>

            <Tooltip
              content={"Match Found"}
              positioning="after"
              withArrow={true}
              appearance={appearanceValue}
            >
              <NavItem
                target="_blank"
                icon={
                  <Match
                    style={
                      iconStyle
                    }
                  />
                }
                onClick={() => {
                  navigate("/approve");
                  setValue("3");
                }}
                value="3"
                className={
                  navItemClass
                }
              ></NavItem>
            </Tooltip>

            <Tooltip
              content={"Multiple Match Found"}
              positioning="after"
              withArrow={true}
              appearance={appearanceValue}
            >
              <NavItem
                target="_blank"
                icon={
                  <Multiple
                    style={
                      iconStyle
                    }
                  />
                }
                onClick={() => {
                  navigate("/ai");
                  setValue("4");
                }}
                value="4"
                className={
                  navItemClass
                }
              ></NavItem>
            </Tooltip>

            <Tooltip
              content={"No Match Found"}
              positioning="after"
              withArrow={true}
              appearance={appearanceValue}
            >
              <NavItem
                target="_blank"
                icon={
                  <Fix
                    style={
                      iconStyle
                    }
                  />
                }
                onClick={() => {
                  navigate("/issuefix");
                  setValue("5");
                }}
                value="5"
                className={
                  navItemClass
                }
              ></NavItem>
            </Tooltip>
            <Tooltip
              content={"Open PO"}
              positioning="after"
              withArrow={true}
              appearance={appearanceValue}
            >
              <NavItem
                target="_blank"
                icon={
                  <OpenPO
                    style={
                      iconStyle
                    }
                  />
                }
                onClick={() => {
                  navigate("/openpo");
                  setValue("8");
                }}
                value="8"
                className={
                  navItemClass
                }
              ></NavItem>
            </Tooltip>

            <Tooltip
              content={"History"}
              positioning="after"
              withArrow={true}
              appearance={appearanceValue}
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
                  navigate("/history");
                  setValue("7");
                }}
                value="7"
                className={
                  navItemClass
                }
              ></NavItem>
            </Tooltip>

           

            
          </NavDrawerBody>
        ) : (
          <NavDrawerBody
            style={
              navDrawerBodyStyle
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
                  navItemClass
                }
                style={{ marginTop: "10px", fontSize: "17px" }}
                onClick={() => {
                  navigate("/dashboard");
                  setValue("1");
                }}
              >
                <div
                  style={
                    
                      bodyStyle
                  }
                >
                  Home
                </div>
              </NavItem>
            </div>
            <div style={{ width: "100%" }}>
              <NavItem
                target="_blank"
                icon={
                  <Truck
                    style={
                      iconStyle
                    }
                  />
                }
                onClick={() => {
                  navigate("/gateentry");
                  setValue("2");
                }}
                value="2"
                className={
                  navItemClass
                }
                style={{ marginTop: "10px", fontSize: "17px" }}
              >
                <div
                  style={
                   bodyStyle
                  }
                >
                  Gate Entry
                </div>
              </NavItem>
            </div>
            <div style={{ width: "100%" }}>
              <NavItem
                target="_blank"
                icon={
                  <Summary
                    style={
                      iconStyle
                    }
                  />
                }
                onClick={() => {
                  navigate("/summary");
                  setValue("6");
                }}
                value="6"
                className={
                  navItemClass
                }
                style={{ marginTop: "10px", fontSize: "17px" }}
              >
                <div
                  style={
                   bodyStyle
                  }
                >
                  Summary
                </div>
              </NavItem>
            </div>
            {/* 2 */}
            <div style={{ width: "100%" }}>
              <NavItem
                target="_blank"
                icon={
                  <Match
                    style={
                      iconStyle
                    }
                  />
                }
                onClick={() => {
                  navigate("/approve");
                  setValue("3");
                }}
                value="3"
                className={
                  navItemClass
                }
                style={{ marginTop: "10px", fontSize: "17px" }}
              >
                <div
                  style={
                    
                     bodyStyle
                  }
                >
                  Match Found
                </div>
              </NavItem>
            </div>
            <div style={{ width: "100%" }}>
              <NavItem
                target="_blank"
                icon={
                  <Multiple
                    style={
                      iconStyle
                    }
                  />
                }
                onClick={() => {
                  navigate("/ai");
                  setValue("4");
                }}
                value="4"
                className={
                  navItemClass
                }
                style={{ marginTop: "10px", fontSize: "17px" }}
              >
                <div
                  style={
                   bodyStyle
                  }
                >
                  Multiple Match Found
                </div>
              </NavItem>
            </div>
            <div style={{ width: "100%" }}>
              <NavItem
                target="_blank"
                icon={
                  <Fix
                    style={
                      iconStyle
                    }
                  />
                }
                onClick={() => {
                  navigate("/issuefix");
                  setValue("5");
                }}
                value="5"
                className={
                  navItemClass
                }
                style={{ marginTop: "10px", fontSize: "17px" }}
              >
                <div
                  style={
                   bodyStyle
                  }
                >
                  No Match Found
                </div>
              </NavItem>
            </div>

            {/* openpo */}
            <div style={{ width: "100%" }}>
              <NavItem
                target="_blank"
                icon={
                  <OpenPO
                    style={
                      iconStyle
                    }
                  />
                }
                onClick={() => {
                  navigate("/openpo");
                  setValue("8");
                }}
                value="8"
                className={
                  navItemClass
                }
                style={{ marginTop: "10px", fontSize: "17px" }}
              >
                <div
                  style={
                   bodyStyle
                  }
                >
                  Open PO
                </div>
              </NavItem>
            </div>

            {/* History */}

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
                  navigate("/history");
                  setValue("7");
                }}
                value="7"
                className={
                  navItemClass
                }
                style={{ marginTop: "10px", fontSize: "17px" }}
              >
                <div
                  style={
                   bodyStyle
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
            footerStyle
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
                 baseStyle
                }
              >
                by FocusR AI
              </p>
              <p
                style={
                  baseStyle
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

export default NavDrawerDefault;
