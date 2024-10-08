// import React, { useState } from "react";
// import {useSelector, useDispatch} from 'react-redux';
// import {
//     NavCategory,
//     NavCategoryItem,
//     NavDrawer,
//     NavDrawerBody,
//     NavDrawerFooter,
//     NavDrawerHeader,
//     NavDrawerHeaderNav,
//     NavDrawerProps,
//     NavItem,
//     NavSubItem,
//     NavSubItemGroup,

//   } from "@fluentui/react-nav-preview";
// import {
//   Board24Filled,
//   Board24Regular,
//   BoxMultiple20Filled,
//   BoxMultiple20Regular,
//   DataArea20Filled,
//   DataArea20Regular,
//   DocumentBulletListMultiple20Filled,
//   DocumentBulletListMultiple20Regular,
//   HeartPulse20Filled,
//   HeartPulse20Regular,
//   MegaphoneLoud20Filled,
//   MegaphoneLoud20Regular,
//   NavigationFilled,
//   NotePin20Filled,
//   NotePin20Regular,
//   People20Filled,
//   People20Regular,
//   PeopleStar20Filled,
//   PeopleStar20Regular,
//   PersonFilled,
//   PersonLightbulb20Filled,
//   PersonLightbulb20Regular,
//   PersonRegular,
//   PersonSearch20Filled,
//   PersonSearch20Regular,
//   PreviewLink20Filled,
//   PreviewLink20Regular,
//   Settings20Filled,
//   Settings20Regular,
//   bundleIcon,
//   LayerDiagonalPerson24Filled,
//   LayerDiagonalPerson24Regular,
//   PersonStar24Filled,
//   PersonStar24Regular,
//   PremiumPerson24Filled,
//   PremiumPerson24Regular,
//   DocumentTableSearch24Filled,
//   DocumentTableSearch24Regular,
//   Navigation24Filled,
//   Navigation24Regular
// } from "@fluentui/react-icons";

// import {
//     Button,
//     Caption1Strong,
//     Label,
//     Radio,
//     RadioGroup,
//     makeStyles,
//     shorthands,
//     tokens,
//     useId,
//   } from "@fluentui/react-components";

// const useStyles = makeStyles({
//   root: {
//     // ...shorthands.border("2px", "solid", "#ccc"),
//     ...shorthands.overflow("hidden"),
//     // marginTop:"-2px",
//     // marginLeft:"-2px",

//     position:"fixed",
//     left:0,
//     width:"100%",
//     height:"100%",
//     display: "flex",

//     backgroundColor: "#fff",

//   },
//   content: {
//     ...shorthands.flex(1),
//     ...shorthands.padding("16px"),

//     display: "grid",
//     justifyContent: "flex-start",
//     alignItems: "flex-start",

//     gridRowGap: tokens.spacingVerticalXXL,
//     gridAutoRows: "max-content",
//   },
//   field: {
//     display: "grid",
//     gridRowGap: tokens.spacingVerticalS,

//   },

//   headingContent: {
//     marginInlineStart: `10px`,
//   },
//   hamburger: {
//     // backgroundColor: navItemTokens.backgroundColor,
//     // color: tokens.colorNeutralForeground2,
//     textDecorationLine: "none",
//     marginLeft:"5px",
//     marginTop:"10px",

//     ":hover": {
//     //   backgroundColor: navItemTokens.backgroundColorHover,
//     },
//     ":active": {
//     //   backgroundColor: navItemTokens.backgroundColorPressed,
//     },
//   },
//   navItemlight: {
//     marginTop: "10px",
//     left:0,

//     "&:hover": {
//       backgroundColor: "#ccc", // Change background color on hover

//     },
//   },
//   navItemdark: {
//     marginTop: "10px",
//     left:0,
//     backgroundColor:"rgb(33,33,33)",

//     "&:hover": {
//       backgroundColor: "#616161", // Change background color on hover

//     },
//   },
//   navbody: {

//     backgroundColor:"black"

//   },
//   navfooter:{
//     "&:hover": {
//         backgroundColor: "#f0f0f0", // Change background color on hover

//       },
//   }
// });

// const Person = bundleIcon(PersonFilled, PersonRegular);
// const Dashboard = bundleIcon(Board24Filled, Board24Regular);
// const Announcements = bundleIcon(MegaphoneLoud20Filled, MegaphoneLoud20Regular);
// const EmployeeSpotlight = bundleIcon(
//   PersonLightbulb20Filled,
//   PersonLightbulb20Regular
// );

