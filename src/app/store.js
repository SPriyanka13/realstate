import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/users/userSlice'; // ✅ default import

export const store = configureStore({
  reducer: {
    users: userReducer,
  },
});
