import React from 'react';
import { Button, Text } from "@fluentui/react-components";
import { BoardSplitRegular, LayerDiagonalPersonRegular, PersonStarRegular, PremiumPersonRegular, TableSearchRegular } from "@fluentui/react-icons";

const DrawerContent = ({ change, setChange }) => {
  return (
    <>
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
    </>
  );
};

export default DrawerContent;
