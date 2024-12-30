// API connection
import React, { useEffect, useState } from "react";
import axios from "axios";
import { ArrowSortUpFilled, ArrowSortDownRegular ,DismissRegular,} from "@fluentui/react-icons";
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
  makeStyles, Input, 
} from "@fluentui/react-components";

import Search from "./Search"; 
import { Button,message} from "antd"; 
import { useDispatch, useSelector } from "react-redux";
import CreatableSelect from "react-select/creatable";
// Define columns for the DataGrid
const columns = [
  createTableColumn({
    columnId: "po_number",
    renderHeaderCell: () => "PO Number",
    renderCell: (item) => <TableCellLayout>{item.po_number}</TableCellLayout>,
  }),
  createTableColumn({
    columnId: "supplier",
    renderHeaderCell: () => "PO Type",
    renderCell: (item) => <TableCellLayout>{item.po_type}</TableCellLayout>,
  }),
  createTableColumn({
    columnId: "Amount",
    renderHeaderCell: () => "PO Status",
    renderCell: (item) => <TableCellLayout>{item.po_status}</TableCellLayout>,
  }),
  createTableColumn({
    columnId: "supplier_name",
    renderHeaderCell: () => "Supplier Name",
    renderCell: (item) => (
      <TableCellLayout>{item.supplier_name}</TableCellLayout>
    ),
  }),
  createTableColumn({
    columnId: "Buyer",
    renderHeaderCell: () => "Buyer Name",
    renderCell: (item) => (
      <TableCellLayout>{item.Buyer}</TableCellLayout>
    ),
  }),

  createTableColumn({
    columnId: "totamount",
    renderHeaderCell: () => "Total Amount",
    renderCell: (item) => (
      <TableCellLayout>{item.totamount}</TableCellLayout>
    ),
  }),
  createTableColumn({
    columnId: "poheader",
    renderHeaderCell: () => "PO Header ID",
    renderCell: (item) => (
      <TableCellLayout>{item.poheader}</TableCellLayout>
    ),
  }),
  createTableColumn({
    columnId: "vendor",
    renderHeaderCell: () => "Vendor Site ID",
    renderCell: (item) => (
      <TableCellLayout>{item.vendor}</TableCellLayout>
    ),
  }),
  createTableColumn({
    columnId: "vendor_num",
    renderHeaderCell: () => "Vendor Number",
    renderCell: (item) => (
      <TableCellLayout>{item.vendor_num}</TableCellLayout>
    ),
  }),


  createTableColumn({
    columnId: "location",
    renderHeaderCell: () => "Location",
    renderCell: (item) => <TableCellLayout>{item.location}</TableCellLayout>,
  }),
  
];

