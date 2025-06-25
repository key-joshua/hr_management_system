import { useState } from 'react';
import { APIsRequest } from '@/libs/requestAPIs/requestAPIs';

export interface ApiResponse<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

type FetchResponse<T> = Promise<Response> & {
  json(): Promise<{ data?: T; error?: string; message?: string }>;
};

export function useApi<T>() {
  const [state, setState] = useState<ApiResponse<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const callApi = async (apiFunction: (...args: any[]) => FetchResponse<T>, ...args: any[]) => {
    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const response = await apiFunction(...args);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || errorData.message || 'Request failed');
      }

      const result = await response.json();
      setState({
        data: result.data || result,
        loading: false,
        error: null
      });
      return result;
    } catch (error: any) {
      const errorMessage = error.message || 'An error occurred';
      setState({
        data: null,
        loading: false,
        error: errorMessage,
      });
      throw error;
    }
  };

  return { ...state, callApi };
}
