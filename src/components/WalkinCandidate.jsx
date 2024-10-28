import { Upload, message } from "antd";
import React from "react";
import axios from "axios";
import "./WalkinCandidate.css";
import { useDispatch } from "react-redux";
import { refreshActions } from "../Store/Store";

const WalkInCandidate = ({ isWalkinUpload }) => {
  const dispatch = useDispatch();

  const handleUpload = async ({ file, onSuccess, onError }) => {
    const token = localStorage.getItem("accessToken");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post(
        "http://127.0.0.1:8000/user/invoice-upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            // Authorization: `Bearer ${token}`,
          },
        },
      );

      // Handle success
      console.log("File uploaded successfully:", response.data);
      message.success(`${file.name} uploaded successfully.`);
      file.status = "done";
      onSuccess();

      // Dispatch the refresh action to trigger any reloads in other components
      dispatch(refreshActions.toggleInvoiceUploadRefresh());
    } catch (error) {
      // Handle error
      console.error("Error uploading file:", error);
      message.error(`${file.name} upload failed.`);
      file.status = "error";
      onError();
    } finally {
      // Trigger any additional local refresh if needed
      isWalkinUpload();
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
