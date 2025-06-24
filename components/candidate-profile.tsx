"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Linkedin, Twitter, Globe, FileText, Check, X } from "lucide-react"

const candidateData = {
  name: "John Doe",
  email: "John.Doe@gmail.com",
  phone: "+250 788 492 456",
  status: "Interview",
  currentStatus: {
    round: "Technical",
    assignedTo: "John Doe",
    interviewDate: "Jul 30, 2024",
  },
  files: [
    { name: "Cover_letter.pdf", uploadDate: "2d ago", type: "pdf" },
    { name: "My_resume.pdf", uploadDate: "2d ago", type: "pdf" },
    { name: "Oct_payslip.pdf", uploadDate: "2d ago", type: "pdf" },
    { name: "Oct_payslip.pdf", uploadDate: "2d ago", type: "pdf" },
  ],
  experience: [
    {
      title: "Senior Data Analyst",
      company: "Alight",
      duration: "(May 2021 - Present)",
      responsibilities: [
        "Data Exploration and Analysis: They perform exploratory data analysis to uncover insights, trends, and patterns in the data, often using statistical and visualisation techniques.",
        "Data Cleaning and Preprocessing: Data analysts are responsible for cleaning and preparing raw renewable data to ensure its accuracy and reliability for analysis.",
        "Reporting and Communication: Data analysts communicate their findings through reports, dashboards, and presentations to help stakeholders make informed decisions based on the data-driven insights.",
      ],
    },
    {
      title: "Junior Data Analyst",
      company: "Alight",
      duration: "(May 2020 - May 2021)",
      responsibilities: [
        "Data Exploration and Analysis: They perform exploratory data analysis to uncover insights, trends, and patterns in the data, often using statistical and visualisation techniques.",
        "Data Cleaning and Preprocessing: Data analysts are responsible for cleaning and preparing raw renewable data to ensure its accuracy and reliability for analysis.",
        "Reporting and Communication: Data analysts communicate their findings through reports, dashboards, and presentations to help stakeholders make informed decisions based on the data-driven insights.",
      ],
    },
  ],

  score: 75,
  scoreLabel: "Potential Fit",
  evaluations: {
    qualificationsMatch: true,
    experienceRelevance: true,
    education: true,
    keywordsMatch: false,
    yearsOfExperience: true,
    jobHopping: false,
    culturalFit: true,
    interviewPerformance: true,
    references: false,
    additionalFactors: true,
  },
}

