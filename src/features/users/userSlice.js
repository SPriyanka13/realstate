// File: src/features/userSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Mock backend array to simulate DB
let users = [];

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  return new Promise((res) => setTimeout(() => res([...users]), 300));
});

export const addUser = createAsyncThunk('users/addUser', async (user) => {
  return new Promise((res) => {
    setTimeout(() => {
      const newUser = { ...user, id: Date.now() };
      users.push(newUser);
      res(newUser);
    }, 300);
  });
});

export const updateUser = createAsyncThunk('users/updateUser', async (user) => {
  return new Promise((res) => {
    setTimeout(() => {
      users = users.map((u) => (u.id === user.id ? user : u));
      res(user);
    }, 300);
  });
});

export const deleteUser = createAsyncThunk('users/deleteUser', async (id) => {
  return new Promise((res) => {
    setTimeout(() => {
      users = users.filter((u) => u.id !== id);
      res(id);
    }, 300);
  });
});

const userSlice = createSlice({
  name: 'users',
  initialState: {
    list: [],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.list = action.payload;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const index = state.list.findIndex((u) => u.id === action.payload.id);
        state.list[index] = action.payload;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.list = state.list.filter((u) => u.id !== action.payload);
      });
  },
});

export default userSlice.reducer;
