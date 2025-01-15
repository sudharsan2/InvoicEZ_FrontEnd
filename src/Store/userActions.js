// authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  InvoiceUploadRefresh: false,
};

const userActions = createSlice({
  name: "auth",
  initialState,
  reducers: {
    InvoiceUploadRefresh(state) {
      state.InvoiceUploadRefresh = !state.InvoiceUploadRefresh;
    },
  },
});

export const { setUsername } = authSlice.actions;
export const getUsernameFromAuth = (state) => state.auth.username; // Selector to get username
export default userActions.reducer;