// const LayerDiagonalPersonRegular = bundleIcon(LayerDiagonalPerson24Filled,LayerDiagonalPerson24Regular)
// const PersonStarRegular = bundleIcon(PersonStar24Filled,PersonStar24Regular)
// const PremiumPersonRegular = bundleIcon(PremiumPerson24Filled,PremiumPerson24Regular)
// const TableSearchRegular = bundleIcon(DocumentTableSearch24Filled,DocumentTableSearch24Regular)
// const Navi = bundleIcon(Navigation24Filled,Navigation24Regular)

// const Search = bundleIcon(PersonSearch20Filled, PersonSearch20Regular);
// const PerformanceReviews = bundleIcon(
//   PreviewLink20Filled,
//   PreviewLink20Regular
// );
// const JobPostings = bundleIcon(NotePin20Filled, NotePin20Regular);
// const Interviews = bundleIcon(People20Filled, People20Regular);
// const HealthPlans = bundleIcon(HeartPulse20Filled, HeartPulse20Regular);
// const TrainingPrograms = bundleIcon(BoxMultiple20Filled, BoxMultiple20Regular);
// const CareerDevelopment = bundleIcon(PeopleStar20Filled, PeopleStar20Regular);
// const Analytics = bundleIcon(DataArea20Filled, DataArea20Regular);
// const Reports = bundleIcon(
//   DocumentBulletListMultiple20Filled,
//   DocumentBulletListMultiple20Regular
// );
// const Settings = bundleIcon(Settings20Filled, Settings20Regular);

// const NavDrawerDefault = (props, {children}) => {

//   const dispatch = useDispatch();

//   const lighttheme = useSelector((state) => state.theme.light);

//   const darktheme = useSelector((state) => state.theme.dark);

//   const themestate = useSelector((state) => state.theme.theme)

//   const [collapse, setCollapse] = useState(false);

//   const styles = useStyles();

//   const labelId = useId("type-label");

//   const [isOpen, setIsOpen] = useState(true);
//   const [type, setType] = useState("inline");

//   const someClickHandler = () => {
//     console.log("someClickHandler");
//   };

//   return (

//     <div className={styles.root} style={{height: 'calc(100vh - 48px)'}}>
//        {/* <div style={themestate?{backgroundColor:darktheme.sidebarcolordark, height: 'calc(100vh - 48px)'}:{backgroundColor:lighttheme.sidebarcolorlight}}> */}
//         <NavDrawer
//   defaultSelectedValue="1"
//   defaultSelectedCategoryValue="1"
//   open={isOpen}
//   type={type}
//   onOpenChange={(_, { open }) => setIsOpen(open)}
//   size="small"
//   className={useStyles.navdrawer}
//   style={collapse ? { width: `59px`, transition: "width 0.5s" , borderRightStyle: "none"} : { transition: "width 0.5s", borderRightStyle: "none" }}
// >
//     {/* <div style={themestate?{backgroundColor:darktheme.sidebarcolordark, height: 'calc(100vh - 48px)'}:{}}> */}

//   <NavDrawerHeader
//     style={themestate?{backgroundColor:darktheme.sidebarcolordark, cursor:"pointer"}:{cursor:"pointer"}}
//   >
//     <NavDrawerHeaderNav
//         onClick={() => {
//           setCollapse(!collapse);
//         }}

//     >
//       <Button
//         appearance="transparent"
//         icon={<Navi style={themestate?{color:darktheme.fontcolordark}:{color:lighttheme.fontcolorlight}}/>}
//         className={styles.hamburger}
//         onClick={() => {
//           setCollapse(!collapse);
//         }}

//       />
//     </NavDrawerHeaderNav>
//   </NavDrawerHeader>
//   <div style={themestate?{backgroundColor:darktheme.sidebarcolordark,height:"20px"}:{height:"20px"}}></div>

//   {collapse ? (
//     <NavDrawerBody
//         style={themestate?{backgroundColor:darktheme.sidebarcolordark, cursor:"pointer"}:{cursor:"pointer"}}
//      >
//       <NavItem
//         target="_blank"
//         icon={<Dashboard style={themestate?{color:darktheme.fontcolordark}:{color:lighttheme.fontcolorlight}} />}
//         onClick={someClickHandler}
//         value="1"
//         className={themestate? styles.navItemdark : styles.navItemlight}
//       >

//       </NavItem>
//       <NavItem
//         target="_blank"
//         icon={<LayerDiagonalPersonRegular style={themestate?{color:darktheme.fontcolordark}:{color:lighttheme.fontcolorlight}} />}
//         onClick={someClickHandler}
//         value="2"
//         className={themestate? styles.navItemdark : styles.navItemlight}
//       >

