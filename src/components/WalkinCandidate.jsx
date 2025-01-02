import { Upload, message,notification } from "antd";
import React from "react";
import axios from "axios";
import "./WalkinCandidate.css";
import { useDispatch } from "react-redux";
import { refreshActions } from "../Store/Store";

import matchedImage from '../media/matched.png';
import multiplematch from '../media/multiple.png'
import nomatch from '../media/nomatch.png';
const WalkInCandidate = ({ isWalkinUpload }) => {
  const dispatch = useDispatch();


  
  

  const openNotification = (type, description, style) => {
    notification.open({
      description: (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "0" }}>
          <img
            src={style.imageSrc}
            alt="notification-icon"
            style={{
              width: "100%", 
              height: "auto", 
            }}
          />
        </div>
      ),
      style: {
        backgroundColor: "#fff", 
        boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.1)", 
        borderRadius: "5px", 
        padding: "0", 
        overflow: "hidden", 
        width: "320px", 
      },
      placement: "topRight",
    });
  };
  

  const handleUpload = async ({ file, onSuccess, onError }) => {
    const token = localStorage.getItem("access_token");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post(
        "https://invoicezapi.focusrtech.com:57/user/invoice-upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      // Handle success
      console.log("File uploaded successfully:", response.data);
      const poHeadersLength = response.data.po_headers.length;

      if (poHeadersLength === 0) {
        openNotification("Success", "No Match.", {
          imageSrc: nomatch,
          borderColor: "#dc3545",
          backgroundColor: "#f8d7da",
          textColor: "#721c24",
        });
      } else if (poHeadersLength === 1) {
        openNotification("Success", "Matched.", {
          imageSrc: matchedImage,
          borderColor: "#28a745",
          backgroundColor: "#d4edda",
          textColor: "#155724",
        });
      } else if (poHeadersLength > 1) {
        openNotification("Success", "Multiple Match.", {
          imageSrc: multiplematch,
          borderColor: "#ffc107",
          backgroundColor: "#fff3cd",
          textColor: "#856404",
        });
      }
      
    
      file.status = "done";
      onSuccess();

     
      dispatch(refreshActions.toggleInvoiceUploadRefresh());
    } catch (error) {
      
      console.error("Error uploading file:", error);

      if (
        error.response &&
        error.response.data &&
        error.response.data.error === "Invoice already exists"
      ) {
        message.error("Invoice already exists.");
      } else {
        message.error(`${file.name} upload failed.`);
      }

      file.status = "error";
      onError();
    } 
  };

  return (
    <div className="form">
      <h1>Upload Invoice</h1>
      <Upload.Dragger
        name="file"
        onChange={(info) => {}}
        customRequest={handleUpload}
      >
        <p className="ant-upload-text">Click or drag file to upload</p>
        <p className="ant-upload-hint">
          Upload Invoice to match with the Potential PO's.
        </p>
      </Upload.Dragger>
    </div>
  );
};

export default WalkInCandidate;




