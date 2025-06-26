"use client"

import { Navbar } from "@/components/navbar"
import { Sidebar } from "@/components/sidebar"
import { Overview } from "@/components/overview"
import { Meetings } from "@/components/meetings"
import { RequireAttention } from "@/components/required-attention"
import { Job, useJobs } from "@/hooks/useJobs"
import { useEffect, useState } from "react"

export default function HomePage() {
  const { data, getJobs } = useJobs();
  const [jobs, setJobs] = useState<Job[] | []>([]);

  useEffect(() => { getJobs() }, []);
  useEffect(() => {
    if (data) {
      setJobs(data as Job[]);
    }
  }, [data]);

  const pushJobHandler = (newJob: Job) => {
    setJobs(prevJobs => [newJob, ...prevJobs]);
  };

  return (
    <>
      <Sidebar />
      <Navbar />

      <div className="min-h-screen bg-[#e5edf9] animate-fade-up animation-fill-forwards">
        <main className="ml-20 pt-16 px-4 py-6 mx-auto">
          <div className="flex flex-col xl:flex-row gap-6 mt-6">
            <div className="flex-1 min-w-0">
              <Overview pushJobHandler={pushJobHandler} />
              <RequireAttention jobs={jobs} />
            </div>

            <div className="w-full xl:w-96 xl:flex-shrink-0">
              <Meetings />
            </div>
          </div>
        </main>
      </div>
    </>
  )
}
