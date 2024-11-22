import React, { useState } from "react";
import {
  Button,
  Input,
  Label,
  Field,
  Textarea,
} from "@fluentui/react-components";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import QuotationDropDown from "../components/QuotationDropDown";
import DatePickerComponent from "../components/DatePicker";

const QuotationDrawerPage = ({ formData, onFormDataChange,data, userId ,onSubmit}) => {
  const dispatch = useDispatch();
  const handleFreightTerm = useSelector((state) => state.refresh.freightterm);

  // const [formData, setFormData] = useState({
  //   price: "",
  //   deliverySchedule: null,
  //   payment: "",
  // });

  // // Handler functions to update state
  // const handlePriceChange = (e) => {
  //   setFormData((prev) => ({
  //     ...prev,
  //     price: e.target.value,
  //   }));
  // };

  // const handlePaymentChange = (value) => {
  //   setFormData((prev) => ({
  //     ...prev,
  //     payment: value,
  //   }));
  // };

  // const handleDeliveryScheduleChange = (date) => {
  //   setFormData((prev) => ({
  //     ...prev,
  //     deliverySchedule: date,
  //   }));
  // };

  
  const handlePriceChange = (e) => {
    onFormDataChange({
      ...formData,
      price: e.target.value,
    });
  };

  

  const handlePaymentChange = (e) => {
    onFormDataChange({
      ...formData,
      payment: e.target.value,
    });
  };

  const handleDeliveryScheduleChange = (date) => {
    onFormDataChange({
      ...formData,
      deliverySchedule: date,
    });
  };

  return (
    <div style={{ maxHeight: "91vh", overflowY: "auto" }}>
      <div style={{ padding: "2em" }}>
        <h2>Comments</h2>
        <h3 style={{ fontWeight: "normal" }}>Enter Your commands</h3>
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          width: "50%",
          gap: "2em",
          marginLeft: "2em",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: "1 1 30%",
            maxWidth: "30%",
          }}
        >
          <span style={{ marginBottom: "10px" }}>Price</span>
          <Input
            value={formData.price}
            onChange={handlePriceChange}
            placeholder="Enter price"
          />
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: "1 1 30%",
            maxWidth: "30%",
          }}
        >
          <span style={{ marginBottom: "10px" }}>Freight term</span>
          <QuotationDropDown
            value={formData.payment}
            onChange={handlePaymentChange}
          />
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: "1 1 30%",
            maxWidth: "30%",
          }}
        >
          {/* <span style={{ marginBottom: "10px" }}>Delivery Schedule</span>  */}
          {/* <DatePickerComponent
            value={formData.deliverySchedule}
            onChange={handleDeliveryScheduleChange}
          />  */}

<DatePickerComponent
    value={formData.deliverySchedule}
    onChange={(date) => {
      console.log("Selected Date:", date); // Debugging
      handleDeliveryScheduleChange(date);
    }}
  />
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: "1 1 30%",
            maxWidth: "30%",
          }}
        >
          <span style={{ marginBottom: "10px" }}>Payment Term</span>
           <Input
            value={formData.payment}
            onChange={handlePaymentChange}
            placeholder="Enter payment term"
          />
        </div>
      </div>

      <div style={{ marginLeft: "2em", marginTop: "3em" }}>
        <Label
          size="large"
          style={{ fontWeight: "normal", marginBottom: "10px" }}
        >
          Remarks
        </Label>
        <Field style={{ width: "80%" }}>
          <Textarea size="large" />
        </Field>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          padding: "6em",
          marginTop: "2em",
        }}
      >
        <Button style={{ color: "white", backgroundColor: "#3d98de" }} onClick={()=>{onSubmit();}}>
          Submit
        </Button>
      </div>
    </div>
  );
};

export default QuotationDrawerPage;
