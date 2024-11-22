// refreshSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  InvoiceUploadRefresh: false,
  drawerPosition: localStorage.getItem("userDrawerPosition") || "1", 
  secondaryDrawerPosition: localStorage.getItem("userSecondaryDrawerPosition") || "1",
  dropdown:false,
  suppliers:null,
  conformedSupplier:null,
  freightterm:null,
  messageNotify:false,
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
   handleFreightTerm(state,action){
    state.freightterm = action.payload;
   },
    
   handleMessageNotify(state,action)
   {
    state.messageNotify = !state.messageNotify;
   },
   toggleSecondaryDrawerPosition(state, action) {
    state.secondaryDrawerPosition = action.payload;
    localStorage.setItem("userSecondaryDrawerPosition", action.payload); // Store second drawer position
  },

  },
});

export const { toggleInvoiceUploadRefresh, toggleDrawerPosition,dropDownSubmit,dropDownValue, conformedSupplierValue,handleFreightTerm,handleMessageNotify,toggleSecondaryDrawerPosition } =
  refreshSlice.actions;
export const refreshReducer = refreshSlice.reducer; // Export as refreshReducer

