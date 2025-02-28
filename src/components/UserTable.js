// API connection
import React, { useEffect, useState ,useRef} from "react";

import axios from "axios";
import {
  
  PeopleTeamDelete24Regular,
  PeopleAdd24Regular,
  Edit24Filled,
  Key24Regular,
  Eye24Filled ,
  EyeOff24Filled,ArrowSortUpFilled, ArrowSortDownRegular
  
} from "@fluentui/react-icons";


import {
  DataGrid,
  DataGridBody,
  DataGridRow,
  DataGridHeader,
  DataGridHeaderCell,
  DataGridCell,
  TableCellLayout,
  createTableColumn,
  Dropdown,
  Option,
  useId,
} from "@fluentui/react-components";

import { Button, notification } from "antd"; 
import { useDispatch, useSelector } from "react-redux";
import { refreshActions } from "../Store/Store";


const path = "/UserManagement";


// Define columns for the DataGrid

const UserTable = ({setGateCount,setStoreCount}) => {
  
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

  const dropdownId = useId("dropdown-role");
  const options = [
    "invoice manager",
    "admin",
    "storeuser",
    "supplier",
  ];

  const handleRoleChange = (_, option) => {
    setFormData({ ...formData, role: option });
  };
  const [isHovered, setIsHovered] = useState(false);
  const [isHovered2, setIsHovered2] = useState(false);
  const [searchQuery] = useState("");
  const [items, setItems] = useState([]); // State to hold API data
  const [selectedRows, setSelectedRows] = useState(new Set());
  
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [showResetPopup, setShowResetPopup] = useState(false);
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [selectedUser, setSelectedUser] = useState(null);
const [isPasswordVisible, setIsPasswordVisible] = useState(false);
 

console.log(selectedUser)
const togglePasswordVisibility = () => {
  setIsPasswordVisible((prev) => !prev);
};
  const dispatch = useDispatch();
  
  const isInvoiceUploadRefreshed = useSelector(
    (state) => state.refresh.InvoiceUploadRefresh,
  );

  const [RefreshUpload, SetRefreshUpload] = useState(null);
  console.log(RefreshUpload)
  

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
      const token = localStorage.getItem("access_token");
      const response = await fetch("https://invoicezapi.focusrtech.com:57/user/usermanagement-reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
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
      
      const token = localStorage.getItem("access_token"); 

      const response = await axios.get(
        `https://invoicezapi.focusrtech.com:57/user/user-list`,
        {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        }
      );
      const fetchedItems = response.data; 
      console.log("fetchedItems", fetchedItems);
    
      let Gate = 0;
        let Store = 0;
      const mappedItems = fetchedItems.map((item) => {
        let role = "";
        

        if (item.role === 1) {
          role = "Invoice Manager";
          Gate+=1;
        
        } else if (item.role === 2) {
          role = "Admin";
        
        } else if (item.role === 3) {
            role = "Supplier";
        
        }
        else if (item.role === 4) {
            role = "Store User";
            Store+=1;
        
        }
        
        return {
            Id: item.id,
            username: item.username,
            
            email: item.email,
            empId: item.empId,
            role:role,
            // Edit: item.id !== null ? "Edit" : "",
            // reset: item.id !== null ? "reset" : "",
        };
      });
      

      console.log("Gate / store",Gate,Store)
      setItems(mappedItems);
      setGateCount(Gate);
      setStoreCount(Store);
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
      
    

      const roleMapping = {
        "Invoice Manager": 1,
        Admin: 2,
        Supplier: 3,
        "Store User": 4,
      };
  
      const updatedData = {
        ...selectedRow,
        role: roleMapping[selectedRow.role] || selectedRow.role, 
      };
  
      
     

      const response = await axios.put(
        `https://invoicezapi.focusrtech.com:57/user/edit-user/${selectedRow.Id}`,
        updatedData,
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("access_token")}`, 
          },
        }
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

      
      const token = localStorage.getItem("access_token");
      const deletePromises = selectedItemsArray.map((item) =>
        axios.delete(
          `https://invoicezapi.focusrtech.com:57/user/delete-user/${filteredItems[item].Id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Add the authorization header
            },
          }
        )
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
      
        const token = localStorage.getItem("access_token"); 

      const response = await fetch("https://invoicezapi.focusrtech.com:57/user/registration", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
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

  const [sortState, setSortState] = useState({
    columnId: "",
    sortDirection: "ascending",
  });
  
  const [filtered, setFilteredItems] = useState([]);
  useEffect(() => {
    setFilteredItems(items); 
  }, [items])
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

      if (aValue < bValue) return newSortDirection === "ascending" ? -1 : 1;
      if (aValue > bValue) return newSortDirection === "ascending" ? 1 : -1;
      return 0;
    });
    console.log("SORTED",sortedItems);
    
    setFilteredItems(sortedItems); 
  };

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
            backgroundColor: isHovered ? "#e1e1e2" : "transparent", 
            border: "1px solid #fff",
            padding: "6px 12px",
            cursor: "pointer",
            gap: "8px",
            marginLeft: "2em",
            height: "7vh",
          }}
        //   onClick={handleDeleteSelectedRow} // Call delete function
        onMouseEnter={() => setIsHovered(true)} 
        onMouseLeave={() => setIsHovered(false)} 
        onClick={() => setShowPopup(true)}
        >
          <PeopleAdd24Regular style={{ color: "#1281d7" }} />
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
              width: "95%",
              padding: "8px",
              marginTop: "5px",
              marginBottom: "15px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
        </label>
        <div style={{ display: "grid", gap: "2px", maxWidth: "400px" ,marginBottom:"10px"}}>
      <label id={dropdownId}>Role</label>
      <Dropdown
        aria-labelledby={dropdownId}
        placeholder="Select a role"
        onOptionSelect={(e, data) => handleRoleChange(e, data.optionText)}
        selectedOptions={[formData.role]} 
        style={{width:"100%",padding:"8px"}}
      >
        {options.map((role) => (
          <Option key={role}>{role}</Option>
        ))}
      </Dropdown>
    </div>
              <label style={{ display: "block", marginBottom: "10px" }}>
                Email:
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  style={{
                    width: "95%",
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
                    width: "95%",
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
                    width: "95%",
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


        

        <button
          style={{
            display: "flex",
            alignItems: "center",
            backgroundColor: isHovered2 ? "#e1e1e2" : "transparent", 
            border: "1px solid #fff",
            padding: "6px 12px",
            cursor: "pointer",
            gap: "8px",
            marginLeft: "2em",
          }}
          onMouseEnter={() => setIsHovered2(true)} 
          onMouseLeave={() => setIsHovered2(false)} 
          onClick={handleDeleteSelectedRows }
        
        >
          <PeopleTeamDelete24Regular style={{ color: "#1281d7" }} />
          <span>Delete User</span>
        </button>

        
      </div>
      <div
        style={{
          height: "60vh",
          overflow: "scroll",
          marginTop: "20px",
        }}
      >
       <DataGrid
      items={filtered}
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
                disabled
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
        <label style={{ display: 'block', marginBottom: '10px' }}>
        New Password:
        <div style={{ position: 'relative' }}>
          <input
            type={isPasswordVisible ? 'text' : 'password'} // Toggle input type
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '8px',
              marginTop: '5px',
              marginBottom: '15px',
              border: '1px solid #ccc',
              borderRadius: '4px',
            }}
          />
          <span
            onClick={togglePasswordVisibility}
            style={{
              position: 'absolute',
              right: '10px',
              top: '50%',
              transform: 'translateY(-50%)',
              cursor: 'pointer',
            }}
          >
            {isPasswordVisible ? <Eye24Filled /> : <EyeOff24Filled />}
          </span>
        </div>
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