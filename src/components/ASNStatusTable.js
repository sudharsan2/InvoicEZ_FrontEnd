




import React, { useMemo,useState } from "react";
import {
  DataGrid,
  DataGridBody,
  DataGridRow,
  DataGridHeader,
  DataGridHeaderCell,
  DataGridCell,
  TableCellLayout,
  createTableColumn,
  Divider,makeStyles, TabList, Tab
} from "@fluentui/react-components";

import Search from "./Search";
import { ArrowClockwise28Regular ,ArrowUpload24Regular,Delete24Filled } from "@fluentui/react-icons";

import ASNShipmentDrawer from "./ASNShipmentDrawer";
const useStyles = makeStyles({
    statusBullet: {
      display: "inline-block",
      width: "8px",
      height: "8px",
      borderRadius: "50%",
      marginRight: "8px",
    },
    statusAck: { backgroundColor: "green" },
    statusTobe: { backgroundColor: "yellow" },
    statusReject: { backgroundColor: "red" },
    
    iconButton: {
      display: "flex",
      alignItems: "center",
      backgroundColor: "transparent",
      border: "1px solid #fff",
      padding: "6px 12px",
      cursor: "pointer",
      gap: "8px",
    },
    icon: {
      color: "#1281d7",
      fontSize: "24px", // Adjust font size to match the ArrowClockwise icon
    },
  });
  
const items = [
  {
    file: { label: "10" },
    author: { label: "Rice" },
    lastUpdated: { label: "test" },
    lastUpdate: { label: "KG" },
    Quantity: { label: "1000" },
    NeedByDate: { label: "18 May 2023" },
    Description: { label: "ABC" },
    QuantityAmount:{label:"20"},
    UnitPrice:{label:"1"},
    Currency:{label:"INR"},
    Tax:{label:"20%"},
    NBD:{label:"May 10 2023"},
    STO:{label:"Madurai"},
    Remarks:{label:"Good"},
    Request :{label:"May 7 2023 "},
    Reshedule:{label:"Nov 10 2023"},
    Remainder:{label:"Nov 8 2023"},
    Status:{label:"Acknowledged"},
    download:{label:"",icon: <ArrowUpload24Regular />},
    upload:{label:"",icon: <ArrowUpload24Regular />},
    uploadcm:{label:"",icon:<ArrowUpload24Regular />},
    delete:{label:"",icon:<Delete24Filled />}
  },
  {
    file: { label: "10" },
    author: { label: "Rice" },
    lastUpdated: { label: "test" },
    lastUpdate: { label: "KG" },
    Quantity: { label: "1000" },
    NeedByDate: { label: "18 May 2023" },
    Description: { label: "ABC" },
    QuantityAmount:{label:"20"},
    UnitPrice:{label:"1"},
    Currency:{label:"INR"},
    Tax:{label:"20%"},
    NBD:{label:"May 10 2023"},
    STO:{label:"Madurai"},
    Remarks:{label:"Good"},
    Request :{label:"May 7 2023 "},
    Reshedule:{label:"Nov 10 2023"},
    Remainder:{label:"Nov 8 2023"},
    Status:{label:"Rejected"},
    download:{label:"",icon: <ArrowUpload24Regular />},
    upload:{label:"",icon: <ArrowUpload24Regular />},
    uploadcm:{label:"",icon:<ArrowUpload24Regular />},
    delete:{label:"",icon:<Delete24Filled />}
  },
  {
    file: { label: "10" },
    author: { label: "Rice" },
    lastUpdated: { label: "test" },
    lastUpdate: { label: "KG" },
    Quantity: { label: "1000" },
    NeedByDate: { label: "18 May 2023" },
    Description: { label: "ABC" },
    QuantityAmount:{label:"20"},
    UnitPrice:{label:"1"},
    Currency:{label:"INR"},
    Tax:{label:"20%"},
    NBD:{label:"May 10 2023"},
    STO:{label:"Madurai"},
    Remarks:{label:"Good"},
    Request :{label:"May 7 2023 "},
    Reshedule:{label:"Nov 10 2023"},
    Remainder:{label:"Nov 8 2023"},
    Status:{label:"To be Acknowledged"},
    download:{label:"",icon: <ArrowUpload24Regular />},
    upload:{label:"",icon: <ArrowUpload24Regular />},
    uploadcm:{label:"",icon:<ArrowUpload24Regular />},
    delete:{label:"",icon:<Delete24Filled />}
    
  },
];






