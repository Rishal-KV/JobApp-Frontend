import React from 'react'
import { Route, Routes } from "react-router-dom";
import Login from '../common/Login';
import IsLoggedOut from '../auth/IsLoggedOut';
import SignUp from '../common/SignUp';
function Auth() {
  return (
    <Routes>
    <Route path="/" element={<IsLoggedOut><Login /></IsLoggedOut>} />
    <Route path="/signup" element={<IsLoggedOut><SignUp/></IsLoggedOut>}/>
  </Routes>  )
}

export default Auth