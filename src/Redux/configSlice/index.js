// configSlice.js
import { createSlice } from '@reduxjs/toolkit';

const configSlice = createSlice({
  name: 'config',
  initialState: {
    create: true,
  },
  reducers: {
    updateConfig: (state, action) => {
      // Merge the incoming action.payload object into the state
      Object.assign(state, action.payload);
    },
  },
});

export const { updateConfig } = configSlice.actions;
export default configSlice.reducer;
