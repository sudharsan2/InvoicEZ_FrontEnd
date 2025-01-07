

import React, { useState,useEffect  } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector} from "react-redux";
import {
  NavCategory,
  NavCategoryItem,
  NavDrawer,
  NavDrawerBody,
  NavDrawerFooter,
  NavDrawerHeader,
  NavDrawerHeaderNav,
  NavItem,
  NavSubItem,
  NavSubItemGroup,
} from "@fluentui/react-nav-preview";
import {
  bundleIcon,
  Navigation24Filled,
  Navigation24Regular,
  Gavel24Filled ,
  Gavel24Regular,
  VehicleTruckProfile24Regular  ,
  VehicleTruckProfile24Filled ,Apps28Regular,Timer24Filled,Timer24Regular
} from "@fluentui/react-icons";

import {
  Button,
  makeStyles,
  shorthands,
  tokens,
  
 
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
});



const Truck = bundleIcon(VehicleTruckProfile24Filled ,VehicleTruckProfile24Regular )

const Navi = bundleIcon(Navigation24Filled, Navigation24Regular);



const Asn = bundleIcon (Gavel24Filled,Gavel24Regular)


const Status = bundleIcon(Timer24Filled,Timer24Regular);

const NavDrawerQuotationLoop = (props) => {
  const navigate = useNavigate();

  

  const lighttheme = useSelector((state) => state.theme.light);

  const darktheme = useSelector((state) => state.theme.dark);

  const themestate = useSelector((state) => state.theme.theme);

  const [collapse, setCollapse] = useState(false);

  const styles = useStyles();

 

  const [isOpen, setIsOpen] = useState(true);
  
  const [username, setUsername] = useState("");
  
  const [empId, setEmpId] = useState("");
  const [value,setValue] = useState("");

  console.lpg(value);

  // Style 
  const headerStyle = collapse
  ? {
      width: `59px`,
      transition: "width 0.5s",
      borderRightStyle: "none",
    }
  : { transition: "width 0.5s", borderRightStyle: "none" }

  const themeStyle = themestate
  ? {
      backgroundColor: darktheme.sidebarcolordark,
      cursor: "pointer",
      WebkitTapHighlightColor: "transparent",
    }
  : { cursor: "pointer", WebkitTapHighlightColor: "transparent" }

  const iconStyle = themestate
  ? { color: darktheme.fontcolordark }
  : { color: lighttheme.fontcolorlight };

  const bodyStyle = themestate
  ? { backgroundColor: darktheme.sidebarcolordark, height: "20px" }
  : { height: "20px" };

  const divStyle = themestate
                ? {
                    backgroundColor: darktheme.sidebarcolordark,
                    cursor: "pointer",
                    WebkitTapHighlightColor: "transparent",
                  }
                : { cursor: "pointer", WebkitTapHighlightColor: "transparent" }


  const newStyle = themestate
  ? { marginTop: "2px", color: darktheme.fontcolordark }
  : { marginTop: "2px", color: lighttheme.fontcolorlight }

  const classStyle = themestate ? styles.navItemdark : styles.navItemlight

  const backStyle = themestate ? { backgroundColor: darktheme.sidebarcolordark } : {}

  const footerStyle1 = themestate
  ? { marginBottom: "30px", color: darktheme.fontcolordark }
  : { marginBottom: "30px", color: lighttheme.fontcolorlight }

  const footerStyle2 = themestate
  ? { marginTop: "-20px", color: darktheme.fontcolordark }
  : { marginTop: "-20px", color: lighttheme.fontcolorlight }

 const footerStyle3 = themestate ? { background: darktheme.contentpagedark } : {}
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
  return (
    <div className={styles.root} style={{ height: "calc(100vh - 48px)" }}>
     
      <NavDrawer
        defaultSelectedValue="1"
        defaultSelectedCategoryValue="1"
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
            themeStyle
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
            bodyStyle
          }
        ></div>

        {collapse ? (
          <NavDrawerBody
            style={
              divStyle
            }
          >
                        <NavCategory value="1">
                  <NavCategoryItem
                    target="_blank"
                    icon={
                      <Apps28Regular
                        style={
                        iconStyle
                        }
                      />
                    }
                    
                    value="2"
                    className={
                      classStyle
                    }
                    style={{ marginTop: "10px", fontSize: "17px" }}
                    onClick={() => {
                      setValue("2");
                    }}
                  >
                    AP Invoice OCR
                  </NavCategoryItem>
                  <NavSubItemGroup>
                    <NavSubItem
                      value="3"
                      style={{ marginTop: "10px", fontSize: "17px" }}
                      onClick={() => {
                        navigate("/m");
                        setValue("3");
                      }}
                    >
                     Approve
                    </NavSubItem>
                    <NavSubItem
                      value="4"
                      style={{ marginTop: "10px", fontSize: "17px" }}
                      onClick={() => {
                      
                        setValue("4");
                      }}
                    >
                      AI Identified
                    </NavSubItem>
                    <NavSubItem
                      value="4"
                      style={{ marginTop: "10px", fontSize: "17px" }}
                      onClick={() => {
                      
                        setValue("4");
                      }}
                    >
                     Fix
                    </NavSubItem>
                  </NavSubItemGroup>
                </NavCategory>
          </NavDrawerBody>
        ) : (
          <NavDrawerBody
            style={
              divStyle
            }
          >
            {/* DETAILS OF USER  */}
            <div style={{ width: "100%" }}>
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
                Supplier
              </h4>
            </div>
            <NavItem
                target="_blank"
                icon={
                  <Asn
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
                  navigate("/supplier");
                  setValue("1");
                }}
              >
                <div
                  style={
                   newStyle
                  }
                >
                  Quotation
                </div>
              </NavItem>
            
              <NavItem
                target="_blank"
                icon={
                  <Truck
                    style={
                      iconStyle
                    }
                  />
                }
                
                value="2"
                className={
                 classStyle
                }
                style={{ marginTop: "10px", fontSize: "17px" }}
                onClick={() => {
                  navigate("/asncreate");
                  setValue("2");
                }}
              >
                <div
                  style={
                    newStyle
                  }
                >
                  ASN Creation
                </div>
              </NavItem>
              <NavItem
                target="_blank"
                icon={
                  <Status
                    style={
                      iconStyle
                    }
                  />
                }
                
                value="3"
                className={
                 classStyle
                }
                style={{ marginTop: "10px", fontSize: "17px" }}
                onClick={() => {
                  navigate("/asnstatus");
                  setValue("3");
                }}
              >
                <div
                  style={
                    newStyle
                  }
                >
                  ASN Shipment Status
                </div>
              </NavItem>
              </div>
            
          </NavDrawerBody>
        )}

        <NavDrawerFooter
          style={
           backStyle
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
                  footerStyle1
                }
              >
                by FocusR AI
              </p>
              <p
                style={
                  footerStyle2
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
        style={footerStyle3}
      >
        

        {props.children}
      </div>
    </div>
  );
};

export default NavDrawerQuotationLoop;
