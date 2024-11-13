import React, { useState } from 'react';
import Select from 'react-select';

const DropdownComponent = () => {
  const [selectedValues, setSelectedValues] = useState([]);

  const options = [
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
    { value: 'cherry', label: 'Cherry' },
    { value: 'date', label: 'Date' },
    { value: 'elderberry', label: 'Elderberry' },
  ];

  const handleChange = (selectedOptions) => {
    setSelectedValues(selectedOptions);
    console.log('Selected values:', selectedOptions.map(option => option.value));
  };

  // Custom styles for react-select
  const customStyles = {
    control: (styles) => ({
      ...styles,
      borderColor: 'black', // Set border color to black
      '&:hover': {
        borderColor: 'black', // Ensure the border stays black on hover
      },
      '&:focus': {
        borderColor: 'black', // Ensure the border stays black when focused
      },
    }),
  };

  return (
    <div>
      <Select
        isMulti
        options={options}
        value={selectedValues}
        onChange={handleChange}
        getOptionLabel={(e) => <div>{e.label}</div>}
        styles={customStyles} // Apply the custom styles
      />
      <p>Selected values:</p>
      <ul>
        {selectedValues.map(option => (
          <li key={option.value}>{option.label}</li>
        ))}
      </ul>
    </div>
  );
};

export default DropdownComponent;
