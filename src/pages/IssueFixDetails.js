import { useState } from "react";
import React from "react";
import {
  makeStyles,
  Button,
  Link,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbButton,
  BreadcrumbDivider,
  Textarea,
  Input,
  Dropdown,
  Tab,
  Table,
  TableCell,
  TableHeader,
  TableSelectionCell,
  TableRow,
  TableBody,
  TableHeaderCell,
  createTableColumn,
  useTableFeatures,
  useTableSort,
} from "@fluentui/react-components";
import { TextField } from '@fluentui/react/lib/TextField';
import line_data from "./data_approve";
import './dashboard.css'

const path = "/issuefix";
const path1 = "http://localhost:3000/";

const useStyles = makeStyles({
  root: {
    width: "80vw",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
  },
  header: {
    padding: "20px",
  },
  content1: {
    flex: 1,
    overflowY: "auto",
    paddingTop: "3vh",
    padding: "0 20px",
    maxHeight: "48vh",
  },
  content2: {
    width: "77vw",
    overflowY: "auto",
    paddingTop: "3vh",
    padding: "0 20px",
    maxHeight: "48vh",
  },
  controls: {
    display: "flex",
    gap: "20px",
    marginBottom: "20px",
  },
  container: {
    display: "grid",
    gap: "15px",
    fontFamily: "Arial, sans-serif",
  },
  section: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    marginLeft: "0vw",
  },
  section2: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    marginLeft: "7vw",
  },
  gridTemplate1: {
    gridTemplateColumns: "1fr 1fr",
    gridTemplateAreas: `
      "nameAndId managerInfo"
      "name empid"
      "email doj"
      "status dos"
      "role appraisal"
      "dept totalExperience"
      "editDetails focusRExperience"
    `,
  },
  heading: {
    fontWeight: "bold",
  },
  content: {
    fontSize: "13px",
    marginLeft: "10px",
  },
  formField: {
    display: 'flex',
    flexDirection: 'column',
    marginRight: '15px',
    marginBottom: '10px',
  },
  formField1: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: '6vw',
    marginBottom: '10px',
  },
});

