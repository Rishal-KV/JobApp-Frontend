import React, { Children } from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

// function IsLoggedIn({children}) {
//   const token = localStorage.getItem("Token");
//   console.log(token,"token")

//   if (!token) {
//     // If no token is found, redirect to the login page
//     return <Navigate to="/"  />;
//   }

//   try {
//     const decoded = jwtDecode(token);
//     const role = decoded.role; // Assuming the role is stored in the token

//     if (role === 'admin') {
//       // Redirect to the admin dashboard if the role is admin
//       return <>{children}</>
//     } else if (role === 'user') {
//       // Redirect to the jobs page if the role is user
//       return <>{children}</>
//     }
//   } catch (error) {

//     return <Navigate to="/" />;
//   }

//   // If something goes wrong, redirect to the login page
//   return <Navigate to="/" />;
// }

// export default IsLoggedIn;

export const UserIsLoggedIn = ({ children }) => {
  const token = localStorage.getItem("Token");
  if (!token) {
    return <Navigate to="/" />;
  }
  const decode = jwtDecode(token);
  console.log(decode,"deee");
  if (decode.role =="user") {
    return <>{children}</>
  }else{
    return <Navigate to="/admin/jobs"/>
  }

};

export const AdminIsLoggedIn = ({ children }) => {
    const token = localStorage.getItem("Token");
    if (!token) {
      return <Navigate to="/" />;
    }
    const decode = jwtDecode(token);
    if (decode.role === "admin") {
      return <>{children}</>
    }else{
    return   <Navigate to="/user/jobs"/>
    }
  
  };
  
