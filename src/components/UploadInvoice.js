// import React, { useState } from 'react';
// import axios from 'axios';
// import { notification } from "antd";

// const InvoiceUpload = ({ fileInputRef }) => {
//     const [file, setFile] = useState(null);
//     const [uploadStatus, setUploadStatus] = useState(null);

//     const handleFileChange = async (e) => {
//         const selectedFile = e.target.files[0];
//         setFile(selectedFile);

//         if (selectedFile) {
//             const formData = new FormData();
//             formData.append('file', selectedFile);

//             try {
//                 const response = await axios.post('http://172.235.16.78:8085/invoice/uploadfile/', formData, {
//                     headers: {
//                         'Content-Type': 'multipart/form-data',
//                     },
//                 });

//                 if (response.status === 200) {
//                     setUploadStatus('File uploaded successfully.');
//                     notification.success({
//                         message: "Successfully File Uploaded",
//                     });
//                     console.log('Response:', response.data);
//                 } else {
//                     notification.error({
//                         message: "File Upload Failed",
//                     });
//                     setUploadStatus('File upload failed.');
//                 }
//             } catch (error) {
//                 console.log('Error:', error);
//                 notification.error({
//                     message: "File Upload Failed",
//                 });
//                 setUploadStatus('Error during file upload.');
//                 console.error('Error:', error);
//             }
//         }
//     };

//     return (
//         <div>
//             <input
//                 type="file"
//                 ref={fileInputRef}
//                 style={{ display: 'none' }} 
//                 onChange={handleFileChange}
//             />
//             {uploadStatus && <p>{uploadStatus}</p>}
//         </div>
//     );
// };

// export default InvoiceUpload;
