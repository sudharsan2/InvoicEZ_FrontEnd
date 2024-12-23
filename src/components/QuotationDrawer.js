



// import React, { useState } from "react";
// import {
//   DrawerBody,
//   DrawerHeader,
//   DrawerHeaderTitle,
//   Drawer,
//   makeStyles,
//   useRestoreFocusSource,
//   useRestoreFocusTarget,
// } from "@fluentui/react-components";
// import QuotationDrawerPage from "../pages/QuotationDrawerPage";
// import { useDispatch, useSelector } from "react-redux";
// import axios from "axios";
// import {message} from "antd";
// import { useNavigate } from "react-router-dom";
// const useStyles = makeStyles({
//   root: {
//     overflow: "hidden",
//     display: "flex",
//     height: "480px",
//   },
//   drawer: {
//     width: "80vw",
//     maxWidth: "80vw",
//     overflowY: "auto",
//     zIndex: 9999,
//     backgroundColor: "#fff",
//   },
//   drawerContent: {
//     width: "100%",
//     marginLeft: "2em",
//     marginTop: "1em",
//   },
// });

// const QuotationDrawer = ({data,userId,onClose }) => {
//   const navigate = useNavigate();
//   const styles = useStyles();
//   const [type, setType] = useState("overlay");
//   const [isOpen, setIsOpen] = useState(true);
//   const restoreFocusTargetAttributes = useRestoreFocusTarget();
//   const restoreFocusSourceAttributes = useRestoreFocusSource();
  
//   const handleClose = () => {
//     setIsOpen(false);
//     if (onClose) onClose(); 
//   };


//   const handleFreightTerm = useSelector((state) => state.refresh.freightterm);

//   const [formData, setFormData] = useState({
//     price: "",
//     deliverySchedule: null,
//     payment: "",
//   });

//   // Handler functions to update state
//   const handlePriceChange = (e) => {
//     setFormData((prev) => ({
//       ...prev,
//       price: e.target.value,
//     }));
//   };

//   const handlePaymentChange = (value) => {
//     setFormData((prev) => ({
//       ...prev,
//       payment: value,
//     }));
//   };

//   const handleDeliveryScheduleChange = (date) => {
//     setFormData((prev) => ({
//       ...prev,
//       deliverySchedule: date,
//     }));
//   };

//   const handleSubmit = async () => {
//     console.log("API called")
//     try {
//       const response = await axios.post(
//         `https://invoicezapi.focusrtech.com:57/user/create-quotations/${data.id}`,
//         {
//           distribution_number: data.line_items[0].distribution_number,
//           charge_account: handleFreightTerm,
//           distribution_amount: formData.price,
//           last_update_date: formData.deliverySchedule,
//           supplier: userId,
//         }
//       ); 
//       if(response.status===201 || response.status===200 )
//         {
//           handleClose();
//           message.success("Quotation successfully Submitted");
          
//         }
//       const fetchedItems = response.data;
//       console.log(fetchedItems); // You can handle the response as needed
//     } catch (error) {
//       console.log("Error:", error);
//     }
//   };

//   return (
//     <div className={styles.root}>
//       <Drawer
//         {...restoreFocusSourceAttributes}
//         type={type}
//         position="end"
//         separator
//         open={isOpen}
//         // onOpenChange={(_, { open }) => setIsOpen(open)}
//         onOpenChange={(_, { open }) => {
//           setIsOpen(open)
//           if (!open) handleClose(); // Trigger close logic when the drawer closes
//         }}
//         className={styles.drawer}
//       >
//         <div className={styles.drawerContent}>
//           <QuotationDrawerPage userId={userId} data={data} onSubmit={handleSubmit}/>
//         </div>
//       </Drawer>
//     </div>
//   );
// };

// export default QuotationDrawer;



import React, { useState } from "react";
import { Drawer } from "@fluentui/react-components";
import QuotationDrawerPage from "../pages/QuotationDrawerPage";
import { useSelector } from "react-redux";
import axios from "axios";
import { message } from "antd";

const QuotationDrawer = ({ data, userId, onClose }) => {
  const [isOpen, setIsOpen] = useState(true);
  const handleFreightTerm = useSelector((state) => state.refresh.freightterm);

  const [formData, setFormData] = useState({
    price: "",
    deliverySchedule: null,
    payment: "",
  });

  const handleClose = () => {
    setIsOpen(false);
    if (onClose) onClose();
  };

  const handleSubmit = async () => {
    console.log("Submitting API Call...");
    try {
      const response = await axios.post(
        `https://invoicezapi.focusrtech.com:57/user/create-quotations/${data.id}`,
        {
          distribution_number: data.line_items[0].distribution_number,
          charge_account: handleFreightTerm,
          distribution_amount: formData.price,
          last_update_date: formData.deliverySchedule,
          supplier: userId,
        }
      );

      if (response.status === 201 || response.status === 200) {
        handleClose();
        message.success("Quotation successfully Submitted");
      }

      console.log("API Response:", response.data);
    } catch (error) {
      console.error("Error while submitting quotation:", error);
      message.error("Error submitting quotation");
    }
  };

  return (
    <Drawer
      type="overlay"
      position="end"
      open={isOpen}
      onOpenChange={(_, { open }) => {
        setIsOpen(open);
        if (!open) handleClose();
      }}
      style={{
        width: "80vw",
        maxWidth: "80vw",
        overflowY: "auto",
        zIndex: 9999,
        backgroundColor: "#fff",
      }}
    >
      <div style={{ marginLeft: "2em", marginTop: "1em" }}>
        <QuotationDrawerPage
          formData={formData}
          onFormDataChange={setFormData}
          onSubmit={handleSubmit}
        />
      </div>
    </Drawer>
  );
};

export default QuotationDrawer;

