"use client"

import { Navbar } from "@/components/navbar";
import { Sidebar } from "@/components/sidebar";
import { useJobs } from "@/hooks/useJobs";
import { useEffect } from "react";

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
];
export default function JobPage() {
  const { data, loading, error, getJobs } = useJobs();

  useEffect(() => { getJobs() }, []);

  return (
    <>
      <Sidebar />
      <Navbar />
      <div className="min-h-screen bg-[#e5edf9] animate-fade-up animation-fill-forwards w-full">
        {loading && <div className="w-full h-full flex items-center justify-center"><h3>Loading....</h3></div>}
        {error && <div className="w-full h-full flex items-center justify-center"><h3>Error....</h3></div>}
        {data && <div className="ml-24 mt-20 mr-4 mb-4 pt-6 px-2">
          <h2 className="text-2xl font-bold text-primary-active mb-6">Job List</h2>
          <div className="pt-4 overflow-x-auto bg-[#f3f8ff]">
            <table className="w-full">
              <thead>
                <tr>
                  <th />
                  <th className="text-center py-3 px-4 font-medium text-gray-500 text-sm">Positions Left</th>
                  <th className="text-center py-3 px-4 font-medium text-gray-500 text-sm">Applications</th>
                  <th className="text-center py-3 px-4 font-medium text-gray-500 text-sm">Interviewed</th>
                  <th className="text-center py-3 px-4 font-medium text-gray-500 text-sm">Rejected</th>
                  <th className="text-center py-3 px-4 font-medium text-gray-500 text-sm">Feedback Pending</th>
                  <th className="text-center py-3 px-4 font-medium text-gray-500 text-sm">Offered</th>
                </tr>
              </thead>
              <tbody>
                {jobsData.map((item, index) => (
                  <tr
                    key={item.id}
                    className="cursor-pointer border-b border-[#e5edf9] hover:bg-primary-micro-active animate-fade-up animation-fill-forwards"
                    style={{ animationDelay: `${index * 100}ms`, animationDuration: "500ms" }}
                  >
                    <td className="py-4 px-4">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                          <img
                            src={"/job-position-avatar.svg?height=40&width=40"}
                            alt="Avatar"
                            width={40}
                            height={40}
                            className="w-full h-full object-cover"
                          />
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
        }
      </div>
    </>
  );
}
