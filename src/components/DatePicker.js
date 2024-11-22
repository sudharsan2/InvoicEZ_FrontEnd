// import React from "react";
// import { DatePicker } from "@fluentui/react";
// import { Field, makeStyles } from "@fluentui/react-components";
// import PropTypes from "prop-types"; // Import PropTypes to add type checking

// // Define styles
// const useStyles = makeStyles({
//   control: {
//     maxWidth: "300px",
//   },
  
// });


// // DatePickerComponent
// const DatePickerComponent = ({ label, placeholder, ...props }) => {
//   const styles = useStyles();

//   return (
//     <Field>
//       <DatePicker
        
//         className={styles.control}
//         placeholder={placeholder}
//         {...props}
//       />
//     </Field>
//   );
// };

// // Default props
// DatePickerComponent.defaultProps = {
//   label: "Select a date",
//   placeholder: "Select a date...",
// };

// // Prop types for validation
// DatePickerComponent.propTypes = {
//   label: PropTypes.string,
//   placeholder: PropTypes.string,
// };

// export default DatePickerComponent;




import React from "react";
import { DatePicker } from "@fluentui/react";
import { Field, makeStyles } from "@fluentui/react-components";
import PropTypes from "prop-types";

// Define styles
const useStyles = makeStyles({
  control: {
    maxWidth: "300px",
  },
});

// Function to format the date to YYYY-MM-DD
const formatDateToYYYYMMDD = (date) => {
  if (!date) return null;
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

// DatePickerComponent
const DatePickerComponent = ({ value, onChange, label, placeholder }) => {
  const styles = useStyles();

  // Handler for date changes
  const handleDateChange = (date) => {
    if (onChange) {
      const formattedDate = formatDateToYYYYMMDD(date);
      onChange(formattedDate); // Emit the formatted date
    }
  };

  return (
    <Field label={label}>
      <DatePicker
        className={styles.control}
        placeholder={placeholder}
        value={value ? new Date(value) : null} // Convert value back to a Date object
        onSelectDate={handleDateChange} // Emit formatted date
      />
    </Field>
  );
};

// Default props
DatePickerComponent.defaultProps = {
  label: "Select a date",
  placeholder: "Select a date...",
  value: null,
  onChange: () => {},
};

// Prop types for validation
DatePickerComponent.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string, // Now expects a YYYY-MM-DD string
  onChange: PropTypes.func, // Function to handle date changes
};

export default DatePickerComponent;

