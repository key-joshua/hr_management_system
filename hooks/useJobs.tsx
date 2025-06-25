import { useApi } from './useApi';
import { APIsRequest } from '@/libs/requestAPIs/requestAPIs';

interface Job {
  id: string;
  title: string;
  description: string;
}

export function useJobs() {
  const { data, loading, error, callApi } = useApi<Job[] | Job>();

  const createJob = async (jobData: Omit<Job, 'id'>) => {
    return await callApi(APIsRequest.createJobRequest as any, jobData);
  };

  const getJobs = async () => {
    return await callApi(APIsRequest.getJobsRequest as any);
  };

  return {
    data,
    loading,
    error,
    createJob,
    getJobs
  };
}
