// API connection
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  ArrowClockwise28Regular,
  Delete28Regular,
  TasksApp28Regular,
} from "@fluentui/react-icons";
import { useNavigate } from "react-router-dom";
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
import Search from "./Search"; // Assuming your search component is imported here
import { Button, notification } from "antd"; // Import Ant Design components
import { useDispatch, useSelector } from "react-redux";
import { refreshActions } from "../Store/Store";
import { ShareIos24Filled } from "@fluentui/react-icons";
import { useRef } from "react";
import { Modal } from "antd";
import WalkInCandidate from "./WalkinCandidate";

// Define columns for the DataGrid
const columns = [
  createTableColumn({
    columnId: "GateEntryNumber",
    renderHeaderCell: () => "Gate Entry Number",
    renderCell: (item) => <TableCellLayout>{item.Id}</TableCellLayout>,
  }),
  // createTableColumn({
  //   columnId: "po_type",
  //   renderHeaderCell: () => "PO Type",
  //   renderCell: (item) => <TableCellLayout>{item.po_type}</TableCellLayout>,
  // }),
  // createTableColumn({
  //   columnId: "po_status",
  //   renderHeaderCell: () => "PO Status",
  //   renderCell: (item) => <TableCellLayout>{item.po_status}</TableCellLayout>,
  // }),
  createTableColumn({
    columnId: "supplier_name",
    renderHeaderCell: () => "Supplier Name",
    renderCell: (item) => (
      <TableCellLayout>{item.supplier_name}</TableCellLayout>
    ),
  }),
  createTableColumn({
    columnId: "location",
    renderHeaderCell: () => "Location",
    renderCell: (item) => <TableCellLayout>{item.location}</TableCellLayout>,
  }),
  // createTableColumn({
  //   columnId: "ship_to",
  //   renderHeaderCell: () => "Ship To",
  //   renderCell: (item) => <TableCellLayout>{item.ship_to}</TableCellLayout>,
  // }),
  createTableColumn({
    columnId: "ReceivedDate",
    renderHeaderCell: () => "Received Date",
    renderCell: (item) => <TableCellLayout>{item.ReceivedDate}</TableCellLayout>,
  }),
  createTableColumn({
    columnId: "line_count",
    renderHeaderCell: () => "Line Count",
    renderCell: (item) => <TableCellLayout>{item.line_count}</TableCellLayout>,
  }),
  createTableColumn({
    columnId: "invoice_amount",
    renderHeaderCell: () => "Invoice Amount",
    renderCell: (item) => (
      <TableCellLayout>
        {item.invoice_amount}
      </TableCellLayout>
    ),
  }),
  createTableColumn({
    columnId: "tax_amount",
    renderHeaderCell: () => "Tax Net Amount",
    renderCell: (item) => (
      <TableCellLayout>{item.tax_amount || "N/A"}</TableCellLayout>
    ),
  }),
];

