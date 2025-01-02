


import React, { useState,useEffect } from "react";
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
  VehicleTruckProfile24Regular  ,
  VehicleTruckProfile24Filled ,
  Gavel24Filled,
  Navigation24Filled,
  Navigation24Regular,
  Gavel24Regular,
  Apps28Regular
} from "@fluentui/react-icons";
import { PiTrolleyBold ,PiTrolleyFill} from "react-icons/pi";
import {
  Button,
  makeStyles,
  shorthands,
  tokens,
  Tooltip,
} from "@fluentui/react-components";


import { jwtDecode } from "jwt-decode";
import {toggleSecondaryDrawerPosition } from "../Store/refreshSlice";
const colors = {
  darkBackground: "rgb(33,33,33)",
  hoverBackground: "#ccc",
  fontColorLight: "#fff", // Define any colors you use frequently
};

const hoverEffect = {
  "&:hover": {
    backgroundColor: colors.hoverBackground,
  },
};

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
    flex: 1,
    padding: "16px",
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
    ":hover": {
      // Optional hover styles
    },
    ":active": {
      // Optional active styles
    },
  },
  navItemlight: {
    marginTop: "10px",
    left: 0,
    ...hoverEffect,
  },
  navItemdark: {
    marginTop: "10px",
    left: 0,
    backgroundColor: colors.darkBackground,
    ...hoverEffect,
  },
  navbody: {
    backgroundColor: "black",
  },
  navfooter: {
    ...hoverEffect,
  },
});


const Person = bundleIcon(PersonFilled, PersonRegular);
const Dashboard = bundleIcon(Board24Filled, Board24Regular);
const Truck = bundleIcon(VehicleTruckProfile24Filled ,VehicleTruckProfile24Regular )
const Asn = bundleIcon (Gavel24Filled,Gavel24Regular)
const Trolly = bundleIcon(PiTrolleyFill,PiTrolleyBold);
const Announcements = bundleIcon(MegaphoneLoud20Filled, MegaphoneLoud20Regular);
const EmployeeSpotlight = bundleIcon(
  PersonLightbulb20Filled,
  PersonLightbulb20Regular,
);

const LayerDiagonalPersonRegular = bundleIcon(
  LayerDiagonalPerson24Filled,
  LayerDiagonalPerson24Regular,
);
const PersonStarRegular = bundleIcon(PersonStar24Filled, PersonStar24Regular);
const PremiumPersonRegular = bundleIcon(
  PremiumPerson24Filled,
  PremiumPerson24Regular,
);
const TableSearchRegular = bundleIcon(
  DocumentTableSearch24Filled,
  DocumentTableSearch24Regular,
);
const Navi = bundleIcon(Navigation24Filled, Navigation24Regular);

const Search = bundleIcon(PersonSearch20Filled, PersonSearch20Regular);
const PerformanceReviews = bundleIcon(
  PreviewLink20Filled,
  PreviewLink20Regular,
);
const JobPostings = bundleIcon(NotePin20Filled, NotePin20Regular);
const Interviews = bundleIcon(People20Filled, People20Regular);
const HealthPlans = bundleIcon(HeartPulse20Filled, HeartPulse20Regular);
const TrainingPrograms = bundleIcon(BoxMultiple20Filled, BoxMultiple20Regular);
const CareerDevelopment = bundleIcon(PeopleStar20Filled, PeopleStar20Regular);
const Analytics = bundleIcon(DataArea20Filled, DataArea20Regular);

const Reports = bundleIcon(
  DocumentBulletListMultiple20Filled,
  DocumentBulletListMultiple20Regular,
);
const Settings = bundleIcon(Settings20Filled, Settings20Regular);

