// store.js
import { configureStore } from "@reduxjs/toolkit";
import themeSlice from "./ThemeSlice";
import authSlice from "./authSlice";
import {
  refreshReducer, 
  toggleSecondaryDrawerPosition,
  toggleInvoiceUploadRefresh,
  toggleDrawerPosition,
  dropDownSubmit,
  dropDownValue,
  conformedSupplierValue,
  handleFreightTerm,
  handleMessageNotify,
  
} from "./refreshSlice"; // Import both reducer and action

const store = configureStore({
  reducer: {
    theme: themeSlice.reducer,
    auth: authSlice.reducer,
    refresh: refreshReducer, // Use refreshReducer here
  },
});

export const themeActions = themeSlice.actions;
export const refreshActions = {
  toggleInvoiceUploadRefresh,
  toggleDrawerPosition,
  toggleSecondaryDrawerPosition,
  dropDownSubmit,
  dropDownValue,
  conformedSupplierValue,
  handleFreightTerm,
  handleMessageNotify
}; // Export the specific action
export default store;
