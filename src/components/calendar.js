import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";

import "react-big-calendar/lib/css/react-big-calendar.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const localizer = momentLocalizer(moment);

const CalendarComponent = () => {
  const [purchaseOrders, setPurchaseOrders] = useState([]);
  const navigate = useNavigate(); // Hook for navigation

  // Fetch purchase order data
  useEffect(() => {
    const fetchPurchaseOrders = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const response = await axios.get(
          "https://invoicezapi.focusrtech.com:57/user/allOpenPos/",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = response.data || [];
        const formattedOrders = data.map((order) => ({
          id: order.id,
          title: `PO #${order.po_number}`, // Display PO number
          start: new Date(order.po_items[0].need_by_date), // Assuming need_by_date is for the event
          end: new Date(order.po_items[0].need_by_date),
          po_number: order.po_number, // Include po_number for navigation
        }));
        setPurchaseOrders(formattedOrders);
      } catch (error) {
        console.error("Error fetching purchase orders:", error);
      }
    };

    fetchPurchaseOrders();
  }, []);

  // Handle event click
  // Handle event click
  const handleSelectEvent = (event) => {
    console.log("purchaseOrders.po_number ", event.po_number)
    navigate(`/openpodet`, { state: { pono: event.po_number } }); // Navigate to the details page with po_number 
  };


  return (
    <div style={{ height: "800px" }}>
      <h3>Purchase Orders Calendar</h3>
      <Calendar
        localizer={localizer}
        events={purchaseOrders}
        startAccessor="start"
        endAccessor="end"
        titleAccessor="title"
        style={{ height: 700, width: 700, marginLeft: "30px", marginTop: "-10px" }}
        views={["month", "week"]}
        defaultView={Views.MONTH}
        onSelectEvent={handleSelectEvent} // Attach the event handler
      />
    </div>
  );
};

export default CalendarComponent;