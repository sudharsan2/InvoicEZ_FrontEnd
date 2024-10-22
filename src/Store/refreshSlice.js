import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  InvoiceUploadRefresh: false,
};

const refreshSlice = createSlice({
  name: "refresh",
  initialState,
  reducers: {
    toggleInvoiceUploadRefresh(state) {
      // Updated action name for clarity
      state.InvoiceUploadRefresh = !state.InvoiceUploadRefresh;
    },
  },
});

export const { toggleInvoiceUploadRefresh } = refreshSlice.actions; // Export action
export default refreshSlice;
