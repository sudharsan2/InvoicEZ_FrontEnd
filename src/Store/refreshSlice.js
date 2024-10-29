// refreshSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  InvoiceUploadRefresh: false,
  drawerPosition: localStorage.getItem("userDrawerPosition") || "1", // Retrieve from localStorage
};

const refreshSlice = createSlice({
  name: "refresh",
  initialState,
  reducers: {
    toggleInvoiceUploadRefresh(state) {
      state.InvoiceUploadRefresh = !state.InvoiceUploadRefresh;
    },
    toggleDrawerPosition(state, action) {
      // Use action.payload to update drawerPosition
      state.drawerPosition = action.payload;
      localStorage.setItem("userDrawerPosition", action.payload); // Update in localStorage
    },
  },
});

export const { toggleInvoiceUploadRefresh, toggleDrawerPosition } =
  refreshSlice.actions;
export const refreshReducer = refreshSlice.reducer; // Export as refreshReducer
