import React ,{useState} from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbDivider,
  BreadcrumbButton, Button,Divider,Label ,
  
  DataGrid,
  DataGridBody,
  DataGridCell,
  DataGridHeader,
  DataGridHeaderCell,
  DataGridRow,
  TableCellLayout,
  createTableColumn,
} from "@fluentui/react-components";



import DatePickerComponent from "../components/DatePicker";




import DropDown from "../components/DropDown";

import {
    
    EditRegular,
    DocumentRegular,
    
    ArrowLeft24Regular,
    ArrowClockwise24Regular
  } from "@fluentui/react-icons";
  import { useNavigate } from "react-router-dom";
  import ASNDrawer from "../components/ASNDrawer";

  import { GrSubtractCircle } from "react-icons/gr";





  
  const path = "/asncreate";
  const path1 = "http://localhost:3000/";

  const items = [
    {
      file: { label: "Meeting notes", icon: <DocumentRegular /> },
      author: { label: "Max Mustermann", status: "available" },
      lastUpdated: { label: "7h ago", timestamp: 1 },
      lastUpdate: { label: "You edited this", icon: <EditRegular /> },
      shipmentQuantity: 5,
      remove: { label: "Meeting notes", icon: <GrSubtractCircle style={{color:"#0078d4"}} /> }
    },
    
  ];
  
const PreviewPage = () => {
    const [data] = React.useState(items);
    

  const columns = [
    createTableColumn({
      columnId: "file",
      compare: (a, b) => a.file.label.localeCompare(b.file.label),
      renderHeaderCell: () => "PO Number",
      renderCell: (item) => (
        <TableCellLayout truncate >
         
        </TableCellLayout>
      ),
    }),
    createTableColumn({
      columnId: "author",
      compare: (a, b) => a.author.label.localeCompare(b.author.label),
      renderHeaderCell: () => "Line Shipment",
      renderCell: (item) => (
        <TableCellLayout
          truncate
          
        >
          
        </TableCellLayout>
      ),
    }),
    createTableColumn({
      columnId: "lastUpdated",
      compare: (a, b) => a.lastUpdated.timestamp - b.lastUpdated.timestamp,
      renderHeaderCell: () => "Item Code",
      renderCell: (item) => (
        <TableCellLayout truncate></TableCellLayout>
      ),
    }),
    createTableColumn({
      columnId: "lastUpdate",
      compare: (a, b) => a.lastUpdate.label.localeCompare(b.lastUpdate.label),
      renderHeaderCell: () => "Description",
      renderCell: (item) => (
        <TableCellLayout truncate >
          
        </TableCellLayout>
      ),
    }),
    createTableColumn({
      columnId: "lastUpdate",
      compare: (a, b) => a.lastUpdate.label.localeCompare(b.lastUpdate.label),
      renderHeaderCell: () => "Ordered QTY",
      renderCell: (item) => (
        <TableCellLayout truncate >
          
        </TableCellLayout>
      ),
    }),
    createTableColumn({
      columnId: "lastUpdate",
      compare: (a, b) => a.lastUpdate.label.localeCompare(b.lastUpdate.label),
      renderHeaderCell: () => "Shipping QTY/Amount",
      renderCell: (item) => (
        <TableCellLayout truncate >
          
        </TableCellLayout>
      ),
    }),
    createTableColumn({
      columnId: "lastUpdate",
      compare: (a, b) => a.lastUpdate.label.localeCompare(b.lastUpdate.label),
      renderHeaderCell: () => "UOM",
      renderCell: (item) => (
        <TableCellLayout truncate>
        
        </TableCellLayout>
      ),
    }),
    createTableColumn({
      columnId: "lastUpdate",
      compare: (a, b) => a.lastUpdate.label.localeCompare(b.lastUpdate.label),
      renderHeaderCell: () => "Taxable",
      renderCell: (item) => (
        <TableCellLayout truncate >
          
        </TableCellLayout>
      ),
    }),
    createTableColumn({
      columnId: "lastUpdate",
      compare: (a, b) => a.lastUpdate.label.localeCompare(b.lastUpdate.label),
      renderHeaderCell: () => "Remove",
      renderCell: (item) => (
        <TableCellLayout truncate  media={item.remove.icon}>
          
        </TableCellLayout>
      ),
    }),

    
  ];
  const [isDrawerOpen,setIsDrawerOpen]=useState(false);
  const navigate = useNavigate();
  
  const handleASN = () => {
    setIsDrawerOpen(true);
    console.log("Status",isDrawerOpen)
  };
  return (
    <div style={{ height: "99vh", overflowY: "auto" }}>

         <div style={{display:"flex",justifyContent:"space-between"}}>
          <div>
          <Breadcrumb aria-label="Breadcrumb default example">
            <BreadcrumbItem>
              <BreadcrumbButton href={path1}>Home</BreadcrumbButton>
            </BreadcrumbItem>
            <BreadcrumbDivider />
            <BreadcrumbItem>
              <BreadcrumbButton href={path}>ASN Creation</BreadcrumbButton>
            </BreadcrumbItem>
            <BreadcrumbDivider />
          </Breadcrumb>
          </div>
          <div style={{display:"flex",gap:"20px"}}>
         
          <ArrowLeft24Regular style={{cursor:"pointer",}} onClick={()=>{navigate('/asncreate')}}/>
          <div style={{display:"flex",justifyContent:"center",gap:"10px"}}>
            
          <ArrowClockwise24Regular style={{color:"#0078d4"}} />
          <Label>Refresh</Label>
            </div>
         
          </div>
          </div>
        
        <div style={{ display: "flex", flexWrap: "wrap", width: "50%", gap: "2em" ,marginLeft:"2em",marginTop:"4em"}}>
       
    <div style={{display:"flex",flexDirection:"column",width:"30%" }}>
    <span style={{ marginBottom: "10px" }}>Enter Invoice Number</span>
    <DropDown />
    </div>

    <div style={{display:"flex",flexDirection:"column",width:"30%" }}>
   <span style={{ marginBottom: "10px" }}>Invoice Date</span>
   <DatePickerComponent />
  </div>
  
  

  
  
</div>

    <div style={{display:"flex",flexDirection:"row",justifyContent:"flex-end",marginRight:"2em",marginTop:"-2em",marginBottom:"2em"}}>
  <Button style={{color:"white",backgroundColor:"#0078d4",cursor:"pointer"}} onClick={handleASN}>Generate ASN</Button>
    </div>

    <Divider/>

     <div style={{ overflowX: "auto",width:"100%"}}>
     <DataGrid
        items={data}
        columns={columns}
        sortable
        getRowId={(item) => item.file.label}
        selectionMode="multiselect"
        resizableColumns
      >
        <DataGridHeader>
          <DataGridRow selectionCell={{ checkboxIndicator: { "aria-label": "Select all rows" } }}>
            {({ renderHeaderCell }) => (
              <DataGridHeaderCell>{renderHeaderCell()}</DataGridHeaderCell>
            )}
          </DataGridRow>
        </DataGridHeader>
        <DataGridBody>
          {({ item, rowId }) => (
            <DataGridRow key={rowId} selectionCell={{ checkboxIndicator: { "aria-label": "Select row" } }}>
              {({ renderCell }, rowIndex) => (
                <DataGridCell>{renderCell(item, rowIndex)}</DataGridCell>
              )}
            </DataGridRow>
          )}
        </DataGridBody>
      </DataGrid>
     </div>
     <ASNDrawer isOpen={isDrawerOpen} setIsOpen={setIsDrawerOpen} />
    </div>
  );
};

export default PreviewPage;
