import * as React from "react";
import {
  FolderRegular,
  EditRegular,
  OpenRegular,
  DocumentRegular,
  PeopleRegular,
  DocumentPdfRegular,
  VideoRegular,
} from "@fluentui/react-icons";
import {
  PresenceBadgeStatus,
  Avatar,
  DataGridBody,
  DataGridRow,
  DataGrid,
  DataGridHeader,
  DataGridHeaderCell,
  DataGridCell,
  TableCellLayout,
  createTableColumn,
} from "@fluentui/react-components";
 
// Sample data for items
const items = [
  {
    file: { label: "13456",  },
    author: { label: "Bluetech",  },
    lastUpdated: { label: "chennai", timestamp: 1 },
    lastUpdate: {
      label: "12/03/2024",
   
    },
    TotalAmount:{
        label:"15000 INR"
    },
    InvoiceDate:{
        label:"12/03/2024"
    }
  },
  {
    file: { label: "13459",  },
    author: { label: "Facebook",  },
    lastUpdated: { label: "chennai", timestamp: 2 },
    lastUpdate: {
      label: "17/04/2024",
     
    },
    TotalAmount:{
        label:"15000 INR"
    },
    InvoiceDate:{
        label:"12/03/2024"
    }
  },
  {
    file: { label: "13465",  },
    author: { label: "Intel", },
    lastUpdated: { label: "coimbatore", timestamp: 2 },
    lastUpdate: {
      label: "17/05/2024",
     
    },
    TotalAmount:{
        label:"16000 INR"
    },
    InvoiceDate:{
        label:"12/03/2024"
    }
  },
  {
    file: { label: "13466",},
    author: { label: "Shar_Supplier",  },
    lastUpdated: { label: "Salem", timestamp: 3 },
    lastUpdate: {
      label: "27/06/2024",
     
    },
    TotalAmount:{
        label:"18000 INR"
    },
    InvoiceDate:{
        label:"12/03/2024"
    }
  },
  {
    file: { label: "13472",},
    author: { label: "Google",  },
    lastUpdated: { label: "Madurai", timestamp: 3 },
    lastUpdate: {
      label: "7/04/2024",
     
    },
    TotalAmount:{
        label:"25000 INR"
    },
    InvoiceDate:{
        label:"12/03/2024"
    }
  },
  {
    file: { label: "13477",},
    author: { label: "Levin Technologies", },
    lastUpdated: { label: "Coimbatore", timestamp: 3 },
    lastUpdate: {
      label: "27/08/2024",
     
    },
    TotalAmount:{
        label:"45000 INR"
    },
    InvoiceDate:{
        label:"12/03/2024"
    }
  },
  {
    file: { label: "13489",},
    author: { label: "Jane Doe"},
    lastUpdated: { label: "Chennai", timestamp: 3 },
    lastUpdate: {
      label: "17/10/2024",
     
    },
    TotalAmount:{
        label:"35000 INR"
    },
    InvoiceDate:{
        label:"12/03/2024"
    }
 
  },
];
 
// Column definitions
const columns = [
  createTableColumn({
    columnId: "file",
    compare: (a, b) => a.file.label.localeCompare(b.file.label),
    renderHeaderCell: () => "PO Number",
    renderCell: (item) => (
      <TableCellLayout media={item.file.icon}>{item.file.label}</TableCellLayout>
    ),
  }),
  createTableColumn({
    columnId: "author",
    compare: (a, b) => a.author.label.localeCompare(b.author.label),
    renderHeaderCell: () => "Supplier",
    renderCell: (item) => (
      <TableCellLayout
       
      >
        {item.author.label}
      </TableCellLayout>
    ),
  }),
  createTableColumn({
    columnId: "lastUpdated",
    compare: (a, b) => a.lastUpdated.timestamp - b.lastUpdated.timestamp,
    renderHeaderCell: () => "Site",
    renderCell: (item) => item.lastUpdated.label,
  }),
  createTableColumn({
    columnId: "lastUpdate",
    compare: (a, b) => a.lastUpdate.label.localeCompare(b.lastUpdate.label),
    renderHeaderCell: () => "PO Date",
    renderCell: (item) => (
      <TableCellLayout media={item.lastUpdate.icon}>
        {item.lastUpdate.label}
      </TableCellLayout>
    ),
  }),
  createTableColumn({
    columnId: "TotalAmount",
    compare: (a, b) => a.lastUpdate.label.localeCompare(b.TotalAmount.label),
    renderHeaderCell: () => "Total Amount",
    renderCell: (item) => (
      <TableCellLayout media={item.lastUpdate.icon}>
        {item.TotalAmount.label}
      </TableCellLayout>
    ),
  }),
  createTableColumn({
    columnId: "InvoiceDate",
    compare: (a, b) => a.lastUpdate.label.localeCompare(b.InvoiceDate.label),
    renderHeaderCell: () => "InvoiceDate",
    renderCell: (item) => (
      <TableCellLayout media={item.lastUpdate.icon}>
        {item.InvoiceDate.label}
      </TableCellLayout>
    ),
  }),
 
];
 
// ApproveTable component
const ApproveTable = () => {
  return (
    <DataGrid
            items={items}
            columns={columns}
            sortable
            selectionMode="multiselect"
            getRowId={(item) => item.file.label}
            focusMode="composite"
            style={{ minWidth: "550px" }}
        >
            <DataGridHeader>
                <DataGridRow
                    selectionCell={{
                        checkboxIndicator: { "aria-label": "Select all rows" },
                    }}
                >
                    {({ renderHeaderCell }) => (
                        <DataGridHeaderCell>{renderHeaderCell()}</DataGridHeaderCell>
                    )}
                </DataGridRow>
            </DataGridHeader>
            <DataGridBody>
                {({ item, rowId }) => (
                    <DataGridRow
                        key={rowId}
                        selectionCell={{
                            checkboxIndicator: { "aria-label": "Select row" },
                        }}
                    >
                        {({ renderCell }) => (
                            <DataGridCell>{renderCell(item)}</DataGridCell>
                        )}
                    </DataGridRow>
                )}
            </DataGridBody>
        </DataGrid>
  );
};
 
export default ApproveTable;