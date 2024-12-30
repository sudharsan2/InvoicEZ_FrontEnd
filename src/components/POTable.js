import React, { useMemo ,useEffect,useState} from "react";
import {
  DataGrid,
  DataGridBody,
  DataGridRow,
  DataGridHeader,
  DataGridHeaderCell,
  DataGridCell,
  TableCellLayout,
  createTableColumn,
  makeStyles
} from "@fluentui/react-components";


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
  



  const StatusCell = ({ statusLabel }) => {
    const styles = useStyles();

    let statusStyle;
    if (statusLabel === "Acknowledged") {
        statusStyle = styles.statusAck;
    } else if (statusLabel === "To be Acknowledged") {
        statusStyle = styles.statusTobe;
    } else {
        statusStyle = styles.statusReject;
    }
  
    return (
      <TableCellLayout>
        <span className={`${styles.statusBullet} ${statusStyle}`} />
        {statusLabel}
      </TableCellLayout>
    );
  };


const POTable = () => {
  const defaultSortState = useMemo(
    () => ({ sortColumn: "file", sortDirection: "ascending" }),
    []
  );
  const [data, setData] = useState([]);


  const fetchAcknowledgeList = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch("http://172.235.21.99:5729/user/acknowledgeList", {
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
        const lineItem = item.line_items?.[0] || {}; 
        const distribution = lineItem.distributions?.[0] || {}; 
        console.log("TYPE",lineItem.need_by_date);
        return {
          id: item.id,
          supplier:item.supplier_ids,
          requestor:item.requestor,
          lineType: lineItem.line_type,
          rev: distribution.distribution_number, 
          documentNumber: item.document_number,
          // description: item.description,
          currency:item.currency,
          lastupdate:lineItem.last_update_date,
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
          site:item.site,
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
      columnId: "supplier",
      compare: (a, b) => a.author.label.localeCompare(b.author.label),
      renderHeaderCell: () => "Supplier",
      renderCell: (item) => (
        <TableCellLayout style={{ maxWidth: "150px" }}>
          {item.supplier}
        </TableCellLayout>
      ),
    }),
    createTableColumn({
      columnId: "rev",
      renderHeaderCell: () => "PO-Rev",
      renderCell: (item) => (
        <TableCellLayout style={{ maxWidth: "200px" }}>
          {item.rev}
        </TableCellLayout>
      ),
    }),
    createTableColumn({
      columnId: "lineNumber",
      renderHeaderCell: () => "Line_Shipment_No",
      renderCell: (item) => (
        <TableCellLayout style={{ maxWidth: "100px" }}>
          {item.lineNumber}
        </TableCellLayout>
      ),
    }),
    createTableColumn({
      columnId: " itemNumber",
      renderHeaderCell: () => "Item_Code",
      renderCell: (item) => (
        <TableCellLayout style={{ maxWidth: "100px" }}>
          {item. itemNumber}
        </TableCellLayout>
      ),
    }),
    createTableColumn({
      columnId: "lineDescription",
      renderHeaderCell: () => "Description",
      renderCell: (item) => (
        <TableCellLayout style={{ maxWidth: "150px" }}>
          {item.lineDescription}
        </TableCellLayout>
      ),
    }),
   
    createTableColumn({
      columnId: "ship",
      renderHeaderCell: () => "QTY/Amount",
      renderCell: (item) => (
        <TableCellLayout style={{ maxWidth: "150px" }}>
          {item.ship}
        </TableCellLayout>
      ),
    }),
    createTableColumn({
      columnId: "price",
      renderHeaderCell: () => "Unit Price",
      renderCell: (item) => (
        <TableCellLayout style={{ maxWidth: "150px" }}>
          {item.price}
        </TableCellLayout>
      ),
    }),
    createTableColumn({
      columnId: "currency",
      renderHeaderCell: () => "Currency",
      renderCell: (item) => (
        <TableCellLayout style={{ maxWidth: "150px" }}>
          {item.currency}
        </TableCellLayout>
      ),
    }),
    // createTableColumn({
    //   columnId: "Tax",
    //   renderHeaderCell: () => "Tax%",
    //   renderCell: (item) => (
    //     <TableCellLayout style={{ maxWidth: "150px" }}>
    //       {item.Tax.label}
    //     </TableCellLayout>
    //   ),
    // }),
    createTableColumn({
      columnId: "needByDate",
      renderHeaderCell: () => "Need By Date",
      renderCell: (item) => (
        <TableCellLayout style={{ maxWidth: "150px" }}>
          {item.needByDate}
        </TableCellLayout>
      ),
    }),
    // createTableColumn({
    //   columnId: "site",
    //   renderHeaderCell: () => "Ship To ORG",
    //   renderCell: (item) => (
    //     <TableCellLayout style={{ maxWidth: "150px" }}>
    //       {item.site}
    //     </TableCellLayout>
    //   ),
    // }),
    // createTableColumn({
    //   columnId: "Remarks",
    //   renderHeaderCell: () => "Remarks",
    //   renderCell: (item) => (
    //     <TableCellLayout style={{ maxWidth: "150px" }}>
    //       {item.Remarks.label}
    //     </TableCellLayout>
    //   ),
    // }),
    // createTableColumn({
    //   columnId: "requestor",
    //   renderHeaderCell: () => "Request",
    //   renderCell: (item) => (
    //     <TableCellLayout style={{ maxWidth: "150px" }}>
    //       {item.requestor}
    //     </TableCellLayout>
    //   ),
    // }),
  
    createTableColumn({
      columnId: "lastupdate",
      renderHeaderCell: () => "Reshedule Date",
      renderCell: (item) => (
        <TableCellLayout style={{ maxWidth: "150px" }}>
          {item.lastupdate}
        </TableCellLayout>
      ),
    }),
    // createTableColumn({
    //   columnId: "lastupdate",
    //   renderHeaderCell: () => "Remainder Date",
    //   renderCell: (item) => (
    //     <TableCellLayout style={{ maxWidth: "150px" }}>
    //       {item.lastupdate}
    //     </TableCellLayout>
    //   ),
    // }),
   
  ];
  const gridContainerStyle = {
    overflowX: "auto", 
    width: "90vw", 
  };

  return (
    <div style={gridContainerStyle}>
      <DataGrid items={data} columns={columns} defaultSortState={defaultSortState}>
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


