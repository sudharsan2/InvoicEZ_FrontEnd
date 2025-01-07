import React ,{useEffect, useState}  from "react";

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
import axios from "axios";
import { useLocation } from "react-router-dom";
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

// Icons for navigation items


const AiNav = ({ onPoNumberClick }) => {
  const styles = useStyles();
  const [isOpen, setIsOpen] = useState(true);
  const [poNumbers, setPoNumbers] = useState([]); // To store PO numbers from API response
  const location2 = useLocation();
 
  const [selectedPoNumber, setSelectedPoNumber] = useState("");
  console.log(selectedPoNumber)
  // Extract the invoiceId from the URL
  const { invoiceNumber } = location2.state || {};
  console.log("AI", invoiceNumber);
  const fetchInvoiceDetails = async () => {
   
    try {
      const token = localStorage.getItem("access_token");

  const response = await axios.get(
    `https://invoicezapi.focusrtech.com:57/user/invoices-details/${invoiceNumber}/`,
    {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    }
  );
      const fetchedItem = response.data;
      console.log("Fetched Invoice Details:", fetchedItem);

      if (fetchedItem && fetchedItem.po_headers) {
        const poNumbers = fetchedItem.po_headers.map(
          (header) => header.po_number,
        );
        console.log("poNumbers", poNumbers);
        setPoNumbers(poNumbers);

        setSelectedPoNumber(poNumbers[0]);
        onPoNumberClick(poNumbers[0]);
      }
    } catch (error) {
      console.error("Error fetching invoice data", error);
    }
  };

  useEffect(() => {
    fetchInvoiceDetails(); // Fetch invoice details when the component mounts
  }, []);

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
          {poNumbers.length > 0 ? (
            poNumbers.map((poNumber, index) => (
              <NavItem
                key={index}
                value={index}
                style={{
                  backgroundColor: "#fff",
                  cursor: "pointer",
                  maxWidth: "200px",
                }}
                onClick={() => onPoNumberClick(poNumber)}
              >
                PO-{poNumber}
              </NavItem>
            ))
          ) : (
            <NavItem
              value="no-data"
              style={{ backgroundColor: "#fff", cursor: "pointer" }}
            >
              No PO Numbers Available
            </NavItem>
          )}
        </NavDrawerBody>
      </NavDrawer>
    </div>
  );
};

export default AiNav;
