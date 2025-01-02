// API connection
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  DismissRegular, ArrowSortUpFilled, ArrowSortDownRegular
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
  createTableColumn,makeStyles, Input,
} from "@fluentui/react-components";

import Search from "./Search"; 
import { Button,message} from "antd"; 

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


const StoreOpenPoTable = () => {
  
  const [Hovered2,setIsHovered2] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [items, setItems] = useState([]); // State to hold API data
  const [selectedRows, setSelectedRows] = useState(new Set());
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
  const[data,setData]=useState([]);
  
  const navigate = useNavigate();
  



 

  
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

 
  
  console.log("SELECTED",selectedShipTo)

 
  

// Styles
let backgroundColor = "transparent";
if (Hovered2) {
  backgroundColor = "#e1e1e2";
}
 
  
 
  
 
  const fetchData = async (showMessage = false) => {
    if (showMessage) {
      message.success("Refreshing...");
    }
    try {
     
      const token = localStorage.getItem("access_token");
      const response = await axios.get("https://invoicezapi.focusrtech.com:57/user/allOpenPos/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const fetchedItems = response.data || []; 
      console.log("fetchedItemsOPen", fetchedItems);
      setData(fetchedItems);
   
      
     
    
    

     
      const mappedItems = fetchedItems.map((item) => ({
        
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
  
      navigate(`/storeopenpodet`, {
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
    const getNewSortDirection = (currentState, column) => {
      if (currentState.columnId !== column) {
        return "ascending";
      }
  
      if (currentState.sortDirection === "ascending") {
        return "descending";
      } else {
        return "ascending";
      }
    };
  
    const compareValues = (aValue, bValue, direction) => {
      const isNumeric = (val) => !isNaN(parseFloat(val));
      const aNumeric = isNumeric(aValue) ? parseFloat(aValue) : null;
      const bNumeric = isNumeric(bValue) ? parseFloat(bValue) : null;
  
      if (aNumeric !== null || bNumeric !== null) {
        if (direction === "ascending") {
          return (aNumeric || 0) - (bNumeric || 0);
        } else {
          return (bNumeric || 0) - (aNumeric || 0);
        }
      }
  
      const aString = String(aValue || "").toLowerCase();
      const bString = String(bValue || "").toLowerCase();
  
      if (direction === "ascending") {
        return aString.localeCompare(bString);
      } else {
        return bString.localeCompare(aString);
      }
    };
  
    // Calculate the new sort direction
    const newSortDirection = getNewSortDirection(sortState, columnId);
  
    // Update the sort state
    setSortState({ columnId, sortDirection: newSortDirection });
  
    // Sort items based on the new direction
    const sortedItems = filteredItems.slice().sort((a, b) => 
      compareValues(a[columnId], b[columnId], newSortDirection)
    );
  
    // Update the filtered items
    setFilteredItems(sortedItems);
  };


  const filterData = () => {
    const filterCriteria = [
      { key: "po_number", value: poNumber, comparator: (item, value) => item.po_number.toLowerCase().includes(value.toLowerCase()) },
      { key: "po_status", value: selectedPOStatus?.value, comparator: (item, value) => item.po_status === value },
      { key: "po_type", value: selectedPOType?.value, comparator: (item, value) => item.po_type === value },
      { key: "supplier_name", value: selectedSupplierName?.value, comparator: (item, value) => item.supplier_name === value },
      { key: "location", value: selectedShipTo?.value, comparator: (item, value) => item.location === value },
      { key: "Buyer", value: selectedBuyerName?.value, comparator: (item, value) => item.Buyer === value },
      { key: "total_amount", value: selectedTotalAmount, comparator: (item, value) => item.total_amount === parseFloat(value) },
      { key: "poheader", value: selectedPOHeaderID, comparator: (item, value) => item.poheader === value },
      { key: "vendor", value: selectedVendorID, comparator: (item, value) => item.vendor === value },
      { key: "vendor_site", value: selectedVendorSiteID, comparator: (item, value) => item.vendor === value },
      { key: "vendor_num", value: selectedVendorNumber, comparator: (item, value) => item.vendor_num === value },
    ];
  
    const filteredData = items.filter(item =>
      filterCriteria.every(({ value, comparator }) => (value ? comparator(item, value) : true))
    );
  
    setFilteredItems(filteredData);
    console.log("Filtered Data:", filteredData);
  };


  // Table Header
  const getSortIcon = (columnId) => {
    if (sortState.columnId !== columnId) {
      return null;
    }
  
    const style = { marginLeft: "5px" };
  
    if (sortState.sortDirection === "ascending") {
      return <ArrowSortUpFilled style={style} />;
    }
  
    return <ArrowSortDownRegular style={style} />;
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
        backgroundColor,
        padding: "6px 12px", 
        borderRadius: "4px", 
        cursor: "pointer",
        marginRight:"20px"
      }}
      onMouseEnter={() => setIsHovered2(true)}
      onMouseLeave={() => setIsHovered2(false)}
    
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
              {getSortIcon(columnId)}
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

export default StoreOpenPoTable;