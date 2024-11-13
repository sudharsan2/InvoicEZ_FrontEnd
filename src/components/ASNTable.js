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

const items = [
  {
    file: { label: "10" },
    author: { label: "Rice" },
    lastUpdated: { label: "test" },
    lastUpdate: { label: "KG" },
    Quantity: { label: "1000" },
    NeedByDate: { label: "18 May 2023" },
    LineShipmentNo:{label:"123"},
    ItemCode:{label:"ROH100"},
    Description:{label:"Cylinder Block for 88"},
    UOM:{label:"PCE"},
    UnitPrice:{label:"120"},
    Ordered:{label:"10"},
    Shipped:{label:"10"},
    ReceiptNo:{label:"10"},
    Received:{label:"1"},
    Accepted:{label:"9"},
    Rejected:{label:"-"},
    Cancelled:{label:"-"},
    InvoiceStatus:{label:"120"},
    DOStatus:{label:"120"},
    CMStatus:{label:"120"},

  },
];

const columns = [
  createTableColumn({
    columnId: "file",
    compare: (a, b) => a.file.label.localeCompare(b.file.label),
    renderHeaderCell: () => "DO No.",
    renderCell: (item) => (
      <TableCellLayout style={{ maxWidth: "100px" }}>
        {item.file.label}
      </TableCellLayout>
    ),
  }),
  createTableColumn({
    columnId: "author",
    compare: (a, b) => a.author.label.localeCompare(b.author.label),
    renderHeaderCell: () => "Supplier Inv",
    renderCell: (item) => (
      <TableCellLayout style={{ maxWidth: "150px" }}>
        {item.author.label}
      </TableCellLayout>
    ),
  }),
  createTableColumn({
    columnId: "lastUpdated",
    renderHeaderCell: () => "ASN No",
    renderCell: (item) => (
      <TableCellLayout style={{ maxWidth: "200px" }}>
        {item.lastUpdated.label}
      </TableCellLayout>
    ),
  }),
  createTableColumn({
    columnId: "lastUpdate",
    renderHeaderCell: () => "Invoiced On",
    renderCell: (item) => (
      <TableCellLayout style={{ maxWidth: "100px" }}>
        {item.lastUpdate.label}
      </TableCellLayout>
    ),
  }),
  createTableColumn({
    columnId: "Quantity",
    renderHeaderCell: () => "PO - Rev",
    renderCell: (item) => (
      <TableCellLayout style={{ maxWidth: "100px" }}>
        {item.Quantity.label}
      </TableCellLayout>
    ),
  }),
  createTableColumn({
    columnId: "NeedByDate",
    renderHeaderCell: () => "Line Shipment No",
    renderCell: (item) => (
      <TableCellLayout style={{ maxWidth: "150px" }}>
        {item.NeedByDate.label}
      </TableCellLayout>
    ),
  }),
  createTableColumn({
    columnId: "ItemCode",
    renderHeaderCell: () => "Item Code",
    renderCell: (item) => (
      <TableCellLayout style={{ maxWidth: "150px" }}>
        {item.ItemCode.label}
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
  createTableColumn({
    columnId: "UOM",
    renderHeaderCell: () => "UOM",
    renderCell: (item) => (
      <TableCellLayout style={{ maxWidth: "150px" }}>
        {item.UOM.label}
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
    columnId: "Ordered",
    renderHeaderCell: () => "Ordered",
    renderCell: (item) => (
      <TableCellLayout style={{ maxWidth: "150px" }}>
        {item.Ordered.label}
      </TableCellLayout>
    ),
  }),
  createTableColumn({
    columnId: "Shipped",
    renderHeaderCell: () => "Shipped",
    renderCell: (item) => (
      <TableCellLayout style={{ maxWidth: "150px" }}>
        {item.Shipped.label}
      </TableCellLayout>
    ),
  }),
  createTableColumn({
    columnId: "ReceiptNo",
    renderHeaderCell: () => "Receipt No",
    renderCell: (item) => (
      <TableCellLayout style={{ maxWidth: "150px" }}>
        {item.ReceiptNo.label}
      </TableCellLayout>
    ),
  }),
  createTableColumn({
    columnId: "Received",
    renderHeaderCell: () => "Received",
    renderCell: (item) => (
      <TableCellLayout style={{ maxWidth: "150px" }}>
        {item.Received.label}
      </TableCellLayout>
    ),
  }),
  createTableColumn({
    columnId: "Accepted",
    renderHeaderCell: () => "Accepted",
    renderCell: (item) => (
      <TableCellLayout style={{ maxWidth: "150px" }}>
        {item.Accepted.label}
      </TableCellLayout>
    ),
  }),
  createTableColumn({
    columnId: "Rejected",
    renderHeaderCell: () => "Rejected",
    renderCell: (item) => (
      <TableCellLayout style={{ maxWidth: "150px" }}>
        {item.Rejected.label}
      </TableCellLayout>
    ),
  }),
  createTableColumn({
    columnId: "Cancelled",
    renderHeaderCell: () => "Cancelled",
    renderCell: (item) => (
      <TableCellLayout style={{ maxWidth: "150px" }}>
        {item.Cancelled.label}
      </TableCellLayout>
    ),
  }),
  createTableColumn({
    columnId: "InvoiceStatus",
    renderHeaderCell: () => "Invoice Status",
    renderCell: (item) => (
      <TableCellLayout style={{ maxWidth: "150px" }}>
        {item.InvoiceStatus.label}
      </TableCellLayout>
    ),
  }),
  createTableColumn({
    columnId: "DOStatus",
    renderHeaderCell: () => "DO Status",
    renderCell: (item) => (
      <TableCellLayout style={{ maxWidth: "150px" }}>
        {item.DOStatus.label}
      </TableCellLayout>
    ),
  }),
  createTableColumn({
    columnId: "CMStatus",
    renderHeaderCell: () => "CM Status",
    renderCell: (item) => (
      <TableCellLayout style={{ maxWidth: "150px" }}>
        {item.CMStatus.label}
      </TableCellLayout>
    ),
  }),
];

const ASNTable = () => {
  const defaultSortState = useMemo(
    () => ({ sortColumn: "file", sortDirection: "ascending" }),
    []
  );

  const gridContainerStyle = {
    
    width: "90vw",
    overflowX:"auto"
  };

  return (
    <div style={gridContainerStyle}>
      <DataGrid items={items} columns={columns} defaultSortState={defaultSortState}>
  <DataGridHeader>
    <DataGridRow>
      {({ renderHeaderCell }) => (
        <DataGridHeaderCell
          style={{
            maxWidth: "200px", 
              overflow: "visible",
              whiteSpace: "normal",
              wordBreak: "break-word",  
            textOverflow: "clip", 
            maxHeight:"300px"
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
                maxWidth: "200px", 
                overflow: "visible",
                whiteSpace: "normal",
                wordBreak: "break-word",  
              textOverflow: "clip", 
              maxHeight:"300px"
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

export default ASNTable;


