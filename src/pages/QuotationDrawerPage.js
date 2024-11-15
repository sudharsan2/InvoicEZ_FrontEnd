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

const QuotationDrawerPage = ({ data, userId }) => {
  const dispatch = useDispatch();
  const handleFreightTerm = useSelector((state) => state.refresh.freightterm);

  const [formData, setFormData] = useState({
    price: "",
    deliverySchedule: null,
    payment: "",
  });

  // Handler functions to update state
  const handlePriceChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      price: e.target.value,
    }));
  };

  const handlePaymentChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      payment: value,
    }));
  };

  const handleDeliveryScheduleChange = (date) => {
    setFormData((prev) => ({
      ...prev,
      deliverySchedule: date,
    }));
  };

  const handleSubmit = async () => {
    console.log("data", data);
    try {
      const response = await axios.post(
        `http://172.235.21.99:57/user/create-quotations/${data.id}`,
        {
          distribution_number: data.line_items[0].distribution_number,
          charge_account: handleFreightTerm,
          distribution_amount: formData.price,
          last_update_date: formData.deliverySchedule,
          supplier: userId,
        },
      );
      const fetchedItems = response.data;
      console.log(fetchedItems); // You can handle the response as needed
    } catch (error) {
      console.log("Error:", error);
    }
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
          <span style={{ marginBottom: "10px" }}>Delivery Schedule</span>
          <DatePickerComponent
            value={formData.deliverySchedule}
            onChange={handleDeliveryScheduleChange}
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
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                payment: e.target.value,
              }))
            }
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
        <Button
          style={{ color: "white", backgroundColor: "#3d98de" }}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default QuotationDrawerPage;
