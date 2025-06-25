"use client"

import { Job, useJobs } from "@/hooks/useJobs";
import { useEffect, useState } from "react";

const candidatesData = [
  {
    _id: 1,
    job_title: "John Smith",
    daysAgo: "5 days ago",
    positions_left: 1,
    applications: 3,
    interviewed: 2,
    rejections: 0,
    pending_feedback: 1,
    offered: 0,
  },
  {
    _id: 2,
    job_title: "Sarah Johnson",
    daysAgo: "12 days ago",
    positions_left: 2,
    applications: 5,
    interviewed: 3,
    rejections: 1,
    pending_feedback: 2,
    offers: 1,
  },
]

const onboardingsData = [
  {
    _id: 1,
    job_title: "New Hire Orientation",
    daysAgo: "2 days ago",
    positions_left: 5,
    applications: 15,
    interviewed: 12,
    rejections: 2,
    pending_feedback: 3,
    offers: 8,
  },
]

export function RequireAttention() {
  const { data, getJobs } = useJobs();
  const [activeTab, setActiveTab] = useState("jobs")

  useEffect(() => { getJobs() }, []);

  const getCurrentData = () => {
    switch (activeTab) {
      case "candidates":
        return candidatesData
      case "onboardings":
        return onboardingsData
      default:
        return data as Job[] || []
    }
  }

  const tabs = [
    { id: "jobs", label: "Jobs" },
    { id: "candidates", label: "Candidates" },
    { id: "onboardings", label: "Onboardings" },
  ]

  return (
    <div className="p-6 rounded-lg">
      <h2 className="text-2xl font-bold text-primary-active mb-6">Require Attention</h2>

      <div className="flex space-x-8 mb-6">
        {tabs.map((tab) => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`pb-2 text-sm font-medium transition-colors relative ${activeTab === tab.id ? "text-gray-900 border-b-2 border-yellow-400" : "text-gray-500 hover:text-gray-700"}`} > {tab.label} </button>
        ))}
      </div>

      <div className="pt-4 overflow-x-auto bg-[#f3f8ff]">
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left py-3 px-4 font-medium text-gray-500 text-sm">{`${activeTab === 'jobs' ? "Positions" : activeTab === 'candidates' ? "Personality" : "Onboarding Status"}`}</th>
              <th className="text-center py-3 px-4 font-medium text-gray-500 text-sm">Positions Left</th>
              <th className="text-center py-3 px-4 font-medium text-gray-500 text-sm">Applications</th>
              <th className="text-center py-3 px-4 font-medium text-gray-500 text-sm">Interviewed</th>
              <th className="text-center py-3 px-4 font-medium text-gray-500 text-sm">Rejected</th>
              <th className="text-center py-3 px-4 font-medium text-gray-500 text-sm">Feedback Pending</th>
              <th className="text-center py-3 px-4 font-medium text-gray-500 text-sm">Offered</th>
            </tr>
          </thead>
          <tbody>
            {getCurrentData() && getCurrentData().map((item, index) => (
              <tr key={item._id} className="cursor-pointer border-b border-[#e5edf9] hover:bg-primary-micro-active animate-fade-up animation-fill-forwards" style={{ animationDelay: `${index * 100}ms`, animationDuration: "500ms" }}>
                <td className="py-4 px-4">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                      <img src={`${activeTab === 'candidates' ? "/user-avatar.png?height=40&width=40" : "/job-position-avatar.svg?height=40&width=40"}`} alt="Avatar" width={40} height={40} className="w-full h-full object-cover" />
                    </div>

                    <div>
                      <div className="font-medium text-gray-900">{item.job_title}</div>
                      <div className="text-sm text-gray-500">5 days ago</div>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4 text-center font-medium text-gray-900">{item.positions_left}</td>
                <td className="py-4 px-4 text-center text-gray-600">{item.applications}</td>
                <td className="py-4 px-4 text-center text-gray-600">{item.interviewed}</td>
                <td className="py-4 px-4 text-center text-gray-600">{item.rejections}</td>
                <td className="py-4 px-4 text-center text-gray-600">{item.pending_feedback}</td>
                <td className="py-4 px-4 text-center font-medium text-gray-900">{item.offers}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