const IssuefixDetails = () => {
  const styles = useStyles();
  const themestate = false;
  const [selectedtab, setSelectedTab] = React.useState("tab1");
  const [selectedOption, setSelectedOption] = React.useState("");
  const [rows, setRows] = useState([
    { no: 1, type: '', amount: '', description: '', poLine: '', unitPrice: '', quantity: '', unitOfMeasurement: '', taxAmount: '', hsnCode: '' }
  ]);

  const purchaseOrder = {
    poNumber: "13466",
    poDate: "09 May 2023",
    poTotalAmount: "95090",
    poCurrency: "INR",
    poStatus: "Open",
    lineMatching: "FULL / Partial Line Items",
    vendorAddress: "VendorAddress",
    customerAddress: "CustomerAddress",
    invoiceId: "InvoiceId",
    invoiceDate: "InvoiceDate",
    invoiceTotal: "InvoiceTotal",
    invoiceCurrency: "Invoice Currency",
    purchaseOrderNumberInInvoice: "PurchaseOrder Number in Invoice",
  };

  const options = [
    { key: "option1", text: "Option 1" },
    { key: "option2", text: "Option 2" },
    { key: "option3", text: "Option 3" },
  ];

  const handleInputChange = (index, field, value) => {
    const newRows = [...rows];
    newRows[index][field] = value;
    setRows(newRows);
  };

  const addLine = () => {
    setRows([...rows, { no: rows.length + 1, type: '', amount: '', description: '', poLine: '', unitPrice: '', quantity: '', unitOfMeasurement: '', taxAmount: '', hsnCode: '' }]);
  };

  return (
    <div>
      <div className="Approvebreadcrump">
        <Breadcrumb aria-label="Breadcrumb default example">
          <BreadcrumbItem>
            <BreadcrumbButton href={path1}>Home</BreadcrumbButton>
          </BreadcrumbItem>
          <BreadcrumbDivider />
          <BreadcrumbItem>
            <BreadcrumbButton href={path}>Issues</BreadcrumbButton>
          </BreadcrumbItem>
          <BreadcrumbDivider />
          <BreadcrumbItem>
            <BreadcrumbButton href={path}>Levin Technologies</BreadcrumbButton>
          </BreadcrumbItem>
        </Breadcrumb>
      </div>

      <div className={styles.root}>
        <div className={styles.header}>
          <div
            style={{
              display: "flex",
              justifyContent: "end",
              alignItems: "center",
              width: "100%",
              marginTop: "0px",
            }}
          >
            <div style={{ right: "5%", display: "flex", gap: "10px" }}>
              <Input placeholder='Enter PO number'/>
              <Button
                className=" buttoncolor"
                style={{ backgroundColor: "#3570c3", color: "white" }}
              >
                Submit
              </Button>
            </div>
          </div>

          <h2 style={{ margin: "20px 0 20px 0" }}>
            Invoice No:{purchaseOrder.poNumber}
          </h2>

          <div style={{ display: "flex", marginBottom: "20px" }}>
            <div
              style={{ borderLeft: "5px solid #342d7c", paddingLeft: "10px" }}
            >
              <p>Supplier</p>
              <h2>Levin Technologies</h2>
            </div>
            <div
              style={{
                marginLeft: "3vw",
                borderLeft: "5px solid #9a3ca9",
                paddingLeft: "10px",
              }}
            >
              <p>Status</p>
              <h2>Revoked</h2>
            </div>
            <div
              style={{
                marginLeft: "3vw",
                borderLeft: "5px solid black",
                paddingLeft: "10px",
              }}
            >
              <p>Potential PO</p>
              <h2>3</h2>
            </div>
          </div>
          <div style={{maxHeight:'50vh', overflowY:'auto'}}>
            <h2>Header</h2>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div className={styles.formField}>
                <label style={{marginBottom:'5px'}}>Operating unit</label>
                <Input placeholder="Type here..." resize="none" />
              </div>
              <div className={styles.formField}>
                <label style={{marginBottom:'5px'}}>Type</label>
                <Dropdown
                  placeholder="Select an option"
                  options={options}
                  styles={{ dropdown: { width: 150 } }}
                  selectedKey={selectedOption}
                  onChange={(event, item) => setSelectedOption(item.key)}
                />
              </div>
              <div className={styles.formField}>
                <label style={{marginBottom:'5px'}}>PO Number</label>
                <Dropdown
                  placeholder="Select an option"
                  options={options}
                  styles={{ dropdown: { width: 150 } }}
                  selectedKey={selectedOption}
                  onChange={(event, item) => setSelectedOption(item.key)}
                />
              </div>
              <div className={styles.formField}>
                <label style={{marginBottom:'5px'}}>Site</label>
                <Dropdown
                  placeholder="Select an option"
                  options={options}
                  styles={{ dropdown: { width: 100 } }}
                  selectedKey={selectedOption}
                  onChange={(event, item) => setSelectedOption(item.key)}
                />
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div className={styles.formField}>
                <label style={{marginBottom:'5px'}}>Invoice Date</label>
                <Input placeholder="Type here..." resize="none" />
              </div>
              
              <div className={styles.formField}>
                <label style={{marginBottom:'5px'}}>Invoice no</label>
                <Input placeholder="Type here..." resize="none" />
              </div>

              <div className={styles.formField}>
                <label style={{marginBottom:'5px'}}>Currency</label>
                <Dropdown
                  placeholder="Select an option"
                  options={options}
                  styles={{ dropdown: { width: 150 } }}
                  selectedKey={selectedOption}
                  onChange={(event, item) => setSelectedOption(item.key)}
                />
              </div>
              
              <div className={styles.formField}>
                <label style={{marginBottom:'5px'}}>Amount</label>
                <Input placeholder="Type here..." resize="none" />
              </div>
              
            </div>

            <div style={{ display: 'flex' }}>
              <div className={styles.formField}>
                <label style={{marginBottom:'5px'}}>Tax Amount</label>
                <Input placeholder="Type here..." resize="none" />
              </div>

              <div className={styles.formField1}>
                <label style={{marginBottom:'5px'}}>Distribution Amount</label>
                <Input placeholder="Type here..." resize="none" />
              </div>
            </div>

            {/* Editable Table */}
            <div style={{ marginTop: "20px" }}>
              <h2>Lines</h2>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHeaderCell>No</TableHeaderCell>
                    <TableHeaderCell>Type</TableHeaderCell>
                    <TableHeaderCell>Amount</TableHeaderCell>
                    <TableHeaderCell>Description</TableHeaderCell>
                    <TableHeaderCell>PO Line</TableHeaderCell>
                    <TableHeaderCell>Unit Price</TableHeaderCell>
                    <TableHeaderCell>Quantity</TableHeaderCell>
                    <TableHeaderCell>Unit of Measurement</TableHeaderCell>
                    <TableHeaderCell>Tax amount</TableHeaderCell>
                    <TableHeaderCell>HSNC Code</TableHeaderCell>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rows.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell>{row.no}</TableCell>
                      {Object.keys(row).filter(key => key !== 'no').map((key) => (
                        <TableCell key={key}>
                          <Input
                          appearance="underline"
                            value={row[key]}
                            onChange={(e) => handleInputChange(index, key, e.target.value)}
                            style={{ width: '100%' }}
                          />
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <Button onClick={addLine} style={{ marginTop: "10px" }}>+ Add Line</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IssuefixDetails;