export function CandidateProfile() {
  const [activeTab, setActiveTab] = useState("general")

  const tabs = [
    { id: "general", label: "General" },
    { id: "evaluations", label: "Evaluations" },
    { id: "experience", label: "Experience" },
    { id: "education", label: "Education" },
    { id: "events", label: "Events" },
    { id: "documents", label: "Documents" },
    { id: "messages", label: "Messages" },
  ]

  const evaluationItems = [
    { key: "qualificationsMatch", label: "Qualifications and skills match", value: candidateData.evaluations.qualificationsMatch, },
    { key: "experienceRelevance", label: "Experience Relevance", value: candidateData.evaluations.experienceRelevance },
    { key: "education", label: "Education", value: candidateData.evaluations.education },
    { key: "keywordsMatch", label: "Keywords Match", value: candidateData.evaluations.keywordsMatch },
    { key: "yearsOfExperience", label: "Years of Experience", value: candidateData.evaluations.yearsOfExperience },
    { key: "jobHopping", label: "Job Hopping", value: candidateData.evaluations.jobHopping },
    { key: "culturalFit", label: "Cultural Fit", value: candidateData.evaluations.culturalFit },
    { key: "interviewPerformance", label: "Interview Performance", value: candidateData.evaluations.interviewPerformance, },
    { key: "references", label: "References", value: candidateData.evaluations.references },
    { key: "additionalFactors", label: "Additional Factors", value: candidateData.evaluations.additionalFactors },
  ]
  return (
    <div className="p-4 sm:p-6 rounded-lg">
      <div className="mb-6 flex flex-col xl:flex-row gap-6 xl:gap-8 xl:items-start">
        <div className="lg:min-h-[180px] flex-1">
          <div className=" rounded-lg p-4 sm:p-6 flex flex-col justify-between bg-[#f3f8ff]">
            <div className="flex items-start justify-between">
              <div className="flex flex-col sm:flex-row items-start sm:items-start space-y-4 sm:space-y-0 sm:space-x-4 w-full">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-xl font-semibold text-gray-600 flex-shrink-0"> JD </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 mb-3">
                    <h1 className="text-xl sm:text-2xl font-bold text-gray-900">{candidateData.name}</h1>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 w-fit"> {candidateData.status} </span>
                  </div>
                  
                  <div className="text-gray-600 mb-3 flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-1 sm:space-y-0">
                    <p className="break-all sm:break-normal">{candidateData.email}</p>
                    <p>{candidateData.phone}</p>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
                    <button className="text-blue-600 hover:text-blue-700 text-sm font-medium w-fit">Edit</button>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm" className="p-2"> <Linkedin className="h-4 w-4 text-blue-600" /> </Button>
                      <Button variant="ghost" size="sm" className="p-2"> <Twitter className="h-4 w-4 text-blue-400" /> </Button>
                      <Button variant="ghost" size="sm" className="p-2"> <Globe className="h-4 w-4 text-gray-600" /> </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:min-h-[180px] w-full xl:w-96 flex-shrink-0">
          <div className="rounded-lg p-4 sm:p-4 flex flex-col bg-[#f3f8ff]">
            <div className="flex flex-col h-full">
              <h3 className="text-lg font-semibold text-gray-900 mb-2 sm:mb-6">Current Status</h3>
              <div className="sm:space-y-2 flex-1 flex flex-col justify-center">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Round</span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-600 text-white"> {candidateData.currentStatus.round} </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Assigned to</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 rounded-full overflow-hidden"> <img src="/placeholder.svg?height=24&width=24" alt="Assigned user" className="w-full h-full object-cover" /> </div>
                    <span className="text-sm font-medium text-gray-900">{candidateData.currentStatus.assignedTo}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Interview Date</span>
                  <span className="text-sm font-medium text-gray-900">{candidateData.currentStatus.interviewDate}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col xl:flex-row gap-6 xl:gap-8 xl:items-start">
        <div className="flex-1">
          <div className="rounded-lg shadow-sm bg-[#f3f8ff]">
            <div className="border-b border-gray-200 overflow-x-auto">
              <nav className="flex space-x-6 sm:space-x-8 px-4 sm:px-6 min-w-max">
                {tabs.map((tab) => ( <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`py-4 text-sm font-medium transition-colors relative whitespace-nowrap ${activeTab === tab.id ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500 hover:text-gray-700"}`} > {tab.label} </button> ))}
              </nav>
            </div>

            <div className="p-4 sm:p-6 lg:p-8">
              {activeTab === "general" && (
                <div className="space-y-6 sm:space-y-8">
                  <div>
                    <div className="flex items-center mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">Candidate Files</h3>
                      <span className="ml-2 text-blue-600 text-sm cursor-pointer hover:text-blue-700">Edit</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-4">
                      {candidateData.files.map((file, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-3 sm:p-4 hover:bg-gray-50 cursor-pointer" >
                          <div className="flex items-center space-x-3">
                            <FileText className="h-6 w-6 sm:h-8 sm:w-8 text-red-500 flex-shrink-0" />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
                              <p className="text-xs text-gray-500">{file.uploadDate}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 flex justify-end">
                      <span className="text-blue-600 text-sm cursor-pointer hover:text-blue-700">View All</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">Last Experience</h3>
                      <span className="ml-2 text-blue-600 text-sm cursor-pointer hover:text-blue-700">Edit</span>
                    </div>

                    <div className="space-y-6 sm:space-y-8">
                      {candidateData.experience.map((exp, index) => (
                        <div key={index} className="border-l-2 border-gray-200 pl-4">
                          <div className="mb-2">
                            <h4 className="font-semibold text-gray-900">{exp.title}</h4>
                            <p className="text-gray-600"> {exp.company} <span className="text-gray-500">{exp.duration}</span> </p>
                          </div>

                          <div>
                            <p className="font-medium text-gray-900 mb-2">Responsible for;</p>
                            <ol className="list-decimal list-inside space-y-2 sm:space-y-3 text-gray-600">
                              {exp.responsibilities.map((resp, respIndex) => ( <li key={respIndex} className="text-sm leading-relaxed"> {resp} </li> ))}
                            </ol>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "evaluations" && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Candidate Evaluation</h3>
                  <div className="space-y-3">
                    {evaluationItems.map((item) => (
                      <div key={item.key} className="flex items-center justify-between py-2">
                        <span className="text-gray-700 text-sm sm:text-base">{item.label}</span>
                        <div className="flex items-center">
                          {item.value ? ( <Check className="h-5 w-5 text-green-500" /> ) : ( <X className="h-5 w-5 text-red-500" /> )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab !== "general" && activeTab !== "evaluations" && ( <div className="text-center py-8 text-gray-500"> Content for {tabs.find((t) => t.id === activeTab)?.label} tab will be displayed here. </div> )}
            </div>
          </div>
        </div>

        <div className="w-full xl:w-96 flex-shrink-0">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
            <div className="text-center mb-4">
              <div className="relative inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 mb-2">
                <svg className="w-16 h-16 sm:w-20 sm:h-20 transform -rotate-90" viewBox="0 0 36 36"> <path className="text-gray-200" stroke="currentColor" strokeWidth="3" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" /> <path className="text-green-500" stroke="currentColor" strokeWidth="3" strokeDasharray={`${candidateData.score}, 100`} strokeLinecap="round" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" /> </svg>
                <span className="absolute text-lg sm:text-xl font-bold text-gray-900">{candidateData.score}</span>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-900"> Score: <span className="text-green-600">{candidateData.scoreLabel}</span> </p>
                <Button variant="ghost" size="sm" className="text-blue-600 mt-1"> Edit </Button>
              </div>
            </div>

            <div className="space-y-2">
              {evaluationItems.slice(0, 5).map((item) => (
                <div key={item.key} className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 text-xs sm:text-sm">{item.label}</span>
                  {item.value ? ( <Check className="h-4 w-4 text-green-500 flex-shrink-0" /> ) : ( <X className="h-4 w-4 text-red-500 flex-shrink-0" /> )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
