import React from 'react'
import { Route,Routes } from 'react-router-dom'
import JobList from '../pages/user/jobList'
import AppliedJob from '../pages/user/AppliedJob'
import { UserIsLoggedIn } from '../auth/IsLoggedIn'
function UserRoute() {
  return (
    <Routes>
        <Route path='/jobs' element={<UserIsLoggedIn><JobList/></UserIsLoggedIn>}/>
        <Route path='/appliedjobs' element={<UserIsLoggedIn><AppliedJob/></UserIsLoggedIn>}/>
    

    </Routes>
  )
}

export default UserRoute