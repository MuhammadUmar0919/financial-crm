// slices/itemsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Define an async thunk for loading items
export const loadItems = createAsyncThunk("items/load", async () => {
  // Simulate an API call to fetch items
  const response = await fetch("your-api-endpoint");
  const data = await response.json();
  return data;
});

const itemsSlice = createSlice({
  name: "Admins",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {
    addItem: (state, action) => {
      state.data.push(action.payload);
    },
    removeItem: (state, action) => {
      state.data = state.data.filter((item) => item.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadItems.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(loadItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { addItem, removeItem } = itemsSlice.actions;
export default itemsSlice.reducer;
