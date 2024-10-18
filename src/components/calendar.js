import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import '../pages/dashboard.css';

// Setup the localizer by providing the moment (or globalize) Object
const localizer = momentLocalizer(moment);

const CalendarComponent = () => {
  // Sample purchase order data
  const [purchaseOrders] = useState([
    
    {
      id: 2,
      title: 'Order #67890',
      start: new Date(2024, 9, 17),  // Date of the order (October 17, 2024)
      end: new Date(2024, 9, 17),
    },
    {
      id: 3,
      title: 'Order #54321',
      start: new Date(2024, 9, 20),  // Date of the order (October 20, 2024)
      end: new Date(2024, 9, 20),
    },
  ]);

  return (
    <div style={{ height: '500px' }}>
      <h3>Purchase Orders Calendar</h3>
      <Calendar
        localizer={localizer}
        events={purchaseOrders}
        startAccessor="start"
        endAccessor="end"
        titleAccessor="title"
        style={{ height: 500, margin: '50px' }}
      />
    </div>
  );
};

export default CalendarComponent;