const useStyles = makeStyles({
  root: {
    
    display: "flex",
    flexDirection: "column",
    gap: "2px",
    maxWidth: "400px",
  },
});
const OpenPoTable = () => {
  
  const [Hovered2,setIsHovered2] = useState(false);
 
  const [searchQuery, setSearchQuery] = useState("");
  const [items, setItems] = useState([]); // State to hold API data
  const [selectedRows, setSelectedRows] = useState(new Set());
  
  const navigate = useNavigate();
  

 
  const [poNumber, setPoNumber] = useState("");
  const [POStatusOptions, setPOStatusOptions] = useState([]);
  const [SelectedPOTypeOptions,setSelectedPOTypeOptions] = useState([]);
  const [selectedSupplierOptions, setSelectedSupplierNameOptions] = useState([]);
  const [selectedShipToOptions, setSelectedShipToOptions] = useState([]);
 
  const [selectedBuyerNameOptions, setSelectedBuyerNameOptions] = useState([]);
  const [selectedPOStatus, setSelectedPOStatus] = useState(null);
  const [selectedPOType, setSelectedPOType] = useState(null);
  const [selectedSupplierName, setSelectedSupplierName] = useState(null);
  const [selectedShipTo, setSelectedShipTo] = useState(null);
  
  const [selectedBuyerName, setSelectedBuyerName] = useState(null);
  const [selectedTotalAmount, setSelectedTotalAmount] = useState("");
  const [selectedPOHeaderID, setSelectedPOHeaderID] = useState("");
  const [selectedVendorID, setSelectedVendorID] = useState("");
  const [selectedVendorSiteID, setSelectedVendorSiteID] = useState("");
  const [selectedVendorNumber, setSelectedVendorNumber] = useState("");
 
    
      // INPUT FIELD
      const handlePoNumberChange = (e) => setPoNumber(e.target.value);
  const handleTotalChange = (e) => setSelectedTotalAmount(e.target.value);
  const handlePoHeaderChange = (e) => setSelectedPOHeaderID(e.target.value);
  
  const handleVendorSiteChange = (e) => setSelectedVendorSiteID(e.target.value);
  const handleVendorNumber = (e) => setSelectedVendorNumber(e.target.value);

  const handleClear = () => {
    setSelectedPOStatus(null);
    setSelectedPOType(null);
    setSelectedSupplierName(null);
    setSelectedShipTo(null);
   
    setSelectedBuyerName(null);
    setSelectedVendorNumber("");
    setSelectedVendorSiteID("");
    setSelectedVendorID("");
    setSelectedPOHeaderID("");
    setPoNumber("");
    setSelectedTotalAmount("");
  };


      // DROP DOWN 
  const handlePOStatusChange = (option) => setSelectedPOStatus(option);
  const handlePOTypeChange = (option) => setSelectedPOType(option);
  const handleSupplierNameChange = (option) => setSelectedSupplierName(option);
  const handleShipToChange = (option) => setSelectedShipTo(option);
  
  const handleBuyerNameChange = (option) => setSelectedBuyerName(option);

 
  // const handleStatusChange = (option) =>setSelectedPOStatus(option);
  
  console.log("SELECTED",selectedShipTo)

  
 
  const isInvoiceUploadRefreshed = useSelector(
    (state) => state.refresh.InvoiceUploadRefresh,
  );

  


 
  
 
  const[data,setData]=useState([]);
  // Fetch data from the API when the component mounts
  const fetchData = async (showMessage = false) => {
    if (showMessage) {
      message.success("Refreshing...");
    }
    try {
      // const response = await axios.get(
      //   "https://invoicezapi.focusrtech.com:57/user/one-invoice-list",
      // );

      const token = localStorage.getItem("access_token");
      const response = await axios.get("https://invoicezapi.focusrtech.com:57/user/allOpenPos/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const fetchedItems = response.data || []; // Assuming data is in response.data
      console.log("fetchedItemsOPen", fetchedItems);
      setData(fetchedItems);
    //   set_Po_id(fetchedItems[0]["po_headers"][0]["id"]);
      //  console.log("InvId",InvoiceNumber);
      // Map fetched data to the format expected by DataGrid

      
      // const po_lineitems = fetchedItems.flatMap((po) =>
      //   po.po_items.map((item) => ({
      //     item_name: item.item_description,
      //   }))
      // );
    
    

      // console.log("PO_LINE",po_lineitems);
      const mappedItems = fetchedItems.map((item) => ({
        // Id: item.po_headers[0].id,
        InvoiceId: item.id,
        InvoiceNumber: item.InvoiceId,
        po_number: item.po_number,
        po_type: item.po_type,
        po_status: item.po_status,
        supplier_name: item.supplier_name,
        location: item.location,
        total_amount:item.total_amount,
        Buyer:item.buyer_name,
        need_by:item.need_by_date,
        vendor:item.vendor_site_id,
        poheader:item.po_header_id,
        totamount:item.total_amount,
        vendor_num:item.vendor_number,
      
      }));

      const getUniqueOptions = (array, key) => {
        return Array.from(new Set(array.map((item) => item[key]))).map((value) => ({
            value,
            label: value,
        }));
    };

      setPOStatusOptions(getUniqueOptions(fetchedItems, "po_status") || []);
      setSelectedPOTypeOptions(getUniqueOptions(fetchedItems, "po_type") || []);
      setSelectedSupplierNameOptions(getUniqueOptions(fetchedItems, "supplier_name") || []);
      setSelectedShipToOptions(getUniqueOptions(fetchedItems, "location") || []);
     
      setSelectedBuyerNameOptions(getUniqueOptions(fetchedItems, "buyer_name") || []);
      setItems(mappedItems || []);
      
      
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  

  useEffect(() => {
    console.log("Refreshed!!!");
    fetchData();
  }, [isInvoiceUploadRefreshed]);

  // const handleSearchChange = (value) => {
  //   setSearchQuery(value);
  // };
  // // console.log("--------->",filteredItems)
  // const filteredItems = items.filter((item) => {
  //   const searchLower = searchQuery?.trim().toLowerCase() || "";

  //   return (
  //     item.InvoiceId?.toString().toLowerCase().includes(searchLower) ||
  //     item.InvoiceNumber?.toString().toLowerCase().includes(searchLower) ||
  //     item.po_number?.toString().toLowerCase().includes(searchLower) ||
  //     item.po_type?.toLowerCase().includes(searchLower) ||
  //     item.po_status?.toLowerCase().includes(searchLower) ||
  //     item.supplier_name?.toLowerCase().includes(searchLower) ||
  //     item.location?.toLowerCase().includes(searchLower) ||
  //     item.ship_to?.toLowerCase().includes(searchLower) ||
  //     item.bill_to?.toLowerCase().includes(searchLower) ||
  //     item.buyer_name?.toLowerCase().includes(searchLower) ||
  //     item.total_amount?.toString().toLowerCase().includes(searchLower) ||
  //     item.status?.toLowerCase().includes(searchLower)
  //   );
  // }).sort((a, b) => a.po_number.localeCompare(b.po_number));




  const handleSearchChange = (value) => {
    setSearchQuery(value);
  
    const filteredItems = items.filter((item) => {
        const searchLower = searchQuery?.trim().toLowerCase() || "";
    
        return (
          item.InvoiceId?.toString().toLowerCase().includes(searchLower) ||
          item.InvoiceNumber?.toString().toLowerCase().includes(searchLower) ||
          item.po_number?.toString().toLowerCase().includes(searchLower) ||
          item.po_type?.toLowerCase().includes(searchLower) ||
          item.po_status?.toLowerCase().includes(searchLower) ||
          item.supplier_name?.toLowerCase().includes(searchLower) ||
          item.location?.toLowerCase().includes(searchLower) ||
          item.total_amount?.toLowerCase().includes(searchLower) ||
          item.Buyer?.toLowerCase().includes(searchLower) ||
          item.need_by?.toLowerCase().includes(searchLower) ||
          item.vendor?.toLowerCase().includes(searchLower) ||
          item.poheader?.toLowerCase().includes(searchLower) ||
          item.totamount?.toLowerCase().includes(searchLower) ||
          item.vendor_num?.toLowerCase().includes(searchLower) 
        
        );
      });
  
    setFilteredItems(filteredItems); 
  };


  const filteredItems = items.filter((item) => {
    const searchLower = searchQuery?.trim().toLowerCase() || "";

    return (
      item.InvoiceId?.toString().toLowerCase().includes(searchLower) ||
      item.InvoiceNumber?.toString().toLowerCase().includes(searchLower) ||
      item.po_number?.toString().toLowerCase().includes(searchLower) ||
      item.po_type?.toLowerCase().includes(searchLower) ||
      item.po_status?.toLowerCase().includes(searchLower) ||
      item.supplier_name?.toLowerCase().includes(searchLower) ||
      item.location?.toLowerCase().includes(searchLower) ||
      item.total_amount?.toLowerCase().includes(searchLower) ||
      item.Buyer?.toLowerCase().includes(searchLower) ||
      item.need_by?.toLowerCase().includes(searchLower) ||
      item.vendor?.toLowerCase().includes(searchLower) ||
      item.poheader?.toLowerCase().includes(searchLower) ||
      item.totamount?.toLowerCase().includes(searchLower) ||
      item.vendor_num?.toLowerCase().includes(searchLower) 

   
    );
  });
  
  

  const handleRowClick = (e, item) => {
    if (e.target.type !== "checkbox") {
      
      const selectedPO = data.find((po) => po.po_number === item.po_number);
  
      const selectedPOItems = selectedPO?.po_items || [];
  
      navigate(`/openpodet`, {
        state: {
          poNumber: item.po_number,
          Id: item.Id,
          po_type: item.po_type,
          locations: item.location,
          totals: item.total_amount,
          Status: item.po_status,
          item_name: item.item_description,
          po_items: selectedPOItems, 
          Supplier:item.supplier_name,
          Buyer:item.Buyer,
          // need_by:item.need_by
        },
        
      });
      
      console.log("Selected PO Items", selectedPOItems);
    }
  };
  

  const handleSelectionChange = (event, data) => {
    console.log("handleSelectionChange", data.selectedItems);
    setSelectedRows(data.selectedItems);
  };

  

  

  
  
  const [filtered, setFilteredItems] = useState([]);
  useEffect(() => {
    setFilteredItems(items); 
  }, [items])

  const [sortState, setSortState] = useState({
    columnId: "",
    sortDirection: "ascending",
  });
  
  const handleSort = (columnId) => {
    let newSortDirection = "ascending";
  
    
    if (sortState.columnId === columnId) {
      newSortDirection =
        sortState.sortDirection === "ascending" ? "descending" : "ascending";
    }
  
    setSortState({ columnId, sortDirection: newSortDirection });
  
    
    const sortedItems = [...filteredItems].sort((a, b) => {
      const aValue = a[columnId];
      const bValue = b[columnId];
  
      
      const aNumeric = !isNaN(parseFloat(aValue)) ? parseFloat(aValue) : null;
      const bNumeric = !isNaN(parseFloat(bValue)) ? parseFloat(bValue) : null;
  
      if (aNumeric !== null && bNumeric !== null) {
       
        return newSortDirection === "ascending"
          ? aNumeric - bNumeric
          : bNumeric - aNumeric;
      }
  
      if (aNumeric !== null && bNumeric === null) {
        
        return newSortDirection === "ascending" ? -1 : 1;
      }
  
      if (aNumeric === null && bNumeric !== null) {
        
        return newSortDirection === "ascending" ? 1 : -1;
      }
  
      
      const aString = String(aValue || "").toLowerCase();
      const bString = String(bValue || "").toLowerCase();
  
      return newSortDirection === "ascending"
        ? aString.localeCompare(bString)
        : bString.localeCompare(aString);
    });
  
    console.log("SORTED", sortedItems);
  
    setFilteredItems(sortedItems);
  };
  


  const filterData = () => {
    const filteredData = items.filter((item) => {
      
      const matchesPONumber = poNumber ? item.po_number.toLowerCase().includes(poNumber.toLowerCase()) : true;
      const matchesPOStatus = selectedPOStatus ? item.po_status === selectedPOStatus.value : true;
      const matchesPOType = selectedPOType ? item.po_type === selectedPOType.value : true;
      const matchesSupplierName = selectedSupplierName ? item.supplier_name === selectedSupplierName.value : true;
      const matchesShipTo = selectedShipTo ? item.location === selectedShipTo.value : true;
      const matchesBuyerName = selectedBuyerName ? item.Buyer === selectedBuyerName.value : true;
      const matchesTotalAmount = selectedTotalAmount ? item.total_amount === parseFloat(selectedTotalAmount) : true;
      const matchesPOHeaderID = selectedPOHeaderID ? item.poheader === selectedPOHeaderID : true;
      const matchesVendorID = selectedVendorID ? item.vendor === selectedVendorID : true;
      const matchesVendorSiteID = selectedVendorSiteID ? item.vendor === selectedVendorSiteID : true;
      const matchesVendorNumber = selectedVendorNumber ? item.vendor_num === selectedVendorNumber : true;
     
      
      return matchesPONumber && 
             matchesPOStatus && 
             matchesPOType && 
             matchesSupplierName && 
             matchesShipTo && 
             matchesBuyerName && 
             matchesTotalAmount && 
             matchesPOHeaderID && 
             matchesVendorID && 
             matchesVendorSiteID &&
             matchesVendorNumber;

    });
  
    setFilteredItems(filteredData);
    console.log("Filtered Data:", filteredData);
  };
  
  
  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
          fontWeight: "bold",
          width:"100%"
          
        }}
      >
        


<div
 
    style={{
      backgroundColor: "#F8FAFC",
      // paddingBottom: "3px",
      paddingTop: "10px",
      width: "100%", 
      marginTop: "-8em", 
      height: "50vh", 
      marginLeft:"12em",
      paddingLeft:"1em",
      paddingRight:"1em"
     
    }}

    

 
>
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)", 
      gap: "2em",
      padding: "1em",
      marginTop: "4em", 
      width: "100%", 
      
    }}
  >
    <Input
        placeholder="PO Number"
        value={poNumber} 
        onChange={handlePoNumberChange} 
        style={{
          width: "200px", 
          boxSizing: "border-box", 
        }}
      />
    <CreatableSelect
          className="basic-single"
          classNamePrefix="select"
          value={selectedPOStatus}
          onChange={handlePOStatusChange}
          name="po_status"
          options={POStatusOptions}
          styles={{
            container: (provided) => ({ ...provided, width: 200 }),
            marginTop: "20px",
          }}
          onCreateOption={handlePOStatusChange}
          placeholder=" PO Status"
          isClearable
        />
    <CreatableSelect
          className="basic-single"
          classNamePrefix="select"
          value={selectedPOType}
          onChange={handlePOTypeChange}
          name="po_type"
          options={SelectedPOTypeOptions}
          styles={{
            container: (provided) => ({ ...provided, width: 200 }),
            marginTop: "20px",
          }}
          onCreateOption={handlePOTypeChange}
          placeholder="PO Type"
          isClearable
        />
     
        <CreatableSelect
          className="basic-single"
          classNamePrefix="select"
          value={selectedSupplierName}
          onChange={handleSupplierNameChange}
          name="supplier_name"
          options={selectedSupplierOptions}
          styles={{
            container: (provided) => ({ ...provided, width: 200 }),
            marginTop: "20px",
          }}
          onCreateOption={handleSupplierNameChange}
          placeholder=" Supplier Name"
          isClearable
        />
      

      
       
        <CreatableSelect
          className="basic-single"
          classNamePrefix="select"
          value={selectedShipTo}
          onChange={handleShipToChange}
          name="ship_to"
          options={selectedShipToOptions}
          styles={{
            container: (provided) => ({ ...provided, width: 200 }),
            marginTop: "20px",
          }}
          onCreateOption={handleShipToChange}
          placeholder="Location"
          isClearable
        />
      
      
        {/* <CreatableSelect
          className="basic-single"
          classNamePrefix="select"
          value={selectedBillTo}
          onChange={handleBillToChange}
          name="bill_to"
          options={selectedBillToOptions}
          styles={{
            container: (provided) => ({ ...provided, width: 200 }),
            marginTop: "20px",
          }}
          onCreateOption={handleBillToChange}
          placeholder="Bill To"
          isClearable
        /> */}
      
      <CreatableSelect
          className="basic-single"
          classNamePrefix="select"
          value={selectedBuyerName}
          onChange={handleBuyerNameChange}
          name="buyer_name"
          options={selectedBuyerNameOptions}
          styles={{
            container: (provided) => ({ ...provided, width: 200 }),
            marginTop: "20px",
          }}
          onCreateOption={handleBuyerNameChange}
          placeholder="Buyer Name"
          isClearable
        />
    <Input
        placeholder="Total Amount"
        value={selectedTotalAmount} 
        onChange={handleTotalChange} 
        style={{
          width: "200px", 
          boxSizing: "border-box", 
        }}
      />
   {/* <CreatableSelect
          className="basic-single"
          classNamePrefix="select"
          value={selectedStatus}
          onChange={handleStatusChange}
          name="status"
          options={StatusOptions}
          onCreateOption={handleCreateStatus}
          placeholder="Status"
          isClearable
        /> */}
    <Input
        placeholder="PO Header ID"
        value={selectedPOHeaderID} 
        onChange={handlePoHeaderChange} 
        style={{
          width: "200px", 
          boxSizing: "border-box", 
        }}
      />
    
    <Input
        placeholder="Vendor Site ID"
        value={selectedVendorSiteID} 
        onChange={handleVendorSiteChange} 
        style={{
          width: "200px", 
          boxSizing: "border-box", 
        }}
      />
    <Input
        placeholder="Vendor Number"
        value={selectedVendorNumber} 
        onChange={handleVendorNumber} 
        style={{
          width: "200px", 
          boxSizing: "border-box", 
        }}
      />
  </div>
  <div
    style={{
      display: "flex",
      justifyContent: "flex-end",
      gap: "20px",
      margin: "20px 0",
    }}
  >
    <Button
      style={{
        backgroundColor: "#3570c3",
        color: "white",
        cursor: "pointer",
        height: "35px",
        width: "100px", // Consistent button width
      }}
      onClick={filterData}
    >
      Find
    </Button>
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "4px", 
        backgroundColor: Hovered2 ? "#e1e1e2" : "transparent",
        padding: "6px 12px", 
        borderRadius: "4px", 
        cursor: "pointer",
        marginRight:"20px"
      }}
      onMouseEnter={() => setIsHovered2(true)}
      onMouseLeave={() => setIsHovered2(false)}
    //   onClick={handleDeleteSelectedRows}
    onClick={handleClear}
    >
      <DismissRegular
        style={{
          color: "#1281d7", 
          fontSize: "20px",
          marginRight:"5px"
        }}
      />
      <span
        style={{
          fontSize: "14px",
          color: "#000",
          
        }}
      >
        Clear
      </span>
    </div>
  </div>
