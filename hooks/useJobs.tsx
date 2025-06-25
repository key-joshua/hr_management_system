import { useApi } from './useApi';
import { APIsRequest } from '@/libs/requestAPIs/requestAPIs';

export interface Job {
  _id: string;
  job_title: string;
  job_description: string;
  interviewed: number;
  positions_left: number;
  applications: number;
  rejections: number;
  pending_feedback: number;
  offers: number;
}

export function useJobs() {
  const { data, loading, error, callApi } = useApi<Job[] | Job>();

  const createJob = async (jobData: FormData) => {
    return await callApi(APIsRequest.createJobRequest as any, jobData);
  };

  const getJobs = async () => {
    return await callApi(APIsRequest.getJobsRequest as any);
  };
  const updateJob = async (jobId: string, data: Omit<Job, '_id'>) => {
    return await callApi(APIsRequest.updateJobRequest as any, jobId, data);
  };

  return {
    data,
    loading,
    error,
    createJob,
    updateJob,
    getJobs
  };
}
