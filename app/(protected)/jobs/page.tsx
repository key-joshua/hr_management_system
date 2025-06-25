"use client"

import { EditJob } from "@/components/edit-job";
import { Navbar } from "@/components/navbar";
import { Sidebar } from "@/components/sidebar";
import { Job, useJobs } from "@/hooks/useJobs";
import { Modal } from "@mui/material";
import { useEffect, useState } from "react";

export default function JobPage() {
  const { data, loading, error, getJobs } = useJobs();
  const [isJobModalOpen, setIsJobModalOpen] = useState(false);
  const [jobs, setJobs] = useState<Job[] | []>([]);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  const handleJobModal = (open: boolean, jobData?: Job) => {
    setIsJobModalOpen(open);
    if (open && jobData) {
      setSelectedJob(jobData);
    } else {
      setSelectedJob(null);
    }
  };

  const updateJobs = (updatedJob: Job) => {
    setJobs(prevJobs =>
      prevJobs.map(job =>
        job._id === updatedJob._id ? updatedJob : job
      )
    );
  };


  useEffect(() => { getJobs() }, []);

  useEffect(() => {
    if (data) {
      setJobs(data as Job[]);
    }
  }, [data]);

  return (
    <>
      <Sidebar />
      <Navbar />
      <div className="min-h-screen bg-[#e5edf9] animate-fade-up animation-fill-forwards w-full">
        {loading && <div className="w-full h-full flex items-center justify-center"><h3>Loading....</h3></div>}
        {error && <div className="w-full h-full flex items-center justify-center"><h3>Error....</h3></div>}
        {jobs && <div className="ml-24 mt-20 mr-4 mb-4 pt-6 px-2">
          <h2 className="text-2xl font-bold text-primary-active mb-6">Job List</h2>
          <div className="pt-4 overflow-x-auto bg-[#f3f8ff]">
            <table className="w-full">
              <thead>
                <tr>
                  <th />
                  <th className="text-center py-3 px-4 font-medium text-gray-500 text-sm text-nowrap">Positions Left</th>
                  <th className="text-center py-3 px-4 font-medium text-gray-500 text-sm text-nowrap">Applications</th>
                  <th className="text-center py-3 px-4 font-medium text-gray-500 text-sm text-nowrap">Interviewed</th>
                  <th className="text-center py-3 px-4 font-medium text-gray-500 text-sm text-nowrap">Rejected</th>
                  <th className="text-center py-3 px-4 font-medium text-gray-500 text-sm text-nowrap">Feedback Pending</th>
                  <th className="text-center py-3 px-4 font-medium text-gray-500 text-sm text-nowrap">Offered</th>
                  <th className="text-center py-3 px-4 font-medium text-gray-500 text-sm text-nowrap">Actions</th>
                </tr>
              </thead>
              <tbody>
                {jobs.map((item, index: number) => (
                  <tr
                    key={item._id}
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
                          <div className="font-medium text-gray-900">{item.job_title}</div>
                          <div className="text-sm text-gray-500  truncate md:text-clip max-w-[200px]">{item.job_description}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-center font-medium text-gray-900">{item.positions_left}</td>
                    <td className="py-4 px-4 text-center text-gray-600">{item.applications}</td>
                    <td className="py-4 px-4 text-center text-gray-600">{item.interviewed}</td>
                    <td className="py-4 px-4 text-center text-gray-600">{item.rejections}</td>
                    <td className="py-4 px-4 text-center text-gray-600">{item.pending_feedback}</td>
                    <td className="py-4 px-4 text-center font-medium text-gray-900">{item.offers}</td>
                    <td >
                      <button className="h-10 px-5 py-3 text-white-active rounded-md text-sm bg-primary-semi-active hover:bg-primary-mini-active"
                        onClick={() => handleJobModal(true, item)}
                      >Edit</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Modal
            open={isJobModalOpen}
            onClose={() => handleJobModal(false)}
            keepMounted
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div> {selectedJob && (
              <EditJob
                updateJobs={updateJobs}
                handleModal={handleJobModal}
                job={selectedJob}
              />
            )}</div>
          </Modal>
        </div>
        }
      </div>
    </>
  );
}
