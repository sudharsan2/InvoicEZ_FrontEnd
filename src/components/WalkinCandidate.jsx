import { Upload, message,notification } from "antd";
import React from "react";
import axios from "axios";
import "./WalkinCandidate.css";
import { useDispatch } from "react-redux";
import { refreshActions } from "../Store/Store";
import { SiTicktick } from "react-icons/si";
import matchedImage from '../media/matched.png';
import multiplematch from '../media/multiple.png'
import nomatch from '../media/nomatch.png';
const WalkInCandidate = ({ isWalkinUpload }) => {
  const dispatch = useDispatch();


  // const openNotification = (type, description, style) => {
  //   notification.open({
  //     // message: type,
  //     description: (
  //       <div style={{ display: "flex", alignItems: "center" }}>
  //         <img
  //           src={style.imageSrc}
  //           alt="notification-icon"
  //           style={{ width: "100%", height: "70px", marginRight: "10px" }}
  //         />
  //         {/* <span>{description}</span> */}
  //       </div>
  //     ),
  //     // style: {
  //     //   // borderRight: `7px solid ${style.borderColor}`,
  //     //   backgroundColor: "fff",
  //     //   boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.1)",
  //     //   borderRadius: "5px",
  //     //   color: style.textColor,
  //     //   width: "320px",
  //     //   padding:"0px"
  //     // },
  //     placement: "topRight",
  //   });
  // };
  

  const openNotification = (type, description, style) => {
    notification.open({
      description: (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "0" }}>
          <img
            src={style.imageSrc}
            alt="notification-icon"
            style={{
              width: "100%", // Ensures the image spans the entire notification card
              height: "auto", // Maintains aspect ratio
            }}
          />
        </div>
      ),
      style: {
        backgroundColor: "#fff", // Notification background color
        boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.1)", // Optional shadow
        borderRadius: "5px", // Rounded corners
        padding: "0", // Remove any internal padding
        overflow: "hidden", // Ensures no content spills out
        width: "320px", // Adjust the width of the notification card
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
      
      // message.success(`${file.name} uploaded successfully.`);
      file.status = "done";
      onSuccess();

      // Dispatch the refresh action to trigger any reloads in other components
      dispatch(refreshActions.toggleInvoiceUploadRefresh());
    } catch (error) {
      // Handle error
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




// import { Upload, message, notification } from "antd";
// import React from "react";
// import axios from "axios";
// import "./WalkinCandidate.css";
// import { useDispatch } from "react-redux";
// import { refreshActions } from "../Store/Store";
// // import {CheckmarkCircleRegular} from "@fluentui/react-components"
// import { SiTicktick } from "react-icons/si";

// const WalkInCandidate = ({ isWalkinUpload }) => {
//   const dispatch = useDispatch();

  
//   const openNotification = (type, description, style) => {
//     notification.open({
//       message: type,
//       description: description,
//       // icon: <SiTicktick  style={style.icon} />,
//       icon: (
//         <div
//           style={{
//             backgroundColor: "#e6f7ea", 
//             borderRadius: "50%",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             width: "50px",
//             height: "100px",
//             borderRadius: "5px",
//           }}
//         >
//           <SiTicktick style={{ color: "#34a853", fontSize: "20px" }} />
//         </div>
//       ),
//       style: {
//         borderRight: `5px solid ${style.borderColor}`,
//         backgroundColor: "#fff",
//         boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.1)",
//         borderRadius: "5px",
//         color: style.textColor,
//         width: "300px",
//       },
//       placement: "topRight",
//     });
//   };

//   const handleUpload = async ({ file, onSuccess, onError }) => {
//     const token = localStorage.getItem("access_token");

//     try {
//       const formData = new FormData();
//       formData.append("file", file);

//       const response = await axios.post(
//         "https://invoicezapi.focusrtech.com:57/user/invoice-upload",
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       console.log("File uploaded successfully:", response.data);
//       const poHeadersLength = response.data.po_headers.length;

//       // Notification based on poHeadersLength
//       if (poHeadersLength === 0) {
//         openNotification("Success", "No Match.", {
//           icon: { color: "#dc3545" },
//           borderColor: "#dc3545",
//           backgroundColor: "#f8d7da",
//           textColor: "#721c24",
//         });
//       } else if (poHeadersLength === 1) {
//         openNotification("Success", "Matched.", {
//           icon: { color: "#28a745" },
//           borderColor: "#28a745",
//           backgroundColor: "#d4edda",
//           textColor: "#155724",
//         });
//       } else if (poHeadersLength > 1) {
//         openNotification("Success", "Multiple Match.", {
//           icon: { color: "#ffc107" },
//           borderColor: "#ffc107",
//           backgroundColor: "#fff3cd",
//           textColor: "#856404",
//         });
//       }

//       // Handle success
//       file.status = "done";
//       onSuccess();

//       // Dispatch refresh action
//       dispatch(refreshActions.toggleInvoiceUploadRefresh());
//     } catch (error) {
//       console.error("Error uploading file:", error);

//       if (
//         error.response &&
//         error.response.data &&
//         error.response.data.error === "Invoice already exists"
//       ) {
//         message.error("Invoice already exists.");
//       } else {
//         message.error(`${file.name} upload failed.`);
//       }

//       file.status = "error";
//       onError();
//     } finally {
//       isWalkinUpload();
//     }
//   };

//   return (
//     <div className="form">
//       <h1>Upload Invoice</h1>
//       <Upload.Dragger
//         name="file"
//         onChange={(info) => {}}
//         customRequest={handleUpload}
//       >
//         <p className="ant-upload-text">Click or drag file to upload</p>
//         <p className="ant-upload-hint">
//           Upload Invoice to match with the Potential PO's.
//         </p>
//       </Upload.Dragger>
//     </div>
//   );
// };

// export default WalkInCandidate;
