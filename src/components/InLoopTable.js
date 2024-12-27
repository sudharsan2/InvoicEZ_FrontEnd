import {  React,useState } from "react";

import { useNavigate , } from "react-router-dom";
import {
  makeStyles,
  TabList,
  Tab,
  DataGrid,
  DataGridBody,
  DataGridRow,
  DataGridHeader,
  DataGridHeaderCell,
  DataGridCell,
  TableCellLayout,
  createTableColumn,
  
} from "@fluentui/react-components";


import axios from "axios";



import { ArrowClockwise28Regular } from "@fluentui/react-icons";
import Search from "./Search";
const path = "/approve";
const path2 = "/approvepage";
const path1 = "http://localhost:3000/";

const useStyles = makeStyles({
  root: {
    // width: "77vw",
    // height: "88vh",
    // overflowY: "auto",
    // display: "flex",
    // flexDirection: "column",
  },

  header: {
    padding: "20px",
  },

  content1: {
    overflowY: "auto",
    paddingTop: "3vh",
    padding: "0 20px",
    maxHeight: "35vh",
  },

  content2: {
    width: "77vw",
    overflowY: "auto",
    // paddingTop: "3vh",
    padding: "0 20px",

    // maxHeight: "48vh",
  },
  controls: {
    display: "flex",
    gap: "20px",
    marginBottom: "20px",
  },
  container: {
    display: "grid",
    gap: "15px",
    fontFamily: "Arial, sans-serif",
  },
  section: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    marginLeft: "0vw",
  },
  section2: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    marginLeft: "7vw",
  },
  gridTemplate1: {
    gridTemplateColumns: "1fr 1fr",
    gridTemplateAreas: `
      "nameAndId managerInfo"
      "name empid"
      "email doj"
      "status dos"
      "role appraisal"
      "dept totalExperience"
      "editDetails focusRExperience"
    `,
  },
  heading: {
    fontWeight: "bold",
  },
  content: {
    fontSize: "13px",
    marginLeft: "10px",
  },
});

const columns = [
  createTableColumn({
    columnId: "Requester Name",
    renderHeaderCell: () => "Requester Name",
    renderCell: (item) => <TableCellLayout>{item.po_number}</TableCellLayout>,
  }),
  createTableColumn({
    columnId: "PR Number",
    renderHeaderCell: () => "PR Number",
    renderCell: (item) => <TableCellLayout>{item.po_type}</TableCellLayout>,
  }),
  createTableColumn({
    columnId: "Description",
    renderHeaderCell: () => "Description",
    renderCell: (item) => <TableCellLayout>{item.po_status}</TableCellLayout>,
  }),
  createTableColumn({
    columnId: "Status",
    renderHeaderCell: () => "Status",
    renderCell: (item) => (
      <TableCellLayout>{item.supplier_name}</TableCellLayout>
    ),
  }),
  createTableColumn({
    columnId: "Need By Date",
    renderHeaderCell: () => "Need By Date",
    renderCell: (item) => <TableCellLayout>{item.location}</TableCellLayout>,
  }),
  createTableColumn({
    columnId: "Suppliers Replied",
    renderHeaderCell: () => "Suppliers Replied",
    renderCell: (item) => <TableCellLayout>{item.ship_to}</TableCellLayout>,
  }),
];

const InLoopTable = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [items, setItems] = useState([]);
  const styles = useStyles();
  const [selectedtab, setSelectedTab] = React.useState("tab1");
  const [selectedRows, setSelectedRows] = useState(new Set());
  const handleSearchChange = (value) => {
    setSearchQuery(value);
  };

  const themestate = false;
  const handleTabSelect2 = (event, data) => {
    // console.log({"currentmonth":currentMonthEmployees})
    setSelectedTab(data.value);
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
      item.ship_to?.toLowerCase().includes(searchLower) ||
      item.bill_to?.toLowerCase().includes(searchLower) ||
      item.buyer_name?.toLowerCase().includes(searchLower) ||
      item.total_amount?.toString().toLowerCase().includes(searchLower) ||
      item.status?.toLowerCase().includes(searchLower)
    );
  });

  const handleRowClick = (e, item) => {
    if (e.target.type !== "checkbox") {
      navigate(`/tododrawer`, {
        state: { poNumber: item.po_number, Id: item.Id },
      });
      console.log("ItemId", item.Id);
    }
  };

  const handleSelectionChange = (event, data) => {
    console.log("handleSelectionChange", data.selectedItems);
    setSelectedRows(data.selectedItems);
  };

  //   API FOR ONE INVOICE LIST
  const fetchData = async () => {
    console.log("fetchdata");
    try {
      const response = await axios.post("http:172.235.21.99:57/user/club-pr", {
        org_id: 821,
        from_date: "11/09/24",
        to_date: "11/09/24",
      });
      const fetchedItems2 = response.data;
      console.log(fetchedItems2);
      const fetchedItems = data.flatMap((item) =>
        item.lines.map((line) => ({
          ...item, 
          lines: [line], 
        })),
      );

      console.log("FETCHED", fetchedItems);

      set_Po_id(fetchedItems[0]["po_headers"][0]["id"]);
      const mappedItems = fetchedItems.map((item) => ({
        Id: item.po_headers[0].id,
        InvoiceId: item.id,
        InvoiceNumber: item.InvoiceId,
        po_number: item.po_headers[0].po_number,
        po_type: item.po_headers[0].po_type,
        po_status: item.po_headers[0].po_status,
        supplier_name: item.po_headers[0].supplier_name,
        location: item.po_headers[0].location,
        ship_to: item.po_headers[0].ship_to,
        bill_to: item.po_headers[0].bill_to,
        buyer_name: item.po_headers[0].buyer_name,
        total_amount: item.po_headers[0].total_amount,
        status: item.po_headers[0].status,
      }));

      setItems(mappedItems);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  

  return (
    <div style={{ height: "88vh", overflowY: "auto" }}>
      <div>
        <div className="Approvebreadcrump"></div>
        <div style={{ maxHeight: "20vh" }}>
          <div className={styles.root}>
            <TabList
              defaultSelectedValue="tab1"
              appearance="subtle"
              onTabSelect={handleTabSelect2}
              style={{
                marginLeft: "0vw",
                marginTop: "2vh",
                paddingBottom: "1vh",
                borderBottom: "1px solid rgb(200,200,200)",
              }}
            >
              <Tab
                value="tab1"
                className={themestate ? "tab dark drawer" : "tab"}
                style={{ border: "1px solid transparent", marginTop: "4em" }}
              >
                PR
              </Tab>

              <button
                style={{
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "transparent",
                  border: "1px solid #fff",
                  padding: "6px 12px",
                  cursor: "pointer",
                  gap: "8px",
                  marginTop: "4em",
                  marginLeft: "2em",
                }}
                onClick={fetchData}
              >
                <ArrowClockwise28Regular style={{ color: "#1281d7" }} />
                <span>Refresh</span>
              </button>

              <Search
                placeholder="Search PO or Supplier"
                onSearchChange={handleSearchChange}
              />
            </TabList>
          </div>

          {selectedtab === "tab1" && (
            <div
              style={{
                width: "100%",
                display: "flex",
                overflowY: "auto",
                height: "40vh",
                marginTop: "10px",
              }}
            >
              <div style={{ flex: 1 }}>
                <div>
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
                          <DataGridHeaderCell>
                            {renderHeaderCell()}
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
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InLoopTable;
