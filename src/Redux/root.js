import userReducer from "../Redux/user/userSlice.js";
import adminReducer from "../Redux/admin/adminSlice.js";

import { combineReducers } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
  admin: adminReducer,
  user: userReducer,
});

export default rootReducer;
