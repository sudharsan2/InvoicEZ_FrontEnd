
import * as React from "react";
import { useEffect, useState } from "react";
import {
  DataGrid,
  DataGridBody,
  DataGridCell,
  DataGridHeader,
  DataGridHeaderCell,
  DataGridRow,
  TableCellLayout,
  createTableColumn,
  
} from "@fluentui/react-components";

const ASNCreateTable = () => {
  const [data, setData] = useState([]);

  
  const fetchAcknowledgeList = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch("https://invoicezapi.focusrtech.com:57/user/acknowledgeList", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      const responseData = await response.json();
      // Transform API data into table-friendly format
      const formattedData = responseData.map((item) => {
        const lineItem = item.line_items?.[0] || {}; // Use the first line item if available
        const distribution = lineItem.distributions?.[0] || {}; // Use the first distribution if available
        return {
          id: item.id,
          lineType: lineItem.line_type,
          rev: distribution.distribution_number, // Extract distribution number from the first distribution
          documentNumber: item.document_number,
          status: item.status,
          lineNumber: lineItem.line_number,
          itemNumber: lineItem.item_number,
          lineDescription: lineItem.description,
          uom: lineItem.uom,
          quantity: lineItem.quantity,
          ship:distribution.quantity,
          price: lineItem.price,
          totalAmount: lineItem.amount,
          needByDate: lineItem.need_by_date,
        };
      });
      
      setData(formattedData);
    } catch (error) {
      console.error("Failed to fetch acknowledge list:", error);
    }
  };

  useEffect(() => {
    fetchAcknowledgeList();
  }, []);

  
  const columns = [
    createTableColumn({
      columnId: "lineType",
      renderHeaderCell: () => "Type",
      renderCell: (item) => <TableCellLayout>{item.lineType}</TableCellLayout>,
    }),
    createTableColumn({
      columnId: "rev",
      renderHeaderCell: () => "PO-REV",
      renderCell: (item) => <TableCellLayout>{item.rev}</TableCellLayout>,
    }),
    createTableColumn({
      columnId: "lineDescription",
      renderHeaderCell: () => "Description",
      renderCell: (item) => <TableCellLayout>{item.lineDescription}</TableCellLayout>,
    }),
    createTableColumn({
      columnId: "lineNumber",
      renderHeaderCell: () => "Line Shipment Number",
      renderCell: (item) => <TableCellLayout>{item.lineNumber}</TableCellLayout>,
    }),
    createTableColumn({
      columnId: "itemNumber",
      renderHeaderCell: () => "Item Code",
      renderCell: (item) => <TableCellLayout>{item.itemNumber}</TableCellLayout>,
    }),
   
    
    createTableColumn({
      columnId: "quantity",
      renderHeaderCell: () => " Ordered Quantity",
      renderCell: (item) => <TableCellLayout>{item.quantity}</TableCellLayout>,
    }),
    createTableColumn({
      columnId: "ship",
      renderHeaderCell: () => " Minimum Quantity",
      renderCell: (item) => <TableCellLayout>{item.ship}</TableCellLayout>,
    }),
    createTableColumn({
      columnId: "quantity",
      renderHeaderCell: () => " Shiping Quantity",
      renderCell: (item) => <TableCellLayout>{item.quantity}</TableCellLayout>,
    }),
    createTableColumn({
      columnId: "price",
      renderHeaderCell: () => "Price",
      renderCell: (item) => <TableCellLayout>{item.price}</TableCellLayout>,
    }),
    createTableColumn({
      columnId: "totalAmount",
      renderHeaderCell: () => "Total Amount",
      renderCell: (item) => <TableCellLayout>{item.totalAmount}</TableCellLayout>,
    }),
    createTableColumn({
      columnId: "needByDate",
      renderHeaderCell: () => "Need By Date",
      renderCell: (item) => <TableCellLayout>{item.needByDate}</TableCellLayout>,
    }),
  ];

  return (
    <div style={{ overflowX: "auto" }}>
      <DataGrid
        items={data}
        columns={columns}
        getRowId={(item) => item.id}
        sortable
        resizableColumns
        selectionMode="multiselect"
      >
        <DataGridHeader>
          <DataGridRow selectionCell={{ checkboxIndicator: { "aria-label": "Select all rows" } }}>
            {({ renderHeaderCell }) => (
              <DataGridHeaderCell>{renderHeaderCell()}</DataGridHeaderCell>
            )}
          </DataGridRow>
        </DataGridHeader>
        <DataGridBody>
          {({ item }) => (
            <DataGridRow key={item.id} selectionCell={{ checkboxIndicator: { "aria-label": "Select row" } }}>
              {({ renderCell }) => <DataGridCell>{renderCell(item)}</DataGridCell>}
            </DataGridRow>
          )}
        </DataGridBody>
      </DataGrid>
    </div>
  );
};

export default ASNCreateTable;
