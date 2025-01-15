import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
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
  
  bundleIcon,
  Navigation24Filled,
  Navigation24Regular,Apps28Regular,
  People24Regular,
  Board24Regular
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




const Navi = bundleIcon(Navigation24Filled, Navigation24Regular);



const NavDrawerDefaultAdmin = (props) => {
  const navigate = useNavigate();

  

  const lighttheme = useSelector((state) => state.theme.light);

  const darktheme = useSelector((state) => state.theme.dark);

  const themestate = useSelector((state) => state.theme.theme);

  const iconStyle = {
    color: themestate ? darktheme.fontcolordark : lighttheme.fontcolorlight,
  };

  const [collapse, setCollapse] = useState(false);

  const styles = useStyles();

  

  const [isOpen, setIsOpen] = useState(true);
  const [username, setUsername] = useState("");
  const [empId, setEmpId] = useState("");
  const [value,setValue] = useState("");


  console.log(value);
   
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


  // Stytles

  const footerStyle = themestate
  ? { marginBottom: "20px", color: darktheme.fontcolordark }
  : { marginBottom: "20px", color: lighttheme.fontcolorlight }


  const classStyle = themestate ? styles.navItemdark : styles.navItemlight

  const headerStyle = {
    cursor: "pointer",
    WebkitTapHighlightColor: "transparent",
    ...(themestate && { backgroundColor: darktheme.sidebarcolordark })
  };

  const newStyle = themestate
  ? { color: darktheme.fontcolordark }
  : { color: lighttheme.fontcolorlight }
  
  const divStyle = collapse
  ? {
      width: `56px`,
      transition: "width 0.5s",
      borderRightStyle: "none",
    }
  : { transition: "width 0.5s", borderRightStyle: "none" }

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
          divStyle
        }
      >
       

        <NavDrawerHeader
          style={
            headerStyle
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
                    newStyle
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
             headerStyle
            }
          >
            
            <NavCategory value="1">
                  <NavCategoryItem
                    target="_blank"
                    icon={
                      <Apps28Regular
                        style={
                          newStyle
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
                    <Board24Regular style={iconStyle}/>
                     Dashboard
                    </NavSubItem>
                    <NavSubItem
                      value="4"
                      style={{ marginTop: "10px", fontSize: "17px" }}
                      onClick={() => {
                        navigate("/user");
                        setValue("4");
                      }}
                    >
                      <People24Regular style={iconStyle} />
                      User Management
                    </NavSubItem>
                  </NavSubItemGroup>
                </NavCategory>
          </NavDrawerBody>
        ) : (
          <NavDrawerBody
            style={
             headerStyle
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
                Admin Page
              </h4>
            </div>
            
                <NavCategory value="1">
                  <NavCategoryItem
                    target="_blank"
                    icon={
                      <Apps28Regular
                        style={
                          newStyle
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
                      <Board24Regular style={iconStyle}/>
                     Dashboard
                    </NavSubItem>
                    <NavSubItem
                      value="4"
                      style={{ marginTop: "10px", fontSize: "17px" }}
                      onClick={() => {
                        navigate("/user");
                        setValue("4");
                      }}
                      
                    >
                      <People24Regular style={iconStyle} />
                      User Management
                    </NavSubItem>
                  </NavSubItemGroup>
                </NavCategory>
              </div>
            {/* </div> */}
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

export default NavDrawerDefaultAdmin;