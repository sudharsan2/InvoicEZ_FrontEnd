// import React, { useState, useEffect } from "react";
// import { Calendar, momentLocalizer, Views } from "react-big-calendar";
// import moment from "moment";
// import "react-big-calendar/lib/css/react-big-calendar.css";
// import "../pages/dashboard.css";
// import axios from "axios";
// // Setup the localizer by providing the moment (or globalize) Object
// const localizer = momentLocalizer(moment);

// const CalendarComponent = () => {
//   const [purchaseOrders, setPurchaseOrders] = useState([]);

//   // Fetch purchase order data from the API
//   useEffect(() => {
//     const fetchPurchaseOrders = async () => {
//       try {
       
//         const token = localStorage.getItem("access_token");
//       const response = await axios.get("https://invoicezapi.focusrtech.com:57/user/no-invoice-list", {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       });
//         const data = await response.json();

//         const formattedOrders = data.map((order) => ({
//           id: order.id,
//           title: `Order #${order.id}`,
//           start: new Date(order.InvoiceDate), // assuming API returns start_date
//           end: new Date(order.InvoiceDate), // assuming API returns end_date
//         }));

//         // Update the state with the formatted events
//         setPurchaseOrders(formattedOrders);
//       } catch (error) {
//         console.error("Error fetching purchase orders:", error);
//       }
//     };

//     fetchPurchaseOrders();
//   }, []); // Empty dependency array means this effect runs once after initial render

//   const CustomToolbar = (toolbar) => {
//     const goToBack = () => {
//       toolbar.onNavigate("PREV");
//     };

//     const goToNext = () => {
//       toolbar.onNavigate("NEXT");
//     };

//     const goToCurrent = () => {
//       toolbar.onNavigate("TODAY");
//     };

//     const handleViewChange = (view) => {
//       toolbar.onView(view);
//     };

//     return (
//       <div className="rbc-toolbar">
//         <span className="rbc-btn-group">
//           <button onClick={goToBack}>Previous</button>
//           <button onClick={goToCurrent}>Today</button>
//           <button onClick={goToNext}>Next</button>
//         </span>
//         <span className="rbc-toolbar-label">{toolbar.label}</span>
//         <span className="rbc-btn-group">
//           <button onClick={() => handleViewChange("month")}>Month</button>
//           <button onClick={() => handleViewChange("week")}>Week</button>
//         </span>
//       </div>
//     );
//   };

//   return (
//     <div style={{ height: "500px" }}>
//       <h3>Purchase Orders Calendar</h3>
//       <Calendar
//         localizer={localizer}
//         events={purchaseOrders}
//         startAccessor="start"
//         endAccessor="end"
//         titleAccessor="title"
//         style={{ height: 500, marginLeft: "50px",marginBottom:"10px" }}
//         views={["month", "week"]}
//         defaultView={Views.MONTH}
//         components={{
//           toolbar: CustomToolbar,
//         }}
//       />
//     </div>
//   );
// };

// export default CalendarComponent;



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
  // const handleSelectEvent = (event) => {
  //   navigate(`/openpodet/${event.po_number}`); // Navigate to the details page with po_number
  // };
 
  return (
<div style={{ height: "90%",overflowY:"auto"}}>
<h3 style={{marginBottom:"40px"}}>Purchase Orders Calendar</h3>
<Calendar
        localizer={localizer}
        events={purchaseOrders}
        startAccessor="start"
        endAccessor="end"
        titleAccessor="title"
        style={{ height: 400, width: 800, marginLeft: "30px", marginTop: "-10px" }}
        views={["month", "week"]}
        defaultView={Views.MONTH}

      />
</div>
  );
};
export default CalendarComponent;