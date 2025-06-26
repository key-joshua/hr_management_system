"use client";

import React, { FormEvent, useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { X } from "lucide-react";
import { Textarea } from "./ui/textarea";
import { useJobs } from "@/hooks/useJobs";
import MessageAlert from "./messageAlert";
import { ButtonLoader } from "./Loader";
import { Job } from "@/hooks/useJobs";
import { validateJob } from "@/libs/utils/job-validations";

interface EditJobProps {
  updateJobs: (jobData: Job) => void;
  handleModal: (action: boolean) => void;
  job: Job;
}

export const EditJob: React.FC<EditJobProps> = ({ updateJobs, handleModal, job }) => {
  const [formData, setFormData] = useState({
    job_title: job?.job_title,
    job_description: job?.job_description,
    positions_left: job?.positions_left.toString(),
    interviewed: job?.interviewed.toString(),
    applications: job?.applications.toString(),
    rejections: job?.rejections.toString(),
    pending_feedback: job?.pending_feedback.toString(),
    offers: job?.offers.toString(),
  });

  const [alert, setAlert] = useState<{ status: "success" | "error" | ""; message: string; id: number }>({
    status: "",
    message: "",
    id: 0,
  });

  const { loading: jobLoading, error: jobError, data: jobData, updateJob } = useJobs();

  const formRef = useRef<HTMLFormElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e: FormEvent) => {
    e.preventDefault();
    formRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    setAlert({ status: "", message: "", id: 0 });

    const jobUpdateData = {
      job_title: formData?.job_title.trim(),
      job_description: formData?.job_description.trim(),
      positions_left: Number(formData?.positions_left),
      interviewed: Number(formData?.interviewed),
      applications: Number(formData?.applications),
      rejections: Number(formData?.rejections),
      pending_feedback: Number(formData?.pending_feedback),
      offers: Number(formData?.offers),
    };

    const validation = validateJob(jobUpdateData, { validateAllFields: true });
    if (!validation.isValid) {
      setAlert({
        status: "error",
        message: validation.message || "Invalid job data",
        id: Date.now(),
      });
      return;
    }

    await updateJob(job._id, jobUpdateData);
  };

  useEffect(() => {
    if (jobError) {
      setAlert({ status: "error", message: jobError || "An error occurred", id: Date.now() });
    }
    if (jobData) {
      updateJobs(jobData as Job)
      setAlert({ status: "success", message: "Job updated successfully.", id: Date.now() });
    }
  }, [jobError, jobData, updateJobs]);

  return (
    <div className="py-4 px-3 h-fit rounded-lg shadow-sm bg-[#f3f8ff] w-[calc(100% - 48px)] sm:w-[500px]">
      <div className="flex items-center justify-between px-2 py-4">
        <h2 className="text-2xl font-bold text-primary-semi-active w-fit">Edit Job</h2>
        <button
          onClick={() => handleModal(false)}
          className="w-9 h-9 rounded flex items-center justify-center text-center hover:bg-[#e5edf9]"
        >
          <X className="text-primary-active text-xs" />
        </button>
      </div>
      <form ref={formRef} className="space-y-5 max-h-[500px] overflow-y-auto px-3 mb-6" onSubmit={handleUpdate}>
        {alert.status && <MessageAlert status={alert.status} message={alert.message} id={alert.id} />}

        <div className="space-y-2">
          <label htmlFor="job_title" className="text-sm font-semibold text-primary-active">
            Job Title
          </label>
          <input
            id="job_title"
            name="job_title"
            type="text"
            placeholder="Enter title..."
            value={formData.job_title}
            onChange={handleChange}
            className="w-full h-12 px-4 rounded-md bg-transparent text-base text-primary-active placeholder:text-primary-semi-active border border-primary-semi-active focus:outline-none focus:border-primary-semi-active focus:ring-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="job_description" className="text-sm font-semibold text-primary-active">
            Job Description
          </label>
          <Textarea
            id="job_description"
            name="job_description"
            placeholder="Enter description..."
            value={formData.job_description}
            onChange={handleChange}
            className="w-full min-h-[120px] px-4 rounded-md bg-transparent text-primary-active placeholder:text-primary-semi-active border border-primary-semi-active focus:outline-none focus:border-primary-semi-active focus:ring-1 focus:ring-primary-semi-active/40"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="positions_left" className="text-sm font-semibold text-primary-active">
            Positions Left
          </label>
          <input
            id="positions_left"
            name="positions_left"
            type="number"
            value={formData.positions_left}
            onChange={handleChange}
            className="w-full h-12 px-4 rounded-md bg-transparent text-base text-primary-active placeholder:text-primary-semi-active border border-primary-semi-active focus:outline-none focus:border-primary-semi-active focus:ring-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="applications" className="text-sm font-semibold text-primary-active">
            Applications
          </label>
          <input
            id="applications"
            name="applications"
            type="number"
            value={formData.applications}
            onChange={handleChange}
            className="w-full h-12 px-4 rounded-md bg-transparent text-base text-primary-active placeholder:text-primary-semi-active border border-primary-semi-active focus:outline-none focus:border-primary-semi-active focus:ring-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="interviewed" className="text-sm font-semibold text-primary-active">
            Interviewed
          </label>
          <input
            id="interviewed"
            name="interviewed"
            type="number"
            value={formData.interviewed}
            onChange={handleChange}
            className="w-full h-12 px-4 rounded-md bg-transparent text-base text-primary-active placeholder:text-primary-semi-active border border-primary-semi-active focus:outline-none focus:border-primary-semi-active focus:ring-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="rejections" className="text-sm font-semibold text-primary-active">
            Rejections
          </label>
          <input
            id="rejections"
            name="rejections"
            type="number"
            value={formData.rejections}
            onChange={handleChange}
            className="w-full h-12 px-4 rounded-md bg-transparent text-base text-primary-active placeholder:text-primary-semi-active border border-primary-semi-active focus:outline-none focus:border-primary-semi-active focus:ring-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="pending_feedback" className="text-sm font-semibold text-primary-active">
            Pending Feedback
          </label>
          <input
            id="pending_feedback"
            name="pending_feedback"
            type="number"
            value={formData.pending_feedback}
            onChange={handleChange}
            className="w-full h-12 px-4 rounded-md bg-transparent text-base text-primary-active placeholder:text-primary-semi-active border border-primary-semi-active focus:outline-none focus:border-primary-semi-active focus:ring-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="offers" className="text-sm font-semibold text-primary-active">
            Offers
          </label>
          <input
            id="offers"
            name="offers"
            type="number"
            value={formData.offers}
            onChange={handleChange}
            className="w-full h-12 px-4 rounded-md bg-transparent text-base text-primary-active placeholder:text-primary-semi-active border border-primary-semi-active focus:outline-none focus:border-primary-semi-active focus:ring-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          />
        </div>

        <div className="space-y-4 pt-2">
          <Button
            type="submit"
            variant="outline"
            disabled={jobLoading}
            className="w-full h-12 border-primaryBlue font-semibold rounded-lg text-white-active bg-primary-semi-active hover:text-white-active hover:bg-primary-mini-active transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {jobLoading ? <ButtonLoader /> : "Update Job"}
          </Button>
        </div>
      </form>
    </div>
  );
};
