


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