const columns = [
  createTableColumn({
    columnId: "file",
    compare: (a, b) => a.file.label.localeCompare(b.file.label),
    renderHeaderCell: () => "DO No.",
    renderCell: (item) => (
      <TableCellLayout style={{ maxWidth: "100px" }}>
        {}
      </TableCellLayout>
    ),
  }),
  createTableColumn({
    columnId: "author",
    compare: (a, b) => a.author.label.localeCompare(b.author.label),
    renderHeaderCell: () => "Supplier Number",
    renderCell: (item) => (
      <TableCellLayout style={{ maxWidth: "150px" }}>
        {}
      </TableCellLayout>
    ),
  }),
  createTableColumn({
    columnId: "lastUpdated",
    renderHeaderCell: () => "ASN Number",
    renderCell: (item) => (
      <TableCellLayout style={{ maxWidth: "200px" }}>
        {}
      </TableCellLayout>
    ),
  }),
  createTableColumn({
    columnId: "lastUpdate",
    renderHeaderCell: () => "Invoiced On",
    renderCell: (item) => (
      <TableCellLayout style={{ maxWidth: "100px" }}>
        {}
      </TableCellLayout>
    ),
  }),
  createTableColumn({
    columnId: "Quantity",
    renderHeaderCell: () => "PO_Rev",
    renderCell: (item) => (
      <TableCellLayout style={{ maxWidth: "100px" }}>
        {}
      </TableCellLayout>
    ),
  }),
  createTableColumn({
    columnId: "Description",
    renderHeaderCell: () => "Line Shipment No.",
    renderCell: (item) => (
      <TableCellLayout style={{ maxWidth: "150px" }}>
        {}
      </TableCellLayout>
    ),
  }),
  createTableColumn({
    columnId: "QuantityAmount",
    renderHeaderCell: () => "Item Code",
    renderCell: (item) => (
      <TableCellLayout style={{ maxWidth: "150px" }}>
        {}
      </TableCellLayout>
    ),
  }),
  createTableColumn({
    columnId: "UnitPrice",
    renderHeaderCell: () => "Description",
    renderCell: (item) => (
      <TableCellLayout style={{ maxWidth: "150px" }}>
        {}
      </TableCellLayout>
    ),
  }),
  createTableColumn({
    columnId: "Currency",
    renderHeaderCell: () => "UOM",
    renderCell: (item) => (
      <TableCellLayout style={{ maxWidth: "150px" }}>
        {}
      </TableCellLayout>
    ),
  }),
  createTableColumn({
    columnId: "Currency",
    renderHeaderCell: () => "Unit Price",
    renderCell: (item) => (
      <TableCellLayout style={{ maxWidth: "150px" }}>
        {}
      </TableCellLayout>
    ),
  }),
  createTableColumn({
    columnId: "Currency",
    renderHeaderCell: () => "Ordered",
    renderCell: (item) => (
      <TableCellLayout style={{ maxWidth: "150px" }}>
        {}
      </TableCellLayout>
    ),
  }),
  createTableColumn({
    columnId: "Currency",
    renderHeaderCell: () => "Shipped",
    renderCell: (item) => (
      <TableCellLayout style={{ maxWidth: "150px" }}>
        {}
      </TableCellLayout>
    ),
  }),
  createTableColumn({
    columnId: "Currency",
    renderHeaderCell: () => "Receipt No",
    renderCell: (item) => (
      <TableCellLayout style={{ maxWidth: "150px" }}>
        {}
      </TableCellLayout>
    ),
  }),
  createTableColumn({
    columnId: "Currency",
    renderHeaderCell: () => "Received",
    renderCell: (item) => (
      <TableCellLayout style={{ maxWidth: "150px" }}>
        {}
      </TableCellLayout>
    ),
  }),
  createTableColumn({
    columnId: "Currency",
    renderHeaderCell: () => "Accepted",
    renderCell: (item) => (
      <TableCellLayout style={{ maxWidth: "150px" }}>
        {}
      </TableCellLayout>
    ),
  }),
  createTableColumn({
    columnId: "Currency",
    renderHeaderCell: () => "Rejected",
    renderCell: (item) => (
      <TableCellLayout style={{ maxWidth: "150px" }}>
        {}
      </TableCellLayout>
    ),
  }),
  createTableColumn({
    columnId: "Currency",
    renderHeaderCell: () => "UOM",
    renderCell: (item) => (
      <TableCellLayout style={{ maxWidth: "150px" }}>
        {}
      </TableCellLayout>
    ),
  }),
  createTableColumn({
    columnId: "Currency",
    renderHeaderCell: () => "Cancelled",
    renderCell: (item) => (
      <TableCellLayout style={{ maxWidth: "150px" }}>
        {}
      </TableCellLayout>
    ),
  }),
  createTableColumn({
    columnId: "Currency",
    renderHeaderCell: () => "Invoice Status",
    renderCell: (item) => (
      <TableCellLayout style={{ maxWidth: "150px" }}>
        {}
      </TableCellLayout>
    ),
  }),
  createTableColumn({
    columnId: "Currency",
    renderHeaderCell: () => "DO Status",
    renderCell: (item) => (
      <TableCellLayout style={{ maxWidth: "150px" }}>
        {}
      </TableCellLayout>
    ),
  }),
  createTableColumn({
    columnId: "Currency",
    renderHeaderCell: () => "CM Status",
    renderCell: (item) => (
      <TableCellLayout style={{ maxWidth: "150px" }}>
        {}
      </TableCellLayout>
    ),
  }),
  createTableColumn({
    columnId: "Currency",
    renderHeaderCell: () => "Download PV",
    renderCell: (item) => (
      <TableCellLayout style={{ maxWidth: "150px" }}  media={item.download.icon}>
        {}
      </TableCellLayout>
    ),
  }),
  createTableColumn({
    columnId: "Currency",
    renderHeaderCell: () => "Upload Inv",
    renderCell: (item) => (
      <TableCellLayout style={{ maxWidth: "150px" }}  media={item.upload.icon}>
        {}
      </TableCellLayout>
    ),
  }),
  createTableColumn({
    columnId: "Currency",
    renderHeaderCell: () => "Upload CM",
    renderCell: (item) => (
      <TableCellLayout style={{ maxWidth: "150px" }} media={item.upload.icon}>
        {}
      </TableCellLayout>
    ),
  }),
  createTableColumn({
    columnId: "Currency",
    renderHeaderCell: () => "Action",
    renderCell: (item) => (
      <TableCellLayout style={{ maxWidth: "150px" }} media={item.delete.icon}>
        {}
      </TableCellLayout>
    ),
  }),
];

