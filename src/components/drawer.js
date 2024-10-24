import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  NavCategory,
  NavCategoryItem,
  NavDrawer,
  NavDrawerBody,
  NavDrawerFooter,
  NavDrawerHeader,
  NavDrawerHeaderNav,
  NavDrawerProps,
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
  NavigationFilled,
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
  Settings24Filled,
  Settings24Regular,
  bundleIcon,
  BoxMultipleCheckmark24Regular,
  BoxMultipleCheckmark24Filled,
  ClockBill24Regular,
  ClockBill24Filled,
  BeakerEdit24Filled,
  BeakerEdit24Regular,
  Cart24Filled,
  Cart24Regular,
  Navigation24Filled,
  Navigation24Regular,
  DocumentCatchUp24Filled,
  DocumentCatchUp24Regular,
  WrenchSettings24Filled,
  WrenchSettings24Regular,
} from "@fluentui/react-icons";

import {
  Button,
  Caption1Strong,
  Label,
  Radio,
  RadioGroup,
  makeStyles,
  shorthands,
  tokens,
  useId,
  Tooltip,
} from "@fluentui/react-components";
import { CiSettings } from "react-icons/ci";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
// import { Dropdown, Option} from "@fluentui/react-components";
// import  { DropdownProps } from "@fluentui/react-components";
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

const Person = bundleIcon(PersonFilled, PersonRegular);
const Dashboard = bundleIcon(Board24Filled, Board24Regular);
const Announcements = bundleIcon(MegaphoneLoud20Filled, MegaphoneLoud20Regular);
const EmployeeSpotlight = bundleIcon(
  PersonLightbulb20Filled,
  PersonLightbulb20Regular,
);

const LayerDiagonalPersonRegular = bundleIcon(
  BoxMultipleCheckmark24Filled,
  BoxMultipleCheckmark24Regular,
);
const PersonStarRegular = bundleIcon(ClockBill24Filled, ClockBill24Regular);
const PremiumPersonRegular = bundleIcon(
  BeakerEdit24Filled,
  BeakerEdit24Regular,
);
const TableSearchRegular = bundleIcon(Cart24Filled, Cart24Regular);
const Usage = bundleIcon(DocumentCatchUp24Filled, DocumentCatchUp24Regular);
const Navi = bundleIcon(Navigation24Filled, Navigation24Regular);

const Fix = bundleIcon(WrenchSettings24Filled, WrenchSettings24Regular);

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
const Settings = bundleIcon(Settings24Filled, Settings24Regular);

