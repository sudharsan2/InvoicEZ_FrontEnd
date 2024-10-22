import { configureStore } from "@reduxjs/toolkit";
import themeSlice from "./ThemeSlice";
import authSlice from "./authSlice";
import refreshSlice from "./refreshSlice";

const store = configureStore({
  reducer: {
    theme: themeSlice.reducer,
    auth: authSlice.reducer,
    refresh: refreshSlice.reducer, // Changed from 'actions' to 'refresh'
  },
});

export const themeActions = themeSlice.actions;
export const refreshActions = refreshSlice.actions; // Exports actions from refreshSlice correctly
export default store;
