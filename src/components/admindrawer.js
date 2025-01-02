

import React, { useState,useEffect } from "react";
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
  Navigation24Regular,Apps28Regular
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
    // Replaced shorthands.overflow with full CSS property
    overflow: "hidden",

    position: "fixed",
    left: 0,
    width: "100%",
    height: "100%",
    display: "flex",

    backgroundColor: "#fff",
  },
  content: {
    // Replaced shorthands.flex(1) with flex: 1
    flex: 1,
    // Replaced shorthands.padding("16px") with padding: "16px"
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


const Person = bundleIcon(PersonFilled, PersonRegular);
const Dashboard = bundleIcon(Board24Filled, Board24Regular);
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

const NavDrawerDefaultAdmin = (props) => {
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

  const tabstyle = 
  {
    width: { true: "56px", false: undefined }[collapse],
    transition: "width 0.5s",
    borderRightStyle: "none"
  }
  
  
  const tabstyle1 = {
    backgroundColor: { true: darktheme.sidebarcolordark, false: undefined }[themestate],
    cursor: "pointer",
    WebkitTapHighlightColor: "transparent"
  };
  

  const tabstyle2 = {
    color: { true: darktheme.fontcolordark, false: lighttheme.fontcolorlight }[themestate]
  };
  

  const tabstyle5 = {
    color: { true: darktheme.fontcolordark, false: lighttheme.fontcolorlight }[themestate]
  };
  

  const tabstyle6 = styles[{ true: "navItemdark", false: "navItemlight" }[themestate]];

  const tabstyle7 = {
    backgroundColor: { true: darktheme.sidebarcolordark, false: undefined }[themestate]
  };
  
 

  const tabstyle8 = {
    marginBottom: "30px",
    color: { true: darktheme.fontcolordark, false: lighttheme.fontcolorlight }[themestate]
  };
  

  
  const tabstyle10 = {
    background: { true: darktheme.contentpagedark, false: undefined }[themestate]
  };
  
  const tabstyle9 = {
    marginTop: "-20px",
    color: { true: darktheme.fontcolordark, false: lighttheme.fontcolorlight }[themestate]
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
        style={tabstyle}
      >
       

        <NavDrawerHeader
          style={tabstyle1}
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
                  style={tabstyle2}
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
          style={tabstyle2}
        ></div>

        {collapse ? (
          <NavDrawerBody
            style={tabstyle1}
          >
            
            <NavCategory value="1">
                  <NavCategoryItem
                    target="_blank"
                    icon={
                      <Apps28Regular
                        style={tabstyle5}
                      />
                    }
                   
                    value="2"
                    className={tabstyle6}
                    style={{ marginTop: "10px", fontSize: "17px" }}
                    onClick={() => {
                      setValue("2");
                    }}
                  >
                    Control Center
                  </NavCategoryItem>
                  <NavSubItemGroup>
                    <NavSubItem
                      value="3"
                      style={{ marginTop: "10px", fontSize: "17px" }}
                      onClick={() => {
                        navigate("/matrimony");
                        setValue("3");
                      }}
                    >
                     Matrimony.com
                    </NavSubItem>
                    <NavSubItem
                      value="4"
                      style={{ marginTop: "10px", fontSize: "17px" }}
                      onClick={() => {
                        navigate("/user");
                        setValue("4");
                      }}
                    >
                      User Management
                    </NavSubItem>
                  </NavSubItemGroup>
                </NavCategory>
          </NavDrawerBody>
        ) : (
          <NavDrawerBody
            style={tabstyle1}  
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
                Admin Page
              </h4>
            </div>
            
                <NavCategory value="1">
                  <NavCategoryItem
                    target="_blank"
                    icon={
                      <Apps28Regular
                        style={tabstyle5}
                      />
                    }
                    
                    value="2"
                    className={tabstyle6}
                    style={{ marginTop: "10px", fontSize: "17px" }}
                    onClick={() => {
                      setValue("2");
                    }}
                  >
                    Control Center
                  </NavCategoryItem>
                  <NavSubItemGroup>
                    <NavSubItem
                      value="3"
                      style={{ marginTop: "10px", fontSize: "17px" }}
                      onClick={() => {
                        navigate("/matrimony");
                        setValue("3");
                      }}
                    >
                     Matrimony.com
                    </NavSubItem>
                    <NavSubItem
                      value="4"
                      style={{ marginTop: "10px", fontSize: "17px" }}
                      onClick={() => {
                        navigate("/user");
                        setValue("4");
                      }}
                    >
                      User Management
                    </NavSubItem>
                  </NavSubItemGroup>
                </NavCategory>
              </div>
            {/* </div> */}
          </NavDrawerBody>
        )}

        <NavDrawerFooter
          style={tabstyle7}
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
                style={tabstyle8}
              >
                by FocusR AI
              </p>
              <p
                style={tabstyle9}
              >
                V 0.0.1
              </p>
            </div>
            
          )}
          
        </NavDrawerFooter>
       
      </NavDrawer>
      

      <div
        className={styles.content}
        style={tabstyle10}
      >
        

        {props.children}
      </div>
    </div>
  );
};

export default NavDrawerDefaultAdmin;
