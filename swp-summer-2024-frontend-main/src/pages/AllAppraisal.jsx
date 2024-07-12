import React from 'react'
import AppraisersProfile from '../components/profile/AppraisersProfile'
import NewAppraisal from '../components/profile/NewAppraisal'

export default function AllAppraisal() {
  return (
    <div className="w-full min-h-[80vh] flex items-start justify-center gap-8 p-16 bg-slate-100">
    <div className="w-full flex">
      <AppraisersProfile/>      
    </div>
    <div className="w-full flex items-start justify-center gap-4 overflow-hidden">
      <NewAppraisal/>
      </div>
    </div>
  )
}
