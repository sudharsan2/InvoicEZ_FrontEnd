// authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const userActions = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    username: '', // Add username to the initial state
  },
  reducers: {
    setUsername(state, action) {
      state.username = action.payload;
    },
    // other reducers like setAuthenticated, etc.
  },
});

export const { setUsername } = authSlice.actions;
export const getUsernameFromAuth = (state) => state.auth.username; // Selector to get username
export default userActions.reducer;
