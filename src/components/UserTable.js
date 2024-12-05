// API connection
import React, { useEffect, useState ,useRef} from "react";
import axios from "axios";
import {
  ArrowClockwise28Regular,
  Delete28Regular,
  TasksApp28Regular,
  PeopleTeamDelete28Regular,
  PeopleAdd28Regular,
  Edit24Filled,
  Key24Regular,
} from "@fluentui/react-icons";
import { UserAddOutlined, UserDeleteOutlined } from "@ant-design/icons";
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
import Search from "../components/Search";// Assuming your search component is imported here
import { Button, notification } from "antd"; // Import Ant Design components
import { useDispatch, useSelector } from "react-redux";
import { refreshActions } from "../Store/Store";
import { message } from "antd";
import { Modal, TextField, PrimaryButton, DefaultButton } from "@fluentui/react";


const path = "/UserManagement";


// Define columns for the DataGrid

const UserTable = () => {
  const navigate = useNavigate();
  const columns = [
    createTableColumn({
      columnId: "Id",
      renderHeaderCell: () => "ID",
      renderCell: (item) => <TableCellLayout>{item.Id}</TableCellLayout>,
    }),
    createTableColumn({
      columnId: "username",
      renderHeaderCell: () => "Username",
      renderCell: (item) => <TableCellLayout>{item.username}</TableCellLayout>,
    }),
    createTableColumn({
      columnId: "role",
      renderHeaderCell: () => "Role",
      renderCell: (item) => <TableCellLayout>{item.role}</TableCellLayout>,
    }),
    createTableColumn({
      columnId: "email",
      renderHeaderCell: () => "Email",
      renderCell: (item) => (
        <TableCellLayout>{item.email}</TableCellLayout>
      ),
    }),
    createTableColumn({
      columnId: "empId",
      renderHeaderCell: () => "Emp Id",
      renderCell: (item) => <TableCellLayout>{item.empId}</TableCellLayout>,
    }),
    createTableColumn({
      columnId: "Edit",
      renderHeaderCell: () => "Edit User",
      renderCell: (item) => (
        <TableCellLayout>
          {item.Id !== null && ( // Show the button only if Id is not null
            <button
              onClick={() => {
                handleEdit(item);
                setPopupVisible(true);
              }}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
              aria-label="Edit"
            >
              <Edit24Filled />
            </button>
          )}
        </TableCellLayout>
      ),
    }),
    

    createTableColumn({
      columnId: "reset",
      renderHeaderCell: () => "Reset Password",
      renderCell: (item) => (
        <TableCellLayout>
          {item.Id !== null && ( // Show the button only if Id is not null
            <button
              onClick={() => handleResetPassword(item)} // Open the reset password popup
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
              aria-label="Reset Password"
            >
              <Key24Regular />
            </button>
          )}
        </TableCellLayout>
      ),
    }),
   
  ];

  
  const [searchQuery, setSearchQuery] = useState("");
  const [items, setItems] = useState([]); // State to hold API data
  const [selectedRows, setSelectedRows] = useState(new Set());
  const [po_id, set_Po_id] = useState("");
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [showResetPopup, setShowResetPopup] = useState(false);
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [selectedUser, setSelectedUser] = useState(null);
 

  const dispatch = useDispatch();
  const InvoiceUploadRefresh = useSelector((state) => state.refresh.InvoiceUploadRefresh);
  const isInvoiceUploadRefreshed = useSelector(
    (state) => state.refresh.InvoiceUploadRefresh,
  );

  const [RefreshUpload, SetRefreshUpload] = useState(null);

  const [DeleteRefresh, SetDeleteRefresh] = useState(false);

  const popupRef = useRef(null);

  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      setPopupVisible(false); // Close the popup
    }
  };
  useEffect(() => {
    if (isPopupVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isPopupVisible]);

  

  const handleResetPassword = (item) => {
    setSelectedUser(item); // Set the selected user
    setShowResetPopup(true); // Show the reset password popup
  };



  const handleResetSubmit = async (e) => {
    e.preventDefault();
  
    // Payload for the POST request
    const payload = {
      email: email,
      password: password,
    };
  
    try {
      // Replace with your actual API endpoint
      const response = await fetch("https://invoicezapi.focusrtech.com:57/user/usermanagement-reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
  
      if (response.ok) {
       
        notification.success({
          message: "Successfully Reset the password",
          // description: "You have successfully updated the user.",
        });
      } else {
        notification.error({
          message: "Error while reset the password",
          // description: "You have successfully updated the user.",
        });
        
      }
    } catch (error) {
      console.error("Error resetting password:", error);
      
    }
  
    
    setShowResetPopup(false);
  };

  // Fetch data from the API when the component mounts
  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://invoicezapi.focusrtech.com:57/user/user-list",
      );
      const fetchedItems = response.data; // Assuming data is in response.data
      console.log("fetchedItems", fetchedItems);
    //   set_Po_id(fetchedItems[0]["po_headers"][0]["id"]);
      //  console.log("InvId",InvoiceNumber);
      // Map fetched data to the format expected by DataGrid
      const mappedItems = fetchedItems.map((item) => {
        let role = "";
       

        if (item.role === 1) {
          role = "Invoice Manager";
        
        } else if (item.role === 2) {
          role = "Admin";
        
        } else if (item.role === 3) {
            role = "Supplier";
        
        }
        else if (item.role === 4) {
            role = "Store User";
        
        }
        
        
        // setTableLength(tablelength);
        // setFixCount(fixCount);
        // setMatchCount(MatchCount);
        // setMultiple_MatchCount(multiple_MatchCount);
  
        
        
        return {
            Id: item.id,
            username: item.username,
            role: item.role,
            email: item.email,
            empId: item.empId,
            role:role,
            // Edit: item.id !== null ? "Edit" : "",
            // reset: item.id !== null ? "reset" : "",
        };
      });
      setItems(mappedItems);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    SetRefreshUpload(isInvoiceUploadRefreshed);
  }, []);

  useEffect(() => {
    console.log("Refreshed!!!");
    fetchData();
  }, [isInvoiceUploadRefreshed]);

  const handleSearchChange = (value) => {
    setSearchQuery(value);
  };

  const filteredItems = items.filter((item) => {
    const searchLower = searchQuery?.trim().toLowerCase() || "";

    return (
      item.Id?.toString().toLowerCase().includes(searchLower) ||
      item.username?.toString().toLowerCase().includes(searchLower) ||
      item.role?.toString().toLowerCase().includes(searchLower) ||
      item.email?.toLowerCase().includes(searchLower) ||
      item.empId?.toLowerCase().includes(searchLower) 
      
    );
  });

  // const handleRowClick = (e, item) => {
  //   if (e.target.type !== "checkbox") {
  //     navigate(``, {
  //       state: { poNumber: item.po_number, Id: item.Id },
  //     });
  //     console.log("ItemId", item.Id);
  //   }
  // };

  const handleSelectionChange = (event, data) => {
    console.log("handleSelectionChange", data.selectedItems);
    setSelectedRows(data.selectedItems);
  };


  const handleEdit = (item) => {
    setSelectedRow(item); 
    setPopupVisible(true); 
  };
  
  const handleSave = async () => {
    try {
      
      const updatedData = {
        ...selectedRow, 
        
      };
  
      
      const response = await axios.put(
        `https://invoicezapi.focusrtech.com:57/user/edit-user/${selectedRow.Id}`,
        updatedData 
      );
  
      if (response.status === 200) {
        notification.success({
          message: "Successfully Updated",
          description: "You have successfully updated the user.",
        });
        setPopupVisible(false); 
        dispatch(refreshActions.toggleInvoiceUploadRefresh());
      } else {
        notification.error({
          message: "Failed to Update",
          description: "There was an issue updating the user data.",
        });
      }
    } catch (error) {
      notification.error({
        message: "Error while Updating",
        description: "An error occurred while trying to update the user data.",
      });
      console.error("Update Error: ", error);
    }
  };
  


  const [selectedRow, setSelectedRow] = useState(null);
  const handleChange = (e, field) => {
    setSelectedRow((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };


  //  delete API
  const handleDeleteSelectedRows = async () => {
    const selectedItemsArray = Array.from(selectedRows);
    if (selectedItemsArray.length === 0) {
      notification.warning({
        message: "No User Selected",
        description: "Please select at least one User to delete.",
      });
      return;
    }

    try {
      const supplierNames = selectedItemsArray
        .map((item) => item.supplier_name)
        .join(", ");

      const deletePromises = selectedItemsArray.map((item) =>
        axios.delete(
          `https://invoicezapi.focusrtech.com:57/user/delete-user/${filteredItems[item].Id}`,
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
      setSelectedRows(new Set());


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
          axios.post(`https://invoicezapi.focusrtech.com:57/user/oracle-payload/${po_id}`),
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

  const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState({
    
    username: "",
    role: "",
    email: "",
    password: "",
    empId:""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddUser = async () => {
    try {
      const response = await fetch("https://invoicezapi.focusrtech.com:57/user/registration", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const result = await response.json();
      console.log("User added successfully:", result);

      // Close the popup and reset form data
      setShowPopup(false);
      setFormData({
        
        username: "",
        role: "",
        email: "",
        password: "",
        empId:""
      });

      notification.success({
        message: "Successfully created",
        
      });
      dispatch(refreshActions.toggleInvoiceUploadRefresh());
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };
  console.log("FORMDATA",formData);

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent:"flex-end",
          gap: "20px",
          fontWeight: "bold",
          marginLeft: "-3em",
        }}
      >
        <button
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
        //   onClick={handleDeleteSelectedRow} // Call delete function
        onClick={() => setShowPopup(true)}
        >
          <PeopleAdd28Regular style={{ color: "#1281d7" }} />
          <span>Add User</span>
        </button>



        {showPopup && (
  <div
    style={{
      padding: "2em",
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background: "rgba(0, 0, 0, 0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1000,
    }}
    onClick={() => setShowPopup(false)} // Close the popup when clicking outside
  >
    <div
      style={{
        background: "white",
        padding: "60px",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        width: "400px",
      }}
      onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the popup
    >
      <h3 style={{ marginBottom: "15px" }}>Add New User</h3>
      <form>
        <label style={{ display: "block", marginBottom: "10px" }}>
          Username:
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            style={{
              width: "100%",
              padding: "8px",
              marginTop: "5px",
              marginBottom: "15px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
        </label>
        <label style={{ display: "block", marginBottom: "10px" }}>
                Role:
                <input
                  type="text"
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  style={{
                    width: "100%",
                    padding: "8px",
                    marginTop: "5px",
                    marginBottom: "15px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                  }}
                />
              </label>
              <label style={{ display: "block", marginBottom: "10px" }}>
                Email:
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  style={{
                    width: "100%",
                    padding: "8px",
                    marginTop: "5px",
                    marginBottom: "15px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                  }}
                />
              </label>
              <label style={{ display: "block", marginBottom: "10px" }}>
                Password:
                <input
                  type="text"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  style={{
                    width: "100%",
                    padding: "8px",
                    marginTop: "5px",
                    marginBottom: "15px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                  }}
                />
              </label>
              <label style={{ display: "block", marginBottom: "10px" }}>
                Employee ID:
                <input
                  type="text"
                  name="empId"
                  value={formData.empId}
                  onChange={handleInputChange}
                  style={{
                    width: "100%",
                    padding: "8px",
                    marginTop: "5px",
                    marginBottom: "15px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                  }}
                />
              </label>
            
      </form>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          gap: "10px",
        }}
      >
        <Button
          onClick={handleAddUser}
          style={{
            padding: "20px",
            background: "#1281d7",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Save
        </Button>
      </div>
    </div>
  </div>
)}


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
          onClick={handleApproveSelectedRows}
        >
          <TasksApp28Regular style={{ color: "#1281d7" }} />
          <span>Approve</span>
        </button> */}

        <button
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
          onClick={handleDeleteSelectedRows }
        
        >
          <PeopleTeamDelete28Regular style={{ color: "#1281d7" }} />
          <span>Delete User</span>
        </button>

        {/* <Search
          placeholder="Search PO or Supplier"
          onSearchChange={handleSearchChange}
        /> */}
      </div>
      <div
        style={{
          height: "60vh",
          overflow: "scroll",
          marginTop: "20px",
        }}
      >
        <DataGrid
          key={items.length}
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
                <DataGridHeaderCell >{renderHeaderCell()}</DataGridHeaderCell>
              )}
            </DataGridRow>
          </DataGridHeader>
          <DataGridBody>
            {({ item, rowId }) => (
              <DataGridRow
                key={rowId}
                // onClick={(e) => handleRowClick(e, item)}
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

        {isPopupVisible && (
          <div
          style={{
            padding:"2em",
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}>
        <div
          isOpen={isPopupVisible}
          onDismiss={() => setPopupVisible(false)}
          title="Edit Row Details"
          ref={popupRef} 
          style={{
            background: "white",
            padding: "60px",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            width: "400px",
          }}
        >
          <div>
          <h3 style={{ marginBottom: "15px" }}>Update User</h3>
            <label
            style={{ display: "block", marginBottom: "10px" }}>
              ID:
              <input
              style={{
                width: "100%",
                padding: "8px",
                marginTop: "5px",
                marginBottom: "15px",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
                type="text"
                value={selectedRow?.Id || ""}
                onChange={(e) => handleChange(e, "Id")}
                disabled
              />
            </label>
            <label
            style={{ display: "block", marginBottom: "10px" }}>
              Username:
              <input
              style={{
                width: "100%",
                padding: "8px",
                marginTop: "5px",
                marginBottom: "15px",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
                type="text"
                value={selectedRow?.username || ""}
                onChange={(e) => handleChange(e, "username")}
              />
            </label>
            <label
            style={{ display: "block", marginBottom: "10px" }}>
              Role:
              <input
                style={{
                  width: "100%",
                  padding: "8px",
                  marginTop: "5px",
                  marginBottom: "15px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                }}
                type="text"
                value={selectedRow?.role || ""}
                onChange={(e) => handleChange(e, "role")}
              />
            </label>
            <label
            style={{ display: "block", marginBottom: "10px" }}>
              Email:
              <input
                style={{
                  width: "100%",
                  padding: "8px",
                  marginTop: "5px",
                  marginBottom: "15px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                }}
                type="email"
                value={selectedRow?.email || ""}
                onChange={(e) => handleChange(e, "email")}
              />
            </label>
            <label
            style={{ display: "block", marginBottom: "10px" }}>
              Emp ID:
              <input
              style={{
                width: "100%",
                padding: "8px",
                marginTop: "5px",
                marginBottom: "15px",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
                type="text"
                value={selectedRow?.empId || ""}
                onChange={(e) => handleChange(e, "empId")}
              />
            </label>
          </div>
          <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "10px",
              }}
            >
              <Button
                onClick={handleSave}
                style={{
                  padding: "20px",
                  background: "#1281d7",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  display:"flex",
                  justifyContent:"center",
                  alignItems:"center"
                }}
                
              >
                Update User
              </Button>
              </div>
        </div>
        </div>
      )}
      </div>

      {/* Reset Password Popup */}

      {showResetPopup && (
  <div
    style={{
      padding: "2em",
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background: "rgba(0, 0, 0, 0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1000,
    }}
    onClick={() => setShowResetPopup(false)} // Close the popup when clicking outside
  >
    <div
      style={{
        background: "white",
        padding: "60px",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        width: "400px",
      }}
      onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the popup
    >
      {/* <h3 style={{ marginBottom: "15px" }}>Reset Password</h3> */}
      <form onSubmit={handleResetSubmit}>
        <label style={{ display: "block", marginBottom: "10px" }}>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "8px",
              marginTop: "5px",
              marginBottom: "15px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
        </label>
        <label style={{ display: "block", marginBottom: "10px" }}>
          New Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "8px",
              marginTop: "5px",
              marginBottom: "15px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
        </label>
        <div style={{display:"flex",justifyContent:"center"}}>
        <button
          type="submit"
          style={{
            padding: "10px 15px",
            backgroundColor: "#1281d7",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            width: "50%",
            
          }}
        >
          Reset Password
        </button>

        </div>
        
      </form>
    </div>
  </div>
)}
    </>
  );
};

export default UserTable;