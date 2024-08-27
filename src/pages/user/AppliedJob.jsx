import React from 'react'
import JobListingPage from './jobList'

function AppliedJob() {
  return (
    <div>
        <JobListingPage showAppliedJobs={true} />
    </div>
  )
}

export default AppliedJob