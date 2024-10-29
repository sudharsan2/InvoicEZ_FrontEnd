// store.js
import { configureStore } from "@reduxjs/toolkit";
import themeSlice from "./ThemeSlice";
import authSlice from "./authSlice";
import {
  refreshReducer,
  toggleInvoiceUploadRefresh,
  toggleDrawerPosition,
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
}; // Export the specific action
export default store;
