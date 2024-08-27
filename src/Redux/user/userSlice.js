import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userData: null,
    // Add additional user state here
  },
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    removeUserData: (state) => {
      state.userData = null;
    },
  },
});

export const { setUserData,removeUserData } = userSlice.actions;
export default userSlice.reducer;
