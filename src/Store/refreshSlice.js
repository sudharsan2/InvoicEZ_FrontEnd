// refreshSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  InvoiceUploadRefresh: false,
};

const refreshSlice = createSlice({
  name: "refresh",
  initialState,
  reducers: {
    toggleInvoiceUploadRefresh(state) {
      state.InvoiceUploadRefresh = !state.InvoiceUploadRefresh;
    },
  },
});

export const { toggleInvoiceUploadRefresh } = refreshSlice.actions;
export const refreshReducer = refreshSlice.reducer; // Export as refreshReducer