//       </NavItem>
//       <NavItem
//         target="_blank"
//         icon={<PersonStarRegular style={themestate?{color:darktheme.fontcolordark}:{color:lighttheme.fontcolorlight}} />}
//         onClick={someClickHandler}
//         value="3"
//         className={themestate? styles.navItemdark : styles.navItemlight}
//       >

//       </NavItem>
//       <NavItem
//         target="_blank"
//         icon={<PremiumPersonRegular style={themestate?{color:darktheme.fontcolordark}:{color:lighttheme.fontcolorlight}} />}
//         onClick={someClickHandler}
//         value="4"
//         className={themestate? styles.navItemdark : styles.navItemlight}
//       >

//       </NavItem>

//       <NavItem
//         target="_blank"
//         icon={<TableSearchRegular style={themestate?{color:darktheme.fontcolordark}:{color:lighttheme.fontcolorlight}} />}
//         onClick={someClickHandler}
//         value="5"
//         className={themestate? styles.navItemdark : styles.navItemlight}
//       >

//       </NavItem>
//     </NavDrawerBody>
//   ) : (
//     <NavDrawerBody
//     style={themestate?{backgroundColor:darktheme.sidebarcolordark, cursor:"pointer"}:{cursor:"pointer"}}
//     >
//       <div style={{width:'100%'}}>
//       <NavItem
//         target="_blank"
//         icon={<Dashboard style={themestate?{color:darktheme.fontcolordark}:{color:lighttheme.fontcolorlight}} />}
//         onClick={someClickHandler}
//         value="1"
//         className={themestate? styles.navItemdark : styles.navItemlight}
//         style={{ marginTop: "10px", fontSize:"17px"}}
//         >
//         <div style={themestate?{marginTop:"2px" , color:darktheme.fontcolordark}:{marginTop:"2px" , color:lighttheme.fontcolorlight}}>Dashboard</div>
//       </NavItem>
//       </div>
//       <div style={{width:'100%'} }>
//       <NavItem
//         target="_blank"
//         icon={<LayerDiagonalPersonRegular style={themestate?{color:darktheme.fontcolordark}:{color:lighttheme.fontcolorlight}} />}
//         onClick={someClickHandler}
//         value="2"
//         className={themestate? styles.navItemdark : styles.navItemlight}
//         style={{ marginTop: "10px", fontSize:"17px"}}
//         >
//         <div style={themestate?{marginTop:"2px" , color:darktheme.fontcolordark}:{marginTop:"2px" , color:lighttheme.fontcolorlight}}>Employee</div>

//       </NavItem>
//       </div>
//       <div style={{width:'100%'}}>
//       <NavItem
//         target="_blank"
//         icon={<PersonStarRegular style={themestate?{color:darktheme.fontcolordark}:{color:lighttheme.fontcolorlight}} />}
//         onClick={someClickHandler}
//         value="3"
//         className={themestate? styles.navItemdark : styles.navItemlight}
//         style={{ marginTop: "10px", fontSize:"17px"}}
//         >
//         <div style={themestate?{marginTop:"2px" , color:darktheme.fontcolordark}:{marginTop:"2px" , color:lighttheme.fontcolorlight}}>Manager</div>

//       </NavItem>
//       </div>
//       <div style={{width:'100%'}}>
//       <NavItem
//         target="_blank"
//         icon={<PremiumPersonRegular style={themestate?{color:darktheme.fontcolordark}:{color:lighttheme.fontcolorlight}} />}
//         onClick={someClickHandler}
//         value="4"
//         className={themestate? styles.navItemdark : styles.navItemlight}
//         style={{ marginTop: "10px", fontSize:"17px"}}
//       >
//         <div style={themestate?{marginTop:"2px" , color:darktheme.fontcolordark}:{marginTop:"2px" , color:lighttheme.fontcolorlight}}>Reviewer</div>

//       </NavItem>
//       </div>
//       <div style={{width:'100%'}}>
//       <NavItem
//         target="_blank"
//         icon={<TableSearchRegular style={themestate?{color:darktheme.fontcolordark}:{color:lighttheme.fontcolorlight}} />}
//         onClick={someClickHandler}
//         value="5"
//         className={themestate? styles.navItemdark : styles.navItemlight}
//         style={themestate?{ marginTop: "10px", fontSize:"17px", color:darktheme.fontcolordark}:{ marginTop: "10px", fontSize:"17px",color:lighttheme.fontcolorlight}}
//       >
//         <div style={{marginTop:"2px"}}>Summary</div>

//       </NavItem>
//       </div>
//     </NavDrawerBody>
//   )}

//   <NavDrawerFooter style={themestate?{backgroundColor:darktheme.sidebarcolordark}:{}} >

