import React from 'react'
import AppraisersProfile from '../components/profile/AppraisersProfile'
import AppraisalHistory from '../components/profile/AppraisalHistory'

export default function Appraiser() {
  return (
    <div className="w-full min-h-[80vh] flex items-start justify-center gap-8 p-16 bg-slate-100">
      <div className="w-1/3 flex flex-col items-start justify-center gap-8 overflow-auto">
      <AppraisersProfile/>
      </div>
      <div className="w-full flex items-start justify-center gap-4 overflow-hidden">
      <AppraisalHistory/>
      </div>
    </div>
  )
}
