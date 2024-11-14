import React, { useMemo } from "react";
import {
  DataGrid,
  DataGridBody,
  DataGridRow,
  DataGridHeader,
  DataGridHeaderCell,
  DataGridCell,
  TableCellLayout,
  createTableColumn,
} from "@fluentui/react-components";
import { makeStyles, TabList, Tab } from "@fluentui/react-components";

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
    iconButtonContainer: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      marginTop: "4em",
      marginLeft: "2em",
    },
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
    Status:{label:"Acknowledged"}
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
    Status:{label:"Rejected"}
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
    Status:{label:"To be Acknowledged"}
  },
];



const StatusCell = ({ statusLabel }) => {
    const styles = useStyles();
    const statusStyle =
      statusLabel === "Acknowledged"
        ? styles.statusAck
        : statusLabel === "To be Acknowledged"
        ? styles.statusTobe
        : styles.statusReject;
  
    return (
      <TableCellLayout>
        <span className={`${styles.statusBullet} ${statusStyle}`} />
        {statusLabel}
      </TableCellLayout>
    );
  };
const columns = [
  createTableColumn({
    columnId: "file",
    compare: (a, b) => a.file.label.localeCompare(b.file.label),
    renderHeaderCell: () => "Type",
    renderCell: (item) => (
      <TableCellLayout style={{ maxWidth: "100px" }}>
        {item.file.label}
      </TableCellLayout>
    ),
  }),
  createTableColumn({
    columnId: "author",
    compare: (a, b) => a.author.label.localeCompare(b.author.label),
    renderHeaderCell: () => "Supplier",
    renderCell: (item) => (
      <TableCellLayout style={{ maxWidth: "150px" }}>
        {item.author.label}
      </TableCellLayout>
    ),
  }),
  createTableColumn({
    columnId: "lastUpdated",
    renderHeaderCell: () => "PO-Rev",
    renderCell: (item) => (
      <TableCellLayout style={{ maxWidth: "200px" }}>
        {item.lastUpdated.label}
      </TableCellLayout>
    ),
  }),
  createTableColumn({
    columnId: "lastUpdate",
    renderHeaderCell: () => "Line_Shipment_No",
    renderCell: (item) => (
      <TableCellLayout style={{ maxWidth: "100px" }}>
        {item.lastUpdate.label}
      </TableCellLayout>
    ),
  }),
  createTableColumn({
    columnId: "Quantity",
    renderHeaderCell: () => "Item_Code",
    renderCell: (item) => (
      <TableCellLayout style={{ maxWidth: "100px" }}>
        {item.Quantity.label}
      </TableCellLayout>
    ),
  }),
  createTableColumn({
    columnId: "Description",
    renderHeaderCell: () => "Description",
    renderCell: (item) => (
      <TableCellLayout style={{ maxWidth: "150px" }}>
        {item.Description.label}
      </TableCellLayout>
    ),
  }),
  // createTableColumn({
  //   columnId: "Status ",
  //   renderHeaderCell: () => "Status",
  //   renderCell: (item) => <StatusCell statusLabel={item.Status.label} />
  // }),
  createTableColumn({
    columnId: "QuantityAmount",
    renderHeaderCell: () => "QTY/Amount",
    renderCell: (item) => (
      <TableCellLayout style={{ maxWidth: "150px" }}>
        {item.QuantityAmount.label}
      </TableCellLayout>
    ),
  }),
  createTableColumn({
    columnId: "UnitPrice",
    renderHeaderCell: () => "Unit Price",
    renderCell: (item) => (
      <TableCellLayout style={{ maxWidth: "150px" }}>
        {item.UnitPrice.label}
      </TableCellLayout>
    ),
  }),
  createTableColumn({
    columnId: "Currency",
    renderHeaderCell: () => "Currency",
    renderCell: (item) => (
      <TableCellLayout style={{ maxWidth: "150px" }}>
        {item.Currency.label}
      </TableCellLayout>
    ),
  }),
  createTableColumn({
    columnId: "Tax",
    renderHeaderCell: () => "Tax%",
    renderCell: (item) => (
      <TableCellLayout style={{ maxWidth: "150px" }}>
        {item.Tax.label}
      </TableCellLayout>
    ),
  }),
  createTableColumn({
    columnId: "NBD",
    renderHeaderCell: () => "Need By Date",
    renderCell: (item) => (
      <TableCellLayout style={{ maxWidth: "150px" }}>
        {item.NBD.label}
      </TableCellLayout>
    ),
  }),
  createTableColumn({
    columnId: "STO",
    renderHeaderCell: () => "Ship To ORG",
    renderCell: (item) => (
      <TableCellLayout style={{ maxWidth: "150px" }}>
        {item.STO.label}
      </TableCellLayout>
    ),
  }),
  createTableColumn({
    columnId: "Remarks",
    renderHeaderCell: () => "Remarks",
    renderCell: (item) => (
      <TableCellLayout style={{ maxWidth: "150px" }}>
        {item.Remarks.label}
      </TableCellLayout>
    ),
  }),
  createTableColumn({
    columnId: "Request",
    renderHeaderCell: () => "Request",
    renderCell: (item) => (
      <TableCellLayout style={{ maxWidth: "150px" }}>
        {item.Request.label}
      </TableCellLayout>
    ),
  }),

  createTableColumn({
    columnId: "Reshedule",
    renderHeaderCell: () => "Reshedule Date",
    renderCell: (item) => (
      <TableCellLayout style={{ maxWidth: "150px" }}>
        {item.Reshedule.label}
      </TableCellLayout>
    ),
  }),
  createTableColumn({
    columnId: "Remainder ",
    renderHeaderCell: () => "Remainder Date",
    renderCell: (item) => (
      <TableCellLayout style={{ maxWidth: "150px" }}>
        {item.Remainder.label}
      </TableCellLayout>
    ),
  }),
 
];

const POTable = () => {
  const defaultSortState = useMemo(
    () => ({ sortColumn: "file", sortDirection: "ascending" }),
    []
  );

  const gridContainerStyle = {
    overflowX: "auto", 
    width: "90vw", 
  };

  return (
    <div style={gridContainerStyle}>
      <DataGrid items={items} columns={columns} defaultSortState={defaultSortState}>
  <DataGridHeader>
    <DataGridRow>
      {({ renderHeaderCell }) => (
        <DataGridHeaderCell
          style={{
            maxWidth: "500vw", 
              overflow: "hidden",
              whiteSpace: "no-wrap",
            textOverflow: "elipsis", 
          }}
        >
          {renderHeaderCell()}
        </DataGridHeaderCell>
      )}
    </DataGridRow>
  </DataGridHeader>
  <DataGridBody>
    {({ item, rowId }) => (
      <DataGridRow key={rowId}>
        {({ renderCell }) => (
          <DataGridCell
            style={{
              maxWidth: "500vw", 
              overflow: "hidden",
              whiteSpace: "no-wrap",
            textOverflow: "elipsis",
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
  );
};

export default POTable;


