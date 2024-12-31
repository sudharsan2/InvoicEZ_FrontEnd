import React, { useState, useEffect, useCallback } from "react";
import {
  
  DrawerHeader,
  DrawerHeaderTitle,
  Drawer,
  Button,
  tokens,
  Text,
  Breadcrumb,
    BreadcrumbItem,
    BreadcrumbDivider,
    BreadcrumbButton,
  
} from "@fluentui/react-components";
import { TextColumnWideRegular,BoardSplitRegular, LayerDiagonalPersonRegular,
    PersonStarRegular,PremiumPersonRegular,TableSearchRegular,CalendarMonthFilled,
    CalendarMonthRegular,
    bundleIcon,} from "@fluentui/react-icons";

import { makeStyles, shorthands } from '@griffel/react';



const useStyles = makeStyles({
  root: {
    ...shorthands.border("2px", "solid", "#ccc"),
    overflow: "hidden",
    marginTop:"5.35vh",
    position:"fixed",
    left:0,
    display: "flex",
    minHeight: "100vh",
    width: "100vw",
    backgroundColor: "#fff",
  },

  content: {
    ...shorthands.margin(tokens.spacingVerticalXL, tokens.spacingHorizontalXL),
    flex:1,

    gridRowGap: tokens.spacingVerticalXXL,
  },
});

const CalendarMonth = bundleIcon(CalendarMonthFilled, CalendarMonthRegular);
const path = "https://www.bing.com/";