const GateEntryTable = ({setTableLength}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [items, setItems] = useState([]); // State to hold API data
  const [selectedRows, setSelectedRows] = useState(new Set());
  const [po_id, set_Po_id] = useState("");
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const isInvoiceUploadRefreshed = useSelector(
    (state) => state.refresh.InvoiceUploadRefresh,
  );

  const [RefreshUpload, SetRefreshUpload] = useState(null);

  const [DeleteRefresh, SetDeleteRefresh] = useState(false);

  // Fetch data from the API when the component mounts
  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://invoicezapi.focusrtech.com:57/user/invoices",
      );
      const fetchedItems = response.data; // Assuming data is in response.data
      console.log("fetchedItems", fetchedItems);
      set_Po_id(fetchedItems[0]["po_headers"][0]["id"]);
      let supplierName = fetchedItems[0].po_headers[0]?.supplier_name;
      let location = fetchedItems[0].po_headers?.[0]?.location || '';
      setTableLength(fetchedItems.length);
      const mappedItems = fetchedItems.map((item) => ({
        Id: item.id,
        InvoiceId: item.id,
        InvoiceNumber: item.InvoiceId,
        GateEntryNumber:item.po_headers.po_number,
        supplier_name: item.VendorName,
        invoice_amount:item.InvoiceTotal,
        location:item.VendorAddress.city,
        line_count:item.items.length,
        tax_amount:item.InvoiceTotal
        
      }));

      // const purchase = fetchedItems.po_headers.map((item)=>({
      //    po_num:item.po_number
      // }))
      
      setItems(mappedItems);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    SetRefreshUpload(isInvoiceUploadRefreshed);
  }, []);

  useEffect(() => {
    fetchData();
  }, [isInvoiceUploadRefreshed]);

  const handleSearchChange = (value) => {
    setSearchQuery(value);
  };
  // console.log("--------->",filteredItems)
  const filteredItems = items.filter((item) => {
    const searchLower = searchQuery?.trim().toLowerCase() || "";

    return (
      
      item.GateEntryNumber?.toLowerCase().includes(searchLower) ||
      item.po_status?.toLowerCase().includes(searchLower) ||
      item.supplier_name?.toLowerCase().includes(searchLower) ||
      item.location?.toLowerCase().includes(searchLower) ||
      item.supplier_site?.toLowerCase().includes(searchLower) ||
      item.ReceivedDate?.toLowerCase().includes(searchLower) ||
      // item.line_count?.toLowerCase().includes(searchLower) ||
      item.tax_amount?.toLowerCase().includes(searchLower) 
      
    );
  });

  const handleRowClick = (e, item) => {
    if (e.target.type !== "checkbox") {
      navigate(`/approvepage`, {
        state: { poNumber: item.po_number, Id: item.Id },
      });
      console.log("ItemId", item.Id);
    }
  };

  const handleSelectionChange = (event, data) => {
    console.log("handleSelectionChange", data.selectedItems);
    setSelectedRows(data.selectedItems);
  };

  //  delete API
  const handleDeleteSelectedRows = async () => {
    const selectedItemsArray = Array.from(selectedRows);
    if (selectedItemsArray.length === 0) {
      notification.warning({
        message: "No PO Selected",
        description: "Please select at least one PO to delete.",
      });
      return;
    }

    try {
      const supplierNames = selectedItemsArray
        .map((item) => item.supplier_name)
        .join(", ");

      const deletePromises = selectedItemsArray.map((item) =>
        axios.delete(
          `http://127.0.0.1:8000/user/delete-invoice/${filteredItems[item].InvoiceId}`,
        ),
      );

      await Promise.all(deletePromises);

      const newItems = items.filter(
        (item) =>
          !selectedItemsArray.some(
            (selectedItem) => selectedItem.InvoiceId === item.InvoiceId,
          ), // Ensure to compare InvoiceId
      );

      setItems(newItems);

      notification.success({
        message: "Successfully deleted",
        description: `You have successfully deleted: ${supplierNames}`,
      });

      dispatch(refreshActions.toggleInvoiceUploadRefresh());
    } catch (error) {
      const supplierNames = selectedItemsArray
        .map((item) => item.supplier_name)
        .join(", ");
      notification.error({
        message: "Deletion Failed",
        description: `Deletion Failed for: ${supplierNames}. ${error.response?.data?.message || "An error occurred."}`,
      });
    }
  };

  // Approve API

  const handleApproveSelectedRows = async () => {
    const selectedItemsArray = Array.from(selectedRows); // Convert Set to Array
    if (selectedItemsArray.length === 0) {
      notification.warning({
        message: "No PO Selected",
        description: "Please select at least one PO to Approve.",
      });
      return;
    }

    try {
      const supplierNames = selectedItemsArray
        .map((item) => item.supplier_name)
        .join(", ");

      // Make API call to delete selected POs
      await Promise.all(
        selectedItemsArray.map((item) =>
          axios.post(`http://127.0.0.1:8000/user/oracle-payload/${po_id}`),
        ),
      );

      // Remove deleted items from the state
      setItems(items.filter((item) => !selectedItemsArray.includes(item)));

      // Show success notification
      notification.success({
        message: "Successfully Approved",
        description: `You have successfully approved: ${supplierNames}`,
      });
      dispatch(refreshActions.toggleInvoiceUploadRefresh());
    } catch (error) {
      const supplierNames = selectedItemsArray
        .map((item) => item.supplier_name)
        .join(", ");
      notification.error({
        message: "Approval Failed",
        description: `Approval Failed for: ${supplierNames}. ${error.response?.data?.message || "An error occurred."}`,
      });
    }
  };

  //Invoice Upload
  const [isWalkinUpload, setIsWalkinUpload] = useState(false);
  const [newCandidate, setNewCandidate] = useState(false);

  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    // Trigger the file input click
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleFileChange = async (info) => {
    const { status, originFileObj: file } = info.file;

    if (status === "uploading") {
      // Ignore this, as we're handling the file manually
      return;
    }

    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await axios.post(
          "http://127.0.0.1:8000/user/invoice-upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          },
        );

        notification.success({
          message: "Upload Successful",
          description: `File ${file.name} uploaded successfully!`,
        });
        // handleToggle();
      } catch (error) {
        console.error("Upload failed:", error);
        notification.error({
          message: "Upload Failed",
          description:
            "There was an error uploading the file. Please try again.",
        });
      }
    }
  };

  // const handleNewCandidateBtn = () => {
  //   console.log("btn clicked");
  //   setNewCandidate(true);
  // };

  const handleIsWalkinUpload = () => {
    console.log("yes it works");
    setIsWalkinUpload(true);
    setNewCandidate(false);
  };
  const handleNewCandidate = () => {
    setNewCandidate(false);
  };
  const handleNewCandidateBtn = () => {
    console.log("btn clicked");
    setNewCandidate(true);
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
          fontWeight: "bold",
          // marginLeft: "-3em",
        }}
      >
        {/* <button
          style={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "transparent",
            border: "1px solid #fff",
            padding: "6px 12px",
            cursor: "pointer",
            gap: "8px",
            marginLeft: "2em",
            height: "7vh",
          }}
          onClick={handleDeleteSelectedRows} // Call delete function
        >
          <Delete28Regular style={{ color: "#1281d7" }} />
          <span>Delete</span>
        </button> */}

        <button
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center", // Ensures alignment in case of larger button dimensions
            backgroundColor: "transparent",
            border: "1px solid #fff",
            padding: "6px 12px",
            cursor: "pointer",
            gap: "8px",
            marginLeft: "2em",
            whiteSpace: "nowrap", // Prevents wrapping of content
          }}
          onClick={handleNewCandidateBtn}
        >
          <ShareIos24Filled style={{ color: "#1281d7" }} />
          {/* <TasksApp28Regular style={{ color: "#1281d7" }} /> */}
          <span>Upload-Invoice</span>
        </button>

        {/* <button
          style={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "transparent",
            border: "1px solid #fff",
            padding: "6px 12px",
            cursor: "pointer",
            gap: "8px",
            marginLeft: "2em",
          }}
          onClick={fetchData}
        >
          <ArrowClockwise28Regular style={{ color: "#1281d7" }} />
          <span>Refresh</span>
        </button> */}

        <Search placeholder="Search" onSearchChange={handleSearchChange} />
      </div>
      {/* <div>

      </div> */}
      <div
        style={{
          height: "60vh",
          overflow: "scroll",
          marginTop: "20px",
        }}
      >
        <DataGrid
          items={filteredItems}
          columns={columns}
          sortable
          selectionMode="multiselect"
          onSelectionChange={handleSelectionChange}
          getRowId={(_, index) => index}
          focusMode="composite"
          style={{ minWidth: "600px" }}
        >
          <DataGridHeader>
            <DataGridRow>
              {({ renderHeaderCell }) => (
                <DataGridHeaderCell>{renderHeaderCell()}</DataGridHeaderCell>
              )}
            </DataGridRow>
          </DataGridHeader>
          <DataGridBody>
            {({ item, rowId }) => (
              <DataGridRow
                key={rowId}
                // onClick={(e) => handleRowClick(e, item)}
                // selected={selectedRows.has(rowId)}
              >
                {({ renderCell }) => (
                  <DataGridCell
                    style={{
                      wordWrap: "break-word",
                      whiteSpace: "normal",
                      overflow: "hidden",
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

      <Modal
        open={newCandidate}
        onCancel={handleNewCandidate}
        width={540}
        footer={[]}
      >
        <WalkInCandidate isWalkinUpload={handleIsWalkinUpload} />
      </Modal>
    </>
  );
};

export default GateEntryTable;
