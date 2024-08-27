import { Route, Routes } from "react-router-dom";

import JobList from "../pages/admin/JobList";
import {AdminIsLoggedIn} from "../auth/IsLoggedIn";
import JobPost from "../pages/admin/JobPost";

function AdminRoute() {
  return (
    <>
      <Routes>
        <Route path="/jobs" element={<AdminIsLoggedIn><JobList /></AdminIsLoggedIn>} />
        <Route path="/postjob" element={  <AdminIsLoggedIn><JobPost /></AdminIsLoggedIn> } />
      </Routes>
    </>
  );
}

export default AdminRoute;