const ASNStatusTable = () => {
    const styles = useStyles();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const defaultSortState = useMemo(
    () => ({ sortColumn: "file", sortDirection: "ascending" }),
    []
  );

  const gridContainerStyle = {
    overflowX: "auto", 
    width: "90vw", 
  };

  const handleRowClick = () => {
    setIsDrawerOpen(true);
    console.log("Status",isDrawerOpen)
  };

  return (
    <div style={gridContainerStyle}>
        <div>
        <TabList
        // defaultSelectedValue="tab1"
        appearance="subtle"
        style={{ marginLeft: "0vw", marginTop: "2vh" }}
      >
        <Tab
          value="tab1"
          style={{ border: "1px solid transparent", marginTop: "4em", }}
        >
          <h2 Style={{fontSize:"40px",fontWeight:"bold"}}></h2>
        </Tab>

        <div style={{display:"flex",justifyContent:"flex-end",marginTop:"2em",width:"200%"}}>
          <button className={styles.iconButton}>
            <ArrowClockwise28Regular className={styles.icon} />
            <span>Refresh</span>
          </button>
          
        </div>

        <Search placeholder="Search Requests"  style={{marginRight:"10em"}}/>
      </TabList>
      <div className={styles.dataGridContainer}>
      <Divider style={{marginTop:"1em",marginBottom:"3em"}}/>
        </div>
      <DataGrid items={items} columns={columns} defaultSortState={defaultSortState}>
  <DataGridHeader>
    <DataGridRow>
      {({ renderHeaderCell }) => (
        <DataGridHeaderCell
          style={{
            width: "2em", 
            overflow: "hidden",
            whiteSpace: "nowrap",
           
          textOverflow: "ellipsis",
          }}
        >
          {renderHeaderCell()}
        </DataGridHeaderCell>
      )}
    </DataGridRow>
  </DataGridHeader>
  <DataGridBody>
    {({ item, rowId }) => (
      <DataGridRow key={rowId} onClick={handleRowClick}>
        {({ renderCell }) => (
          <DataGridCell
            style={{
              width: "2em", 
              overflow: "hidden",
              whiteSpace: "nowrap",
            textOverflow: "ellipsis", 
           
            }}
          >
            {renderCell(item)}
          </DataGridCell>
        )}
      </DataGridRow>
    )}
  </DataGridBody>
</DataGrid>
</div>
<ASNShipmentDrawer isOpen={isDrawerOpen} setIsOpen={setIsDrawerOpen} />
    </div>
  );
};

export default ASNStatusTable;


