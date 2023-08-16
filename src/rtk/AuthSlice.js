import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    token: localStorage.getItem('token') || null,
    user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem('token', action.payload); // Save token to local storage
    },
    setUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem('user', JSON.stringify(action.payload)); // Save user data to local storage
    },
    setTransaction: (state, action) => {
      state.transaction = action.payload;
      localStorage.setItem('description', JSON.stringify(action.payload));
      localStorage.setItem('note', JSON.stringify(action.payload));
    },
    clearToken: (state) => {
      state.token = null;
      state.user = null;
      localStorage.removeItem('token'); // Remove token from local storage
      localStorage.removeItem('user'); // Remove user data from local storage
      localStorage.removeItem('description'); // Remove description data from local storage
      localStorage.removeItem('note'); // Remove note data from local storage
    },
  },
});

export const { setToken, setUser, clearToken } = authSlice.actions;
export default authSlice.reducer;