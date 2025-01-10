// refreshSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  InvoiceUploadRefresh: false,

  drawerPosition: localStorage.getItem("userDrawerPosition") || "1",
  secondaryDrawerPosition: localStorage.getItem("userSecondaryDrawerPosition") || "1",
  dropdown: false,
  suppliers: null,
  conformedSupplier: null,
  freightterm: null,
  messageNotify: false,
  tableLength: 0,
  MatchCount: 0,
  multiple_MatchCount: 0,
  fixCount: 0,
};

const refreshSlice = createSlice({
  name: "refresh",
  initialState,
  reducers: {
    toggleInvoiceUploadRefresh(state) {
      console.log("Before toggling:", state.InvoiceUploadRefresh);
      state.InvoiceUploadRefresh = !state.InvoiceUploadRefresh;
      console.log("After toggling:", state.InvoiceUploadRefresh);
    },

    dropDownSubmit(state, action) {
      state.dropdown = !state.dropdown;
    },
    dropDownValue(state, action) {
      state.suppliers = action.payload;
    },

    toggleDrawerPosition(state, action) {
      // Use action.payload to update drawerPosition
      console.log("Updating drawer position to:", action.payload);
      state.drawerPosition = action.payload;
      localStorage.setItem("userDrawerPosition", action.payload); // Update in localStorage
    },

    conformedSupplierValue(state, action) {
      state.conformedSupplier = action.payload;
    },
    handleFreightTerm(state, action) {
      state.freightterm = action.payload;
    },

    handleMessageNotify(state, action) {
      state.messageNotify = !state.messageNotify;
    },
    toggleSecondaryDrawerPosition(state, action) {
      state.secondaryDrawerPosition = action.payload;
      localStorage.setItem("userSecondaryDrawerPosition", action.payload); // Store second drawer position
    },
    updateTableMetrics(state, action) {
      console.log("Payload in Reducer:", action.payload);

      state.tableLength = action.payload.tableLength;
      state.MatchCount = action.payload.MatchCount;
      state.multiple_MatchCount = action.payload.multiple_MatchCount;
      state.fixCount = action.payload.fixCount;
    },





  },
});

export const { toggleInvoiceUploadRefresh, toggleDrawerPosition, dropDownSubmit, dropDownValue, conformedSupplierValue, handleFreightTerm, handleMessageNotify, toggleSecondaryDrawerPosition, updateTableMetrics } =
  refreshSlice.actions;
export const refreshReducer = refreshSlice.reducer; // Export as refreshReducer

