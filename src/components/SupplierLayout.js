

import React, { useState,useEffect  } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
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
  Board24Filled,
  Board24Regular,
  BoxMultiple20Filled,
  BoxMultiple20Regular,
  DataArea20Filled,
  DataArea20Regular,
  DocumentBulletListMultiple20Filled,
  DocumentBulletListMultiple20Regular,
  HeartPulse20Filled,
  HeartPulse20Regular,
  MegaphoneLoud20Filled,
  MegaphoneLoud20Regular,
  
  NotePin20Filled,
  NotePin20Regular,
  People20Filled,
  People20Regular,
  PeopleStar20Filled,
  PeopleStar20Regular,
  PersonFilled,
  PersonLightbulb20Filled,
  PersonLightbulb20Regular,
  PersonRegular,
  PersonSearch20Filled,
  PersonSearch20Regular,
  PreviewLink20Filled,
  PreviewLink20Regular,
  Settings20Filled,
  Settings20Regular,
  bundleIcon,
  LayerDiagonalPerson24Filled,
  LayerDiagonalPerson24Regular,
  PersonStar24Filled,
  PersonStar24Regular,
  PremiumPerson24Filled,
  PremiumPerson24Regular,
  DocumentTableSearch24Filled,
  DocumentTableSearch24Regular,
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
  useId,
 
} from "@fluentui/react-components";


import { jwtDecode } from "jwt-decode";

const useStyles = makeStyles({
  root: {
    // ...shorthands.border("2px", "solid", "#ccc"),
    ...shorthands.overflow("hidden"),
    // marginTop:"-2px",
    // marginLeft:"-2px",

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
    // backgroundColor: navItemTokens.backgroundColor,
    // color: tokens.colorNeutralForeground2,
    textDecorationLine: "none",
    marginLeft: "5px",
    marginTop: "10px",

    ":hover": {
      //   backgroundColor: navItemTokens.backgroundColorHover,
    },
    ":active": {
      //   backgroundColor: navItemTokens.backgroundColorPressed,
    },
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
          collapse
            ? {
                width: `59px`,
                transition: "width 0.5s",
                borderRightStyle: "none",
              }
            : { transition: "width 0.5s", borderRightStyle: "none" }
        }
      >
        
        <NavDrawerHeader
          style={
            themestate
              ? {
                  backgroundColor: darktheme.sidebarcolordark,
                  cursor: "pointer",
                  WebkitTapHighlightColor: "transparent",
                }
              : { cursor: "pointer", WebkitTapHighlightColor: "transparent" }
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
                    themestate
                      ? { color: darktheme.fontcolordark }
                      : { color: lighttheme.fontcolorlight }
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
              themestate
                ? {
                    backgroundColor: darktheme.sidebarcolordark,
                    cursor: "pointer",
                    WebkitTapHighlightColor: "transparent",
                  }
                : { cursor: "pointer", WebkitTapHighlightColor: "transparent" }
            }
          >
                        <NavCategory value="1">
                  <NavCategoryItem
                    target="_blank"
                    icon={
                      <Apps28Regular
                        style={
                          themestate
                            ? { color: darktheme.fontcolordark }
                            : { color: lighttheme.fontcolorlight }
                        }
                      />
                    }
                    
                    value="2"
                    className={
                      themestate ? styles.navItemdark : styles.navItemlight
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
              themestate
                ? {
                    backgroundColor: darktheme.sidebarcolordark,
                    cursor: "pointer",
                    WebkitTapHighlightColor: "transparent",
                  }
                : { cursor: "pointer", WebkitTapHighlightColor: "transparent" }
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
                      themestate
                        ? { color: darktheme.fontcolordark }
                        : { color: lighttheme.fontcolorlight }
                    }
                  />
                }
                
                value="1"
                className={
                  themestate ? styles.navItemdark : styles.navItemlight
                }
                style={{ marginTop: "10px", fontSize: "17px" }}
                onClick={() => {
                  navigate("/supplier");
                  setValue("1");
                }}
              >
                <div
                  style={
                    themestate
                      ? { marginTop: "2px", color: darktheme.fontcolordark }
                      : { marginTop: "2px", color: lighttheme.fontcolorlight }
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
                      themestate
                        ? { color: darktheme.fontcolordark }
                        : { color: lighttheme.fontcolorlight }
                    }
                  />
                }
                
                value="2"
                className={
                  themestate ? styles.navItemdark : styles.navItemlight
                }
                style={{ marginTop: "10px", fontSize: "17px" }}
                onClick={() => {
                  navigate("/asncreate");
                  setValue("2");
                }}
              >
                <div
                  style={
                    themestate
                      ? { marginTop: "2px", color: darktheme.fontcolordark }
                      : { marginTop: "2px", color: lighttheme.fontcolorlight }
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
                      themestate
                        ? { color: darktheme.fontcolordark }
                        : { color: lighttheme.fontcolorlight }
                    }
                  />
                }
                
                value="3"
                className={
                  themestate ? styles.navItemdark : styles.navItemlight
                }
                style={{ marginTop: "10px", fontSize: "17px" }}
                onClick={() => {
                  navigate("/asnstatus");
                  setValue("3");
                }}
              >
                <div
                  style={
                    themestate
                      ? { marginTop: "2px", color: darktheme.fontcolordark }
                      : { marginTop: "2px", color: lighttheme.fontcolorlight }
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

export default NavDrawerQuotationLoop;