const NavDrawerDefault = (props) => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const lighttheme = useSelector((state) => state.theme.light);

  const darktheme = useSelector((state) => state.theme.dark);

  const themestate = useSelector((state) => state.theme.theme);

  const [collapse, setCollapse] = useState(false);

  const styles = useStyles();

  const labelId = useId("type-label");

  const [isOpen, setIsOpen] = useState(true);
  const [type, setType] = useState("inline");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [empId, setEmpId] = useState("");
  const dropdownId = useId("dropdown");
  // const styles = useStyles();
  // const[value,setValue] = useState("1")
  const value = localStorage.getItem("drawerposition");
  console.log("value", { value });
  const someClickHandler = () => {
    navigate("/dashboard");
  };
  const setValue = (value) => {
    localStorage.setItem("drawerposition", value);
  };
  useEffect(() => {
    const storedUsername = localStorage.getItem("username"); // Fetch username from localStorage
    // const storedrole = localStorage.getItem('role')
    if (storedUsername) {
      setUsername(storedUsername);
    }
    localStorage.setItem("drawerposition", "1");
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
    <div className={styles.root} style={{ height: "calc(100vh - 48px)" }}>
      {/* <div style={themestate?{backgroundColor:darktheme.sidebarcolordark, height: 'calc(100vh - 48px)'}:{backgroundColor:lighttheme.sidebarcolorlight}}> */}
      <NavDrawer
        defaultSelectedValue={value}
        // defaultSelectedCategoryValue="3"
        open={isOpen}
        type={type}
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
        {/* <div style={themestate?{backgroundColor:darktheme.sidebarcolordark, height: 'calc(100vh - 48px)'}:{}}> */}

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
            <Tooltip
              content={"Home"}
              positioning="after"
              withArrow={true}
              appearance={themestate ? "inverted" : "normal"}
            >
              <NavItem
                target="_blank"
                icon={
                  <Dashboard
                    style={
                      themestate
                        ? { color: darktheme.fontcolordark }
                        : { color: lighttheme.fontcolorlight }
                    }
                  />
                }
                onClick={() => {
                  navigate("/dashboard");
                  setValue("1");
                }}
                value="1"
                className={
                  themestate ? styles.navItemdark : styles.navItemlight
                }
              ></NavItem>
            </Tooltip>

            <Tooltip
              content={"approve"}
              positioning="after"
              withArrow={true}
              appearance={themestate ? "inverted" : "normal"}
            >
              <NavItem
                target="_blank"
                icon={
                  <LayerDiagonalPersonRegular
                    style={
                      themestate
                        ? { color: darktheme.fontcolordark }
                        : { color: lighttheme.fontcolorlight }
                    }
                  />
                }
                onClick={() => {
                  navigate("/approve");
                  setValue("2");
                }}
                value="2"
                className={
                  themestate ? styles.navItemdark : styles.navItemlight
                }
              ></NavItem>
            </Tooltip>

            <Tooltip
              content={"AI Identified"}
              positioning="after"
              withArrow={true}
              appearance={themestate ? "inverted" : "normal"}
            >
              <NavItem
                target="_blank"
                icon={
                  <PersonStarRegular
                    style={
                      themestate
                        ? { color: darktheme.fontcolordark }
                        : { color: lighttheme.fontcolorlight }
                    }
                  />
                }
                onClick={() => {
                  navigate("/ai");
                  setValue("3");
                }}
                value="3"
                className={
                  themestate ? styles.navItemdark : styles.navItemlight
                }
              ></NavItem>
            </Tooltip>

            <Tooltip
              content={"Fix"}
              positioning="after"
              withArrow={true}
              appearance={themestate ? "inverted" : "normal"}
            >
              <NavItem
                target="_blank"
                icon={
                  <Fix
                    style={
                      themestate
                        ? { color: darktheme.fontcolordark }
                        : { color: lighttheme.fontcolorlight }
                    }
                  />
                }
                onClick={() => {
                  navigate("/issuefix");
                  setValue("4");
                }}
                value="4"
                className={
                  themestate ? styles.navItemdark : styles.navItemlight
                }
              ></NavItem>
            </Tooltip>

            <Tooltip
              content={"Settings"}
              positioning="after"
              withArrow={true}
              appearance={themestate ? "inverted" : "normal"}
            >
              <NavItem
                target="_blank"
                icon={
                  <Settings
                    style={
                      themestate
                        ? { color: darktheme.fontcolordark }
                        : { color: lighttheme.fontcolorlight }
                    }
                  />
                }
                onClick={() => {
                  navigate("/");
                  setValue("5");
                }}
                value="5"
                className={
                  themestate ? styles.navItemdark : styles.navItemlight
                }
              ></NavItem>
            </Tooltip>

            <Tooltip
              content={"Purchase Order"}
              positioning="after"
              withArrow={true}
              appearance={themestate ? "inverted" : "normal"}
            >
              <NavItem
                target="_blank"
                icon={
                  <TableSearchRegular
                    style={
                      themestate
                        ? { color: darktheme.fontcolordark }
                        : { color: lighttheme.fontcolorlight }
                    }
                  />
                }
                onClick={() => {
                  navigate("/");
                  setValue("6");
                }}
                value="6"
                className={
                  themestate ? styles.navItemdark : styles.navItemlight
                }
              ></NavItem>
            </Tooltip>

            <Tooltip
              content={"Usage"}
              positioning="after"
              withArrow={true}
              appearance={themestate ? "inverted" : "normal"}
            >
              <NavItem
                target="_blank"
                icon={
                  <Usage
                    style={
                      themestate
                        ? { color: darktheme.fontcolordark }
                        : { color: lighttheme.fontcolorlight }
                    }
                  />
                }
                onClick={() => {
                  navigate("/");
                  setValue("7");
                }}
                value="7"
                className={
                  themestate ? styles.navItemdark : styles.navItemlight
                }
              ></NavItem>
            </Tooltip>
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
                      themestate
                        ? { color: darktheme.fontcolordark }
                        : { color: lighttheme.fontcolorlight }
                    }
                  />
                }
                // onClick={someClickHandler}
                value="1"
                className={
                  themestate ? styles.navItemdark : styles.navItemlight
                }
                style={{ marginTop: "10px", fontSize: "17px" }}
                onClick={() => {
                  navigate("/dashboard");
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
                  Home
                </div>
              </NavItem>
            </div>
            {/* 2 */}
            <div style={{ width: "100%" }}>
              <NavItem
                target="_blank"
                icon={
                  <LayerDiagonalPersonRegular
                    style={
                      themestate
                        ? { color: darktheme.fontcolordark }
                        : { color: lighttheme.fontcolorlight }
                    }
                  />
                }
                onClick={() => {
                  navigate("/approve");
                  setValue("2");
                }}
                value="2"
                className={
                  themestate ? styles.navItemdark : styles.navItemlight
                }
                style={{ marginTop: "10px", fontSize: "17px" }}
              >
                <div
                  style={
                    themestate
                      ? { marginTop: "2px", color: darktheme.fontcolordark }
                      : { marginTop: "2px", color: lighttheme.fontcolorlight }
                  }
                >
                  Approve
                </div>
              </NavItem>
            </div>
            <div style={{ width: "100%" }}>
              <div
                style={
                  themestate
                    ? { marginTop: "2px", color: darktheme.fontcolordark }
                    : { marginTop: "2px", color: lighttheme.fontcolorlight }
                }
              >
                <NavCategory value="6">
                  <NavCategoryItem
                    target="_blank"
                    icon={
                      <PersonStarRegular
                        style={
                          themestate
                            ? { color: darktheme.fontcolordark }
                            : { color: lighttheme.fontcolorlight }
                        }
                      />
                    }
                    // onClick={someClickHandler}
                    value="3"
                    className={
                      themestate ? styles.navItemdark : styles.navItemlight
                    }
                    style={{ marginTop: "10px", fontSize: "17px" }}
                    onClick={() => {
                      setValue("3");
                    }}
                  >
                    Issue
                  </NavCategoryItem>
                  <NavSubItemGroup>
                    <NavSubItem
                      value="4"
                      style={{ marginTop: "10px", fontSize: "17px" }}
                      onClick={() => {
                        navigate("/ai");
                        setValue("4");
                      }}
                    >
                      AI Identified
                    </NavSubItem>
                    <NavSubItem
                      value="5"
                      style={{ marginTop: "10px", fontSize: "17px" }}
                      onClick={() => {
                        navigate("/issuefix");
                        setValue("5");
                      }}
                    >
                      Fix
                    </NavSubItem>
                  </NavSubItemGroup>
                </NavCategory>
              </div>
            </div>

            {/* 4 */}
            <div style={{ width: "100%" }}>
              <NavItem
                target="_blank"
                icon={
                  <Settings
                    style={
                      themestate
                        ? { color: darktheme.fontcolordark, fontSize: "30px" }
                        : { color: lighttheme.fontcolorlight, fontSize: "30px" }
                    }
                  />
                }
                // onClick={someClickHandler}
                value="6"
                className={
                  themestate ? styles.navItemdark : styles.navItemlight
                }
                style={
                  themestate
                    ? {
                        marginTop: "10px",
                        fontSize: "17px",
                        color: darktheme.fontcolordark,
                      }
                    : {
                        marginTop: "10px",
                        fontSize: "17px",
                        color: lighttheme.fontcolorlight,
                      }
                }
                onClick={() => {
                  setValue("6");
                }}
              >
                <div style={{ marginTop: "2px" }}>Settings</div>
              </NavItem>
              {/* Newly added  */}
              <NavItem
                target="_blank"
                icon={
                  <TableSearchRegular
                    style={
                      themestate
                        ? { color: darktheme.fontcolordark }
                        : { color: lighttheme.fontcolorlight }
                    }
                  />
                }
                // onClick={someClickHandler}
                value="7"
                className={
                  themestate ? styles.navItemdark : styles.navItemlight
                }
                style={
                  themestate
                    ? {
                        marginTop: "10px",
                        fontSize: "17px",
                        color: darktheme.fontcolordark,
                      }
                    : {
                        marginTop: "10px",
                        fontSize: "17px",
                        color: lighttheme.fontcolorlight,
                      }
                }
                onClick={() => {
                  setValue("7");
                }}
              >
                <div style={{ marginTop: "2px" }}>Purchase Order</div>
              </NavItem>
              <NavItem
                target="_blank"
                icon={
                  <Usage
                    style={
                      themestate
                        ? { color: darktheme.fontcolordark }
                        : { color: lighttheme.fontcolorlight }
                    }
                  />
                }
                // onClick={someClickHandler}
                value="8"
                className={
                  themestate ? styles.navItemdark : styles.navItemlight
                }
                style={
                  themestate
                    ? {
                        marginTop: "10px",
                        fontSize: "17px",
                        color: darktheme.fontcolordark,
                      }
                    : {
                        marginTop: "10px",
                        fontSize: "17px",
                        color: lighttheme.fontcolorlight,
                      }
                }
                onClick={() => {
                  setValue("8");
                }}
              >
                <div style={{ marginTop: "2px" }}>Usage</div>
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
            // <NavItem
            //   value="21"
            //   target="_blank"
            // //   onClick={someClickHandler}
            //   className={styles.navfooter}
            // //   style={{color:"#E9E9E9"}}
            // //   icon={<Person />}
            // >
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
            // </NavItem>
          )}
          {/* <NavItem
      icon={<Settings />}
      target="_blank"
      onClick={someClickHandler}
      value="24"
    >
      App Settings
    </NavItem> */}
        </NavDrawerFooter>
        {/* </div> */}
      </NavDrawer>
      {/* </div> */}

      <div
        className={styles.content}
        style={themestate ? { background: darktheme.contentpagedark } : {}}
      >
        {/* <Button appearance="primary" onClick={() => setIsOpen(!isOpen)}>
          {type === "inline" ? "Toggle" : "Open"}
        </Button>

        <div className={styles.field}>
          <Label id={labelId}>Type</Label>
          <RadioGroup
            value={type}
            onChange={(_, data) => setType(data.value)}
            aria-labelledby={labelId}
          >
            <Radio value="overlay" label="Overlay (Default)" />
            <Radio value="inline" label="Inline" />
          </RadioGroup>
        </div> */}
        {/* {Children} */}

        {props.children}
      </div>
    </div>
  );
};

export default NavDrawerDefault;
