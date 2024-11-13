import React from "react";
import { DatePicker } from "@fluentui/react";
import { Field, makeStyles } from "@fluentui/react-components";
import PropTypes from "prop-types"; // Import PropTypes to add type checking

// Define styles
const useStyles = makeStyles({
  control: {
    maxWidth: "300px",
  },
  
});


// DatePickerComponent
const DatePickerComponent = ({ label, placeholder, ...props }) => {
  const styles = useStyles();

  return (
    <Field>
      <DatePicker
        
        className={styles.control}
        placeholder={placeholder}
        {...props}
      />
    </Field>
  );
};

// Default props
DatePickerComponent.defaultProps = {
  label: "Select a date",
  placeholder: "Select a date...",
};

// Prop types for validation
DatePickerComponent.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
};

export default DatePickerComponent;
