import { configureStore } from "@reduxjs/toolkit";
import themeSlice from "./ThemeSlice";
import authSlice from "./authSlice";
import refreshSlice from "./refreshSlice"; // Adjusted imports for refreshSlice

const store = configureStore({
  reducer: {
    theme: themeSlice.reducer,
    auth: authSlice.reducer,
    refresh: refreshSlice.reducer, // Use the default export, which is already the reducer
  },
});

export const themeActions = themeSlice.actions;
export const refreshActions = refreshSlice.actions; // Export specific actions from refreshSlice
export default store;
