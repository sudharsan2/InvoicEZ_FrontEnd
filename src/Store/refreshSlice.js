import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  invoiceUploadRefresh: false, // consistent camelCase
};

const refreshSlice = createSlice({
  name: "refresh", // or use a more descriptive name like 'invoiceUpload'
  initialState,
  reducers: {
    toggleInvoiceUploadRefresh(state) {
      state.invoiceUploadRefresh = !state.invoiceUploadRefresh;
    },
  },
});

// Export the action and reducer
// export const { toggleInvoiceUploadRefresh } = refreshSlice.actions;
export default refreshSlice; // note: it's `.reducer` to export the reducer function
