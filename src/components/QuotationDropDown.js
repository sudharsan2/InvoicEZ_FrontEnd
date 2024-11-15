import React, { useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { refreshActions } from "../Store/Store";

const QuotationDropDown = () => {
  const [selectedValues, setSelectedValues] = useState([]);
  const [items, setItems] = useState([]); // Ensure initial state is an empty array
  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch data when the component is mounted
    fetchData();
  }, []);

  const dropDownHandle = (value) => {
    dispatch(refreshActions.handleFreightTerm(value));
  };

  const handleChange = (selectedOptions) => {
    const valuesArray = selectedOptions.map((item) => item.value);
    setSelectedValues(selectedOptions);
    dropDownHandle(valuesArray);
    console.log(
      "Selected values:",
      selectedOptions.map((option) => option.value),
    );
  };

  const options = [
    { value: "Airways", label: "Airways" },
    { value: "Seaways", label: "Seaways" },
    { value: "Roadway", label: "Roadway" },
  ];

  // Custom styles for react-select
  const customStyles = {
    control: (styles) => ({
      ...styles,
      borderColor: "black", // Set border color to black
      "&:hover": {
        borderColor: "black", // Ensure the border stays black on hover
      },
      "&:focus": {
        borderColor: "black", // Ensure the border stays black when focused
      },
    }),
  };

  const fetchData = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/user/suppliers");
      const fetchedItems = response.data; // Assuming data is in response.data
      console.log("fetchedItems", fetchedItems);

      // Ensure the fetchedItems is an array and map them
      const mappedItems = Array.isArray(fetchedItems)
        ? fetchedItems.map((item) => ({
            label: item.username,
            value: item.id,
          }))
        : [];

      setItems(mappedItems);
    } catch (error) {
      console.error("Error fetching data:", error);
      setItems([]); // In case of error, set items to an empty array
    }
  };

  return (
    <div>
      <Select
        isMulti
        options={options} // Ensure options are passed correctly
        value={selectedValues}
        onChange={handleChange}
        getOptionLabel={(e) => <div>{e.label}</div>}
        styles={customStyles} // Apply the custom styles
      />
      {/* <p>Selected values:</p>
      <ul>
        {selectedValues.map(option => (
          <li key={option.value}>{option.label}</li>
        ))}
      </ul> */}
    </div>
  );
};

export default QuotationDropDown;