export const Responsive = () => {
  const styles = useStyles();

  const [isOpen, setIsOpen] = useState(true);
  const [change, setChange] = useState(false);
  
  const [type, setType] = useState("inline");
  
console.log(isOpen)
  
  const onMediaQueryChange = useCallback(({ matches }) => setType(matches ? "overlay" : "inline"), []);

  useEffect(() => {
    const match = window.matchMedia("(max-width: 720px)");

    if (match.matches) {
      setType("overlay");
    }

    match.addEventListener("change", onMediaQueryChange);

    return () => match.removeEventListener("change", onMediaQueryChange);
  }, []);

  return (
    <div className={styles.root} style={{}}>
      <Drawer
        type={type}
        separator
        position="start"
        open={true}
        onOpenChange={(_, { open }) => setIsOpen(open)}
        style={change ? { width: `100px`, backgroundColor:"#E9E9E9", transition:"width 0.5s" } : {backgroundColor:"#E9E9E9",  transition:"width 0.5s"}}
      >
        <div style={change?{display:"flex", justifyContent:"center", alignItems:"center", marginLeft:"10px"}:{display:"flex", alignItems:"center", marginLeft:"10px", width:"100%", cursor:'pointer'}} onClick={() => {
                          setChange(!change);
                        }}> 
            <Button
                        appearance="transparent"
                        icon={<TextColumnWideRegular />}
                        size="large"
                        onClick={() => {
                          setChange(!change);
                        }}
                        style={{backgroundColor:"#E9E9E9", marginTop:"3vh"}}
                      >
                    
                      </Button>
          </div>
        
        <DrawerHeader style={ {display:"flex"}}>
          <DrawerHeaderTitle
            // action={
            //   <Button
            //     appearance="subtle"
            //     aria-label="Close"
            //     icon={<Dismiss24Regular />}
            //     onClick={() => setIsOpen(false)}
            //   />
            // }
          >
            
             
          </DrawerHeaderTitle>
        </DrawerHeader>

        {change ? (
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", marginLeft: "10px" }}>
          <Button appearance="transparent" icon={<BoardSplitRegular />} size="large" onClick={() => setChange(!change)} style={{ backgroundColor: "#E9E9E9" }} />
          <Button appearance="transparent" icon={<LayerDiagonalPersonRegular />} size="large" onClick={() => setChange(!change)} style={{ backgroundColor: "#E9E9E9", marginTop: "10px" }} />
          <Button appearance="transparent" icon={<PersonStarRegular />} size="large" onClick={() => setChange(!change)} style={{ backgroundColor: "#E9E9E9", marginTop: "10px" }} />
          <Button appearance="transparent" icon={<PremiumPersonRegular />} size="large" onClick={() => setChange(!change)} style={{ backgroundColor: "#E9E9E9", marginTop: "10px" }} />
          <Button appearance="transparent" icon={<TableSearchRegular />} size="large" onClick={() => setChange(!change)} style={{ backgroundColor: "#E9E9E9", marginTop: "10px" }} />
        </div>
      ) : (
        <div style={{width:"100%"}}>
          <div style={{ display: "flex", alignItems: "center", marginLeft: "10px", width: "100%", cursor: "pointer" }} onClick={() => setChange(!change)}>
            <Button appearance="transparent" icon={<BoardSplitRegular />} size="large" onClick={() => setChange(!change)} style={{ backgroundColor: "#E9E9E9" }} />
            <Text weight="regular" size={400} style={{ color: "#424242", marginLeft: "15px" }}>Dashboard</Text>
          </div>
          <div
                style={{
                display: "flex",
                alignItems: "center",
                marginLeft: "10px",
                width: "100%",
                cursor: "pointer",
                marginTop:"10px",
                // backgroundColor:"whitesmoke"
                }}
                onClick={() => {
                setChange(!change);
                }}
            >
                <Button
                appearance="transparent"
                icon={<LayerDiagonalPersonRegular />}
                size="large"
                onClick={() => {
                    setChange(!change);
                }}
                style={{ backgroundColor: "#E9E9E9" }}
                />
                <Text weight="regular" size={400} style={{color:"#424242", marginLeft:"15px"}}>
                Employer
                </Text>
                </div>

                <div
                style={{
                display: "flex",
                alignItems: "center",
                marginLeft: "10px",
                width: "100%",
                cursor: "pointer",
                marginTop:"10px"
                }}
                onClick={() => {
                setChange(!change);
                }}
            >
                <Button
                appearance="transparent"
                icon={<PersonStarRegular />}
                size="large"
                onClick={() => {
                    setChange(!change);
                }}
                style={{ backgroundColor: "#E9E9E9" }}
                />
                <Text weight="regular" size={400} style={{color:"#424242", marginLeft:"15px"}}>
                Manager
                </Text>
                </div>

                <div
                style={{
                display: "flex",
                alignItems: "center",
                marginLeft: "10px",
                width: "100%",
                cursor: "pointer",
                marginTop:"10px"
                }}
                onClick={() => {
                setChange(!change);
                }}
            >
                <Button
                appearance="transparent"
                icon={<PremiumPersonRegular />}
                size="large"
                onClick={() => {
                    setChange(!change);
                }}
                style={{ backgroundColor: "#E9E9E9" }}
                />
                <Text weight="regular" size={400} style={{color:"#424242", marginLeft:"15px"}}>
                Reviewer
                </Text>
                </div>

                <div
                style={{
                display: "flex",
                alignItems: "center",
                marginLeft: "10px",
                width: "100%",
                cursor: "pointer",
                marginTop:"10px"
                }}
                onClick={() => {
                setChange(!change);
                }}
            >
                <Button
                appearance="transparent"
                icon={<TableSearchRegular />}
                size="large"
                onClick={() => {
                    setChange(!change);
                }}
                style={{ backgroundColor: "#E9E9E9" }}
                />
                <Text weight="regular" size={400} style={{color:"#424242", marginLeft:"15px"}}>
                Summary
                </Text>
                </div>
        </div>
      )}       
      </Drawer>

      <div className={styles.content} >
      <Breadcrumb aria-label="Breadcrumb default example">
      <BreadcrumbItem>
        <BreadcrumbButton href={path}>Item 1</BreadcrumbButton>
      </BreadcrumbItem>
      <BreadcrumbDivider />
      <BreadcrumbItem>
        <BreadcrumbButton href={path} icon={<CalendarMonth />}>
          Item 2
        </BreadcrumbButton>
      </BreadcrumbItem>
      <BreadcrumbDivider />
      <BreadcrumbItem>
        <BreadcrumbButton href={path}>Item 3</BreadcrumbButton>
      </BreadcrumbItem>
      <BreadcrumbDivider />
      <BreadcrumbItem>
        <BreadcrumbButton href={path} current>
          Item 4
        </BreadcrumbButton>
      </BreadcrumbItem>
    </Breadcrumb>
      </div>
    </div>
  );
};

export default Responsive;