//     {!collapse&&(
//     // <NavItem
//     //   value="21"
//     //   target="_blank"
//     // //   onClick={someClickHandler}
//     //   className={styles.navfooter}
//     // //   style={{color:"#E9E9E9"}}
//     // //   icon={<Person />}
//     // >
//     <div style={{width:"100%", display:"flex", flexDirection:"column", alignItems:"center"}}>

//       <p style={themestate?{marginBottom:"30px", color:darktheme.fontcolordark}:{marginBottom:"30px",color:lighttheme.fontcolorlight}}>by FocusR AI</p>
//       <p style={themestate?{marginTop:"-20px",color:darktheme.fontcolordark}:{marginTop:"-20px",color:lighttheme.fontcolorlight}}>V 0.0.1</p>
//     </div>
//     // </NavItem>
//     )
//     }
//     {/* <NavItem
//       icon={<Settings />}
//       target="_blank"
//       onClick={someClickHandler}
//       value="24"
//     >
//       App Settings
//     </NavItem> */}

//   </NavDrawerFooter>
//   {/* </div> */}

// </NavDrawer>
// {/* </div> */}

//       <div className={styles.content} style={themestate?{background:darktheme.contentpagedark}:{}} >
//         {/* <Button appearance="primary" onClick={() => setIsOpen(!isOpen)}>
//           {type === "inline" ? "Toggle" : "Open"}
//         </Button>

//         <div className={styles.field}>
//           <Label id={labelId}>Type</Label>
//           <RadioGroup
//             value={type}
//             onChange={(_, data) => setType(data.value)}
//             aria-labelledby={labelId}
//           >
//             <Radio value="overlay" label="Overlay (Default)" />
//             <Radio value="inline" label="Inline" />
//           </RadioGroup>
//         </div> */}
//         {/* {Children} */}
//         {children}
//       </div>
//     </div>
//   );
// };

// export default NavDrawerDefault;

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
  const someClickHandler = () => {
    navigate("/employee");
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
        defaultSelectedValue="1"
        defaultSelectedCategoryValue="1"
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
              content={"Dashboard"}
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
                onClick={someClickHandler}
                value="1"
                className={
                  themestate ? styles.navItemdark : styles.navItemlight
                }
              ></NavItem>
            </Tooltip>

            <Tooltip
              content={"Employee"}
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
                onClick={someClickHandler}
                value="2"
                className={
                  themestate ? styles.navItemdark : styles.navItemlight
                }
              ></NavItem>
            </Tooltip>

            <Tooltip
              content={"Manager"}
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
                onClick={someClickHandler}
                value="3"
                className={
                  themestate ? styles.navItemdark : styles.navItemlight
                }
              ></NavItem>
            </Tooltip>

            <Tooltip
              content={"Reviewer"}
              positioning="after"
              withArrow={true}
              appearance={themestate ? "inverted" : "normal"}
            >
              <NavItem
                target="_blank"
                icon={
                  <PremiumPersonRegular
                    style={
                      themestate
                        ? { color: darktheme.fontcolordark }
                        : { color: lighttheme.fontcolorlight }
                    }
                  />
                }
                onClick={someClickHandler}
                value="4"
                className={
                  themestate ? styles.navItemdark : styles.navItemlight
                }
              ></NavItem>
            </Tooltip>

            <Tooltip
              content={"Summary"}
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
                onClick={someClickHandler}
                value="5"
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
                onClick={someClickHandler}
                value="1"
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
                  Home
                </div>
              </NavItem>
            </div>
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
                onClick={someClickHandler}
                value="3"
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
                  Pending
                </div>
              </NavItem>
            </div>
            <div style={{ width: "100%" }}>
              <NavItem
                target="_blank"
                icon={
                  <PremiumPersonRegular
                    style={
                      themestate
                        ? { color: darktheme.fontcolordark }
                        : { color: lighttheme.fontcolorlight }
                    }
                  />
                }
                onClick={someClickHandler}
                value="4"
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
                  Test Invoice
                </div>
              </NavItem>
            </div>
            <div style={{ width: "100%" }}>
              <NavItem
                target="_blank"
                icon={
                  <CiSettings
                    style={
                      themestate
                        ? { color: darktheme.fontcolordark, fontSize: "30px" }
                        : { color: lighttheme.fontcolorlight, fontSize: "30px" }
                    }
                  />
                }
                onClick={someClickHandler}
                value="5"
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
                onClick={someClickHandler}
                value="5"
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
              >
                <div style={{ marginTop: "2px" }}>Purchase Order</div>
              </NavItem>
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
                onClick={someClickHandler}
                value="5"
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
