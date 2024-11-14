// refreshSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  InvoiceUploadRefresh: false,
  drawerPosition: localStorage.getItem("userDrawerPosition") || "1", // Retrieve from localStorage
  dropdown:false,
  suppliers:null,
  conformedSupplier:null,
};

const refreshSlice = createSlice({
  name: "refresh",
  initialState,
  reducers: {
    toggleInvoiceUploadRefresh(state) {
      state.InvoiceUploadRefresh = !state.InvoiceUploadRefresh;
    },

    dropDownSubmit(state,action){
       state.dropdown = ! state.dropdown;
    },
    dropDownValue(state,action){
      state.suppliers = action.payload;
   },
    
    toggleDrawerPosition(state, action) {
      // Use action.payload to update drawerPosition
      state.drawerPosition = action.payload;
      localStorage.setItem("userDrawerPosition", action.payload); // Update in localStorage
    },

    conformedSupplierValue(state,action){
      state.conformedSupplier = action.payload;
   },
    
  },
});

export const { toggleInvoiceUploadRefresh, toggleDrawerPosition,dropDownSubmit,dropDownValue, conformedSupplierValue } =
  refreshSlice.actions;
export const refreshReducer = refreshSlice.reducer; // Export as refreshReducer

