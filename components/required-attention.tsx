"use client"

import { useState } from "react"

const jobsData = [
  {
    id: 1,
    title: "Senior Data Analyst",
    daysAgo: "100 days ago",
    positionsLeft: 3,
    applications: 123,
    interviewed: 40,
    rejected: 33,
    feedbackPending: 7,
    offered: 2,
  },
  {
    id: 2,
    title: "Junior Data Analyst",
    daysAgo: "78 days ago",
    positionsLeft: 7,
    applications: 567,
    interviewed: 22,
    rejected: 20,
    feedbackPending: 2,
    offered: 4,
  },
  {
    id: 3,
    title: "Product Designer",
    daysAgo: "56 days ago",
    positionsLeft: 2,
    applications: 201,
    interviewed: 32,
    rejected: 18,
    feedbackPending: 14,
    offered: 0,
  },
  {
    id: 4,
    title: "Java Developer",
    daysAgo: "46 days ago",
    positionsLeft: 5,
    applications: 231,
    interviewed: 23,
    rejected: 10,
    feedbackPending: 13,
    offered: 3,
  },
  {
    id: 5,
    title: "Product Manager",
    daysAgo: "13 days ago",
    positionsLeft: 3,
    applications: 67,
    interviewed: 41,
    rejected: 22,
    feedbackPending: 19,
    offered: 1,
  },
]

const candidatesData = [
  {
    id: 1,
    title: "John Smith",
    daysAgo: "5 days ago",
    positionsLeft: 1,
    applications: 3,
    interviewed: 2,
    rejected: 0,
    feedbackPending: 1,
    offered: 0,
  },
  {
    id: 2,
    title: "Sarah Johnson",
    daysAgo: "12 days ago",
    positionsLeft: 2,
    applications: 5,
    interviewed: 3,
    rejected: 1,
    feedbackPending: 2,
    offered: 1,
  },
]

const onboardingsData = [
  {
    id: 1,
    title: "New Hire Orientation",
    daysAgo: "2 days ago",
    positionsLeft: 5,
    applications: 15,
    interviewed: 12,
    rejected: 2,
    feedbackPending: 3,
    offered: 8,
  },
]

export function RequireAttention() {
  const [activeTab, setActiveTab] = useState("jobs")

  const getCurrentData = () => {
    switch (activeTab) {
      case "candidates":
        return candidatesData
      case "onboardings":
        return onboardingsData
      default:
        return jobsData
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
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`pb-2 text-sm font-medium transition-colors relative ${ activeTab === tab.id ? "text-gray-900 border-b-2 border-yellow-400" : "text-gray-500 hover:text-gray-700" }`} > {tab.label} </button>
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
            {getCurrentData().map((item, index) => (
              <tr key={item.id} className="cursor-pointer border-b border-[#e5edf9] hover:bg-primary-micro-active animate-fade-up animation-fill-forwards" style={{ animationDelay: `${index * 100}ms`, animationDuration: "500ms" }}>
                <td className="py-4 px-4">
                    <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                            <img src={`${activeTab === 'candidates' ? "/user-avatar.png?height=40&width=40" : "/job-position-avatar.svg?height=40&width=40"}`} alt="Avatar" width={40} height={40} className="w-full h-full object-cover" />
                        </div>

                        <div>
                            <div className="font-medium text-gray-900">{item.title}</div>
                            <div className="text-sm text-gray-500">{item.daysAgo}</div>
                        </div>
                  </div>
                </td>
                <td className="py-4 px-4 text-center font-medium text-gray-900">{item.positionsLeft}</td>
                <td className="py-4 px-4 text-center text-gray-600">{item.applications}</td>
                <td className="py-4 px-4 text-center text-gray-600">{item.interviewed}</td>
                <td className="py-4 px-4 text-center text-gray-600">{item.rejected}</td>
                <td className="py-4 px-4 text-center text-gray-600">{item.feedbackPending}</td>
                <td className="py-4 px-4 text-center font-medium text-gray-900">{item.offered}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
