"use client";

import React, { FormEvent, useEffect, useState } from "react";
import { Button } from "./ui/button";
import { X } from "lucide-react";
import { Textarea } from "./ui/textarea";
import { Job, useJobs } from "@/hooks/useJobs";
import MessageAlert from "./messageAlert";
import { ButtonLoader } from "./Loader";
import { validateJob } from "@/libs/utils/job-validations";

interface NewJobsProps {
  handleModal: (action: boolean) => void;
  pushJobHandler: (job: Job) => void;
}

export const NewJob: React.FC<NewJobsProps> = ({ handleModal, pushJobHandler }) => {

  const [formData, setFormData] = useState({ title: "", description: "", positionLeft: "" });

  const [alert, setAlert] = useState<{ status: "success" | "error" | ""; message: string; id: number }>({ status: "", message: "", id: 0 });

  const { loading: jobLoading, error: jobError, data: jobData, createJob } = useJobs();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCreate = async (e: FormEvent) => {
    e.preventDefault();
    setAlert({ status: "", message: "", id: 0 });

    const jobData = {
      job_title: formData.title.trim(),
      job_description: formData.description.trim(),
      positions_left: Number(formData.positionLeft),
    };

    const validation = validateJob(jobData);
    if (!validation.isValid) {
      setAlert({
        status: "error",
        message: validation.message || "Invalid job data",
        id: Date.now(),
      });
      return;
    }
    const apiFormData = new FormData();
    apiFormData.append('job_title', jobData.job_title);
    apiFormData.append('job_description', jobData.job_description);
    apiFormData.append('positions_left', String(jobData.positions_left));
    createJob(apiFormData)
  };

  useEffect(() => {
    if (jobError) {
      setAlert({ status: 'error', message: jobError || 'An error occurred', id: Date.now() });
    }
    if (jobData) {
      setAlert({ status: 'success', message: 'Job created successfully.', id: Date.now() });
      setFormData({ title: "", description: "", positionLeft: "" })
      pushJobHandler(jobData as Job)
    }
  }, [jobError, jobData])

  return (
    <div className="py-4 px-3 h-fit rounded-lg shadow-sm bg-[#f3f8ff] w-[calc(100% - 48px)] sm:w-[500px]">
      <div className="flex items-center justify-between px-2 py-4">
        <h2 className="text-2xl font-bold text-primary-semi-active w-fit">New Job</h2>
        <button
          onClick={() => handleModal(false)}
          className="w-9 h-9 rounded flex items-center justify-center text-center hover:bg-[#e5edf9]"
        >
          <X className="text-primary-active text-xs" />
        </button>
      </div>
      <form className="space-y-5 max-h-[500px] overflow-y-auto px-3 mb-6" onSubmit={handleCreate}>
        {alert.status && (
          <MessageAlert
            status={alert.status}
            message={alert.message}
            id={alert.id}
          />
        )}
        <div className="space-y-2">
          <label htmlFor="title" className="text-sm font-semibold text-primary-active">
            Job Title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            placeholder="Enter title..."
            value={formData.title}
            onChange={handleChange}
            className="w-full h-12 px-4 rounded-md bg-transparent text-base text-primary-active placeholder:text-primary-semi-active border border-primary-semi-active focus:outline-none focus:border-primary-semi-active focus:ring-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="positionLeft" className="text-sm font-semibold text-primary-active">
            Position Left
          </label>
          <input
            id="positionLeft"
            name="positionLeft"
            type="number"
            value={formData.positionLeft}
            onChange={handleChange}
            className="w-full h-12 px-4 rounded-md bg-transparent text-base text-primary-active placeholder:text-primary-semi-active border border-primary-semi-active focus:outline-none focus:border-primary-semi-active focus:ring-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="description" className="text-sm font-semibold text-primary-active">
            Job Description
          </label>
          <Textarea
            id="description"
            name="description"
            placeholder="Enter description..."
            value={formData.description}
            onChange={handleChange}
            className="w-full min-h-[120px] px-4 rounded-md bg-transparent text-primary-active placeholder:text-primary-semi-active border border-primary-semi-active focus:outline-none focus:border-primary-semi-active focus:ring-1 focus:ring-primary-semi-active/40"
          />
        </div>
        <div className="space-y-4 pt-2">
          <Button
            type="submit"
            variant="outline"
            disabled={jobLoading}
            className="w-full h-12 border-primaryBlue font-semibold rounded-lg text-white-active bg-primary-semi-active hover:text-white-active hover:bg-primary-mini-active transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {jobLoading ? <ButtonLoader /> : "Create"}
          </Button>
        </div>
      </form>
    </div>
  );
};
