import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { bankApi } from './ApiSlice.js';
import authReducer from './AuthSlice.js';

const tokenFromLocalStorage = localStorage.getItem('token');
const userFromLocalStorage = JSON.parse(localStorage.getItem('user'));

export const store = configureStore({
  reducer: {
    [bankApi.reducerPath]: bankApi.reducer,
    auth: authReducer, // Add the auth slice reducer
  },
  preloadedState: {
    auth: {
      token: tokenFromLocalStorage,
      user: userFromLocalStorage,
    },
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(bankApi.middleware),
});

setupListeners(store.dispatch);