</div>
        
        
<div
  style={{
    marginTop: "30em", 
    width: "300px", 
    maxWidth: "100%", 
    minWidth: "200px",  
    display: "flex", 
    justifyContent: "center", 
    marginLeft: "auto", 
    marginRight: "auto", 
    
   
  }}
>
  <Search
    placeholder="Search PO"
    onSearchChange={handleSearchChange}
  />
</div>
       
      </div>
      <div
        style={{
          height: "60vh",
          overflow: "scroll",
          marginTop: "40px",
          overflowx: "auto"
        }}
      >
       <DataGrid
      
      items={filtered}
      key={items.length}
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
          {({ renderHeaderCell, columnId }) => (
            <DataGridHeaderCell
              onClick={() => handleSort(columnId)}
              style={{ cursor: "pointer", display: "flex", alignItems: "center" }}
            >
              {renderHeaderCell()}
              {sortState.columnId === columnId &&
                (sortState.sortDirection === "ascending" ? (
                  <ArrowSortUpFilled style={{ marginLeft: "5px" }} />
                ) : (
                  <ArrowSortDownRegular style={{ marginLeft: "5px" }} />
                ))}
            </DataGridHeaderCell>
          )}
        </DataGridRow>
      </DataGridHeader>
      <DataGridBody>
        {({ item, rowId }) => (
          <DataGridRow
            key={rowId}
            onClick={(e) => handleRowClick(e, item)}
            selected={selectedRows.has(rowId)}
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
    </>
  );
};

export default OpenPoTable;