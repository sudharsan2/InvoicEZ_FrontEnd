// import * as React from "react";
// import { useEffect } from "react";
// import {
//   FolderRegular,
//   EditRegular,
//   DocumentRegular,
//   PeopleRegular,
//   DocumentPdfRegular,
// } from "@fluentui/react-icons";
// import {
//   Avatar,
//   DataGrid,
//   DataGridBody,
//   DataGridCell,
//   DataGridHeader,
//   DataGridHeaderCell,
//   DataGridRow,
//   TableCellLayout,
//   createTableColumn,
//   Input,
// } from "@fluentui/react-components";

// const items = [
//   {
//     file: { label: "Meeting notes", icon: <DocumentRegular /> },
//     author: { label: "Max Mustermann", status: "available" },
//     lastUpdated: { label: "7h ago", timestamp: 1 },
//     lastUpdate: { label: "You edited this", icon: <EditRegular /> },
//     shipmentQuantity: 5,
//   },
//   // Additional item objects can go here...
// ];

// const ASNCreateTable = () => {
//   const [data, setData] = React.useState(items);

 
//   const handleShipmentQuantityChange = (index, value) => {
//     setData((prevData) => {
//       const newData = [...prevData];
//       newData[index] = { ...newData[index], shipmentQuantity: value };
//       return newData;
//     });
//   };

//   const columns = [
//     createTableColumn({
//       columnId: "file",
//       compare: (a, b) => a.file.label.localeCompare(b.file.label),
//       renderHeaderCell: () => "Type",
//       renderCell: (item) => (
//         <TableCellLayout truncate >
         
//         </TableCellLayout>
//       ),
//     }),
//     createTableColumn({
//       columnId: "author",
//       compare: (a, b) => a.author.label.localeCompare(b.author.label),
//       renderHeaderCell: () => "PO-Rev",
//       renderCell: (item) => (
//         <TableCellLayout
//           truncate
          
//         >
          
//         </TableCellLayout>
//       ),
//     }),
//     createTableColumn({
//       columnId: "lastUpdated",
//       compare: (a, b) => a.lastUpdated.timestamp - b.lastUpdated.timestamp,
//       renderHeaderCell: () => "Release No",
//       renderCell: (item) => (
//         <TableCellLayout truncate></TableCellLayout>
//       ),
//     }),
//     createTableColumn({
//       columnId: "lastUpdate",
//       compare: (a, b) => a.lastUpdate.label.localeCompare(b.lastUpdate.label),
//       renderHeaderCell: () => "Line Shipment No",
//       renderCell: (item) => (
//         <TableCellLayout truncate >
          
//         </TableCellLayout>
//       ),
//     }),
//     createTableColumn({
//       columnId: "lastUpdate",
//       compare: (a, b) => a.lastUpdate.label.localeCompare(b.lastUpdate.label),
//       renderHeaderCell: () => "Ship To Org",
//       renderCell: (item) => (
//         <TableCellLayout truncate >
          
//         </TableCellLayout>
//       ),
//     }),
//     createTableColumn({
//       columnId: "lastUpdate",
//       compare: (a, b) => a.lastUpdate.label.localeCompare(b.lastUpdate.label),
//       renderHeaderCell: () => "Item Code",
//       renderCell: (item) => (
//         <TableCellLayout truncate >
          
//         </TableCellLayout>
//       ),
//     }),
//     createTableColumn({
//       columnId: "lastUpdate",
//       compare: (a, b) => a.lastUpdate.label.localeCompare(b.lastUpdate.label),
//       renderHeaderCell: () => "Description",
//       renderCell: (item) => (
//         <TableCellLayout truncate>
        
//         </TableCellLayout>
//       ),
//     }),
//     createTableColumn({
//       columnId: "lastUpdate",
//       compare: (a, b) => a.lastUpdate.label.localeCompare(b.lastUpdate.label),
//       renderHeaderCell: () => "Ordered Qty/Amount",
//       renderCell: (item) => (
//         <TableCellLayout truncate >
          
//         </TableCellLayout>
//       ),
//     }),
//     createTableColumn({
//       columnId: "lastUpdate",
//       compare: (a, b) => a.lastUpdate.label.localeCompare(b.lastUpdate.label),
//       renderHeaderCell: () => "Pending Qty/Amount",
//       renderCell: (item) => (
//         <TableCellLayout truncate >
          
//         </TableCellLayout>
//       ),
//     }),
//     createTableColumn({
//         columnId: "shipmentQuantity",
//         renderHeaderCell: () => "Shipment Quantity",
//         renderCell: (item, rowIndex) => (
//           <Input
//             value={data[rowIndex]?.shipmentQuantity ?? ""}
//             onChange={(e) => handleShipmentQuantityChange(rowIndex, e.target.value)}
//             type="number"
//             size="small"
//             style={{ width: "100%" }}
//           />
//         ),
//       }),
//     createTableColumn({
//       columnId: "lastUpdate",
//       compare: (a, b) => a.lastUpdate.label.localeCompare(b.lastUpdate.label),
//       renderHeaderCell: () => "Minimum Quantity",
//       renderCell: (item) => (
//         <TableCellLayout truncate >
          
//         </TableCellLayout>
//       ),
//     }),
//     createTableColumn({
//       columnId: "lastUpdate",
//       compare: (a, b) => a.lastUpdate.label.localeCompare(b.lastUpdate.label),
//       renderHeaderCell: () => "Scheduled",
//       renderCell: (item) => (
//         <TableCellLayout truncate >
          
//         </TableCellLayout>
//       ),
//     }),
//   ];

//   const fetchAcknowledgeList = async () => {
//     try {
//       // Retrieve the access token from localStorage
//       const token = localStorage.getItem("access_token");
  
//       // Make the GET request with the token in the Authorization header
//       const response = await fetch("https://invoicezapi.focusrtech.com:57/user/acknowledgeList", {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`, // Include the token
//         },
//       });
  
//       if (!response.ok) {
//         throw new Error(`Error: ${response.status} - ${response.statusText}`);
//       }
  
//       const data = await response.json();
//       console.log("Acknowledge List:", data);
  
//       // Handle the response data (e.g., update state or UI)
//       return data;
//     } catch (error) {
//       console.error("Failed to fetch acknowledge list:", error);
//     }
//   };
  
//   useEffect(()=>{
//     fetchAcknowledgeList();
//   },[]);
  
  
  
//   return (
//     <div style={{ overflowX: "auto" }}>
//       <DataGrid
//         items={data}
//         columns={columns}
//         sortable
//         getRowId={(item) => item.file.label}
//         selectionMode="multiselect"
//         resizableColumns
//       >
//         <DataGridHeader>
//           <DataGridRow selectionCell={{ checkboxIndicator: { "aria-label": "Select all rows" } }}>
//             {({ renderHeaderCell }) => (
//               <DataGridHeaderCell>{renderHeaderCell()}</DataGridHeaderCell>
//             )}
//           </DataGridRow>
//         </DataGridHeader>
//         <DataGridBody>
//           {({ item, rowId }) => (
//             <DataGridRow key={rowId} selectionCell={{ checkboxIndicator: { "aria-label": "Select row" } }}>
//               {({ renderCell }, rowIndex) => (
//                 <DataGridCell>{renderCell(item, rowIndex)}</DataGridCell>
//               )}
//             </DataGridRow>
//           )}
//         </DataGridBody>
//       </DataGrid>
//     </div>
//   );
// };

// export default ASNCreateTable;





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
  Input,
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
          // description: item.description,
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

  // Columns definition
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