const NavDrawerDefaultLoop = (props) => {
  const navigate = useNavigate();
  const styles = useStyles();
  const dispatch = useDispatch();

  // Theme selectors
  const lighttheme = useSelector((state) => state.theme.light);
  const darktheme = useSelector((state) => state.theme.dark);
  const themestate = useSelector((state) => state.theme.theme);

  //State
  const [collapse, setCollapse] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const [username, setUsername] = useState("");
  const [empId, setEmpId] = useState("");
  
  const drawer = useSelector((state)=>state.refresh.secondaryDrawerPosition);
  
 
  
  const setValue = (value) => {
    dispatch(toggleSecondaryDrawerPosition(value));
    
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


  // styles for Inlooop
  const drawerStyle = collapse
    ? { width: "57px", transition: "width 0.5s", borderRightStyle: "none" }
    : { transition: "width 0.5s", borderRightStyle: "none" };

  const headerStyle = themestate
    ? { backgroundColor: darktheme.sidebarcolordark, cursor: "pointer", WebkitTapHighlightColor: "transparent" }
    : { cursor: "pointer", WebkitTapHighlightColor: "transparent" };

  const iconStyle1 = {
    color: themestate ? darktheme.fontcolordark : lighttheme.fontcolorlight,
  };

  const Footer = themestate ? { backgroundColor: darktheme.sidebarcolordark } : {}

  const footerStyle = themestate
  ? { marginBottom: "30px", color: darktheme.fontcolordark }
  : { marginBottom: "30px", color: lighttheme.fontcolorlight };
  

  const sidebarStyle = {
    backgroundColor: themestate ? darktheme.sidebarcolordark : { height: "20px" },

  };

  const commonStyle = { marginTop: "10px", fontSize: "17px" };
  
  const commonTextStyle = {
    marginTop: "2px",
    color: themestate ? darktheme.fontcolordark : lighttheme.fontcolorlight,
  };

  const iconStyle = (iconColor) => ({
    fontSize: "24px",
    color: iconColor,
  });

  const tooltipAppearance = themestate ? "inverted" : "normal";
  const getNavItemClass = () => (themestate ? styles.navItemdark : styles.navItemlight);

  
  const handleNavClick = (path, value) => {
    navigate(path);
    setValue(value);
  };


  return (
    <div className={styles.root} style={{ height: "calc(100vh - 48px)" }}>
     
      <NavDrawer
        defaultSelectedValue={drawer}
        defaultSelectedCategoryValue="1"
        open={isOpen}
        type="inline"
        onOpenChange={(_, { open }) => setIsOpen(open)}
        size="small"
        className={useStyles.navdrawer}
        style={drawerStyle}
      >
        

        <NavDrawerHeader
          style={headerStyle}
        >
          <NavDrawerHeaderNav
            onClick={() => {
              setCollapse(!collapse);
            }}
          >
            <Button
              appearance="transparent"
              icon={<Navi style={iconStyle1} />}
              className={styles.hamburger}
              onClick={() => {
                setCollapse(!collapse);
              }}
            />
          </NavDrawerHeaderNav>
        </NavDrawerHeader>
        <div
          style={sidebarStyle
          }
        ></div>

        {collapse ? (
    <NavDrawerBody
      style={sidebarStyle}
    >
      
      <Tooltip content="Purchase Requisition" positioning="after" withArrow appearance={tooltipAppearance}>
        <NavItem
          target="_blank"
          icon={<Dashboard style={iconStyle(themestate ? darktheme.fontcolordark : lighttheme.fontcolorlight)} />}
          value="1"
          className={getNavItemClass()}
          style={commonStyle}
          onClick={() => handleNavClick("/inloop", "1")}
        >
          <div style={commonTextStyle}>Purchase Requisition</div>
        </NavItem>
      </Tooltip>

     
      <Tooltip content="Purchase Order" positioning="after" withArrow appearance={tooltipAppearance}>
        <NavItem
          target="_blank"
          icon={<Trolly style={iconStyle(themestate ? darktheme.fontcolordark : lighttheme.fontcolorlight)} />}
          value="2"
          className={getNavItemClass()}
          style={commonStyle}
          onClick={() => handleNavClick("/po", "2")}
        >
          <div style={commonTextStyle}>Purchase Order</div>
        </NavItem>
      </Tooltip>

      
      <Tooltip content="ASN Creation" positioning="after" withArrow appearance={tooltipAppearance}>
        <NavItem
          target="_blank"
          icon={<Truck style={iconStyle(themestate ? darktheme.fontcolordark : lighttheme.fontcolorlight)} />}
          value="3"
          className={getNavItemClass()}
          style={commonStyle}
          onClick={() => handleNavClick("/asn", "3")}
        >
          <div style={commonTextStyle}>ASN Status</div>
        </NavItem>
      </Tooltip>

      
      <Tooltip content="AP Invoice OCR" positioning="after" withArrow appearance={tooltipAppearance}>
        <NavCategory value="4">
          <NavCategoryItem
            target="_blank"
            icon={<Apps28Regular style={iconStyle(themestate ? darktheme.fontcolordark : lighttheme.fontcolorlight)} />}
            value="4"
            className={getNavItemClass()}
            style={commonStyle}
            onClick={() => setValue("4")}
          >
            AP Invoice OCR
          </NavCategoryItem>
        </NavCategory>
      </Tooltip>
    </NavDrawerBody>
  ) : (
          <NavDrawerBody
            style={sidebarStyle
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
                Buyer
              </h4>
            </div>
            
            <NavItem
                target="_blank"
                icon={
                  <Dashboard
                  style={iconStyle(themestate ? darktheme.fontcolordark : lighttheme.fontcolorlight)}
                  />
                }
                
                value="1"
                className={getNavItemClass()}
                style={{ marginTop: "10px", fontSize: "14px" }}
                onClick={() => {
                  navigate("/inloop");
                  setValue("1");
                }}
              >
                <div
                  
                    style={{fontSize:"17px"}}
                  
                >
                  Purchase requistion
                </div>
              </NavItem>
              
              
              <NavItem
                target="_blank"
                icon={
                  <Trolly 
                   
                      style={iconStyle(themestate ? darktheme.fontcolordark : lighttheme.fontcolorlight)}
      
                  />
                }
                
                value="2"
                className={getNavItemClass()}
                style={{ marginTop: "10px", fontSize: "14px" }}
                onClick={() => {
                  navigate("/po");
                  setValue("2");
                }}
              >
                <div
                  style={{fontSize:"17px"}}
                  
                >
                  Purchase Order
                  
                </div>
              </NavItem>

              <NavItem
                target="_blank"
                icon={
                  <Truck
                  style={iconStyle(themestate ? darktheme.fontcolordark : lighttheme.fontcolorlight)}
                  />
                }
                
                value="3"
                className={getNavItemClass()}
                style={{ marginTop: "10px", fontSize: "14px" }}
                
                onClick={() => {
                  navigate("/asn");
                  setValue("3");
                }}
              >
                <div
                  style={{fontSize:"17px"}}
                >
                  ASN Status
                </div>
              </NavItem>
              
                <NavCategory value="4">
                  <NavCategoryItem
                    target="_blank"
                    icon={
                      <Apps28Regular
                      style={iconStyle(themestate ? darktheme.fontcolordark : lighttheme.fontcolorlight)}
                      />
                    }
                    
                    value="4"
                    className={getNavItemClass()}
                    style={{ marginTop: "10px", fontSize: "17px" }}
                    onClick={() => {
                      setValue("4");
                    }}
                  >
                    AP Invoice OCR 
                  </NavCategoryItem>
                  <NavSubItemGroup>
                    <NavSubItem
                      value="5"
                      style={{ marginTop: "10px", fontSize: "17px" }}
                      onClick={() => {
                        navigate("/approve");
                        setValue("5");
                      }}
                    >
                     Approve
                    </NavSubItem>
                    <NavSubItem
                      value="6"
                      style={{ marginTop: "10px", fontSize: "17px" }}
                      onClick={() => {
                        navigate("/ai");
                        setValue("6");
                      }}
                    >
                      AI Identified
                    </NavSubItem>

                    <NavSubItem
                      value="7"
                      style={{ marginTop: "10px", fontSize: "17px" }}
                      onClick={() => {
                        navigate("/issuefix");
                        setValue("7");
                      }}
                    >
                      Fix
                    </NavSubItem>
                  </NavSubItemGroup>
                </NavCategory>
                
              </div>
            
          </NavDrawerBody>
        )}

        <NavDrawerFooter
          style={
            Footer
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
                  footerStyle
                }
              >
                by FocusR AI
              </p>
              <p
                style={
                  footerStyle
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

export default NavDrawerDefaultLoop;

