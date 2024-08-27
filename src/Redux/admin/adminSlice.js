import { createSlice } from '@reduxjs/toolkit';

const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    adminData: null,
  },
  reducers: {
    setAdminData: (state, action) => {
      state.adminData = action.payload;
    },

    removeAdminData : (state) => {
      state.adminData = null
    }
  },
});

export const { setAdminData,removeAdminData } = adminSlice.actions;
export default adminSlice.reducer;
