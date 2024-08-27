import React from 'react'
import { NavbarDefault } from '../../components/admin/NavBar'
import JobPostForm from '../../components/admin/JobPostForm'
function JobPost() {
  return (
    <div className="relative min-h-screen bg-white">
    <div className="absolute inset-0  z-0" ></div>
    
    <div className="relative z-10">
      <div className="p-2">
        <NavbarDefault />
      </div>
      
      <div className="h-auto p-10 flex justify-center">
        <JobPostForm />
      </div>
    </div>
  </div>
 
  )
}

export default JobPost