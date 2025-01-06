import React, { useState } from "react";
import {
  Hamburger,
  NavDrawer,
  NavDrawerBody,
  NavDrawerHeader,
  NavItem,
} from "@fluentui/react-nav-preview";
import {
  Tooltip,
  makeStyles,
  tokens,
} from "@fluentui/react-components";

const useStyles = makeStyles({
  root: {
    overflow: "hidden",
    display: "flex",
    height: "600px",
  },
  content: {
    flex: "1",
    padding: "16px",
    display: "grid",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  field: {
    display: "flex",
    marginTop: "4px",
    marginLeft: "8px",
    flexDirection: "column",
    gridRowGap: tokens.spacingVerticalS,
  },
});

const DashboardNav = () => {
  const styles = useStyles();
  const [isOpen, setIsOpen] = useState(true);
  const [selectedItem, setSelectedItem] = useState("Live Count");

  // Define your navigation items
  const navItems = ["Live Count", "To-Do Count", "PO Calendar", "Others"];

  // Content mapping for each navigation item
  const renderContent = () => {
    switch (selectedItem) {
      case "Live Count":
        return <div>Live Count Content</div>;
      case "To-Do Count":
        return <div>To-Do Count Content</div>;
      case "PO Calendar":
        return <div>PO Calendar Content</div>;
      case "Others":
        return <div>Other Content</div>;
      default:
        return <div>Select an item from the navigation</div>;
    }
  };

  const renderHamburgerWithToolTip = () => {
    return (
      <Tooltip content="Navigation" relationship="label">
        <Hamburger onClick={() => setIsOpen(!isOpen)} />
      </Tooltip>
    );
  };

  return (
    <div className={styles.root}>
      <NavDrawer
        defaultSelectedValue={0}
        open={isOpen}
        style={{ backgroundColor: "#fff" }}
      >
        <NavDrawerHeader>{renderHamburgerWithToolTip()}</NavDrawerHeader>

        <NavDrawerBody>
          {navItems.map((item, index) => (
            <NavItem
              key={index}
              value={index}
              style={{
                backgroundColor: selectedItem === item ? "#e0e0e0" : "#fff",
                cursor: "pointer",
                maxWidth: "200px",
              }}
              onClick={() => setSelectedItem(item)} // Update selected item
            >
              {item}
            </NavItem>
          ))}
        </NavDrawerBody>
      </NavDrawer>
      <div className={styles.content}>
        {renderContent()} {/* Render content based on selected item */}
      </div>
    </div>
  );
};

export default DashboardNav;
