import { getAuthSessions } from "../utils/utils";

export const APIsRequest = {
  signupRequest: async (deviceId: string, data: any) => {
    const formData = new FormData();
    formData.append('firstname', data.firstname);
    formData.append('lastname', data.lastname);
    formData.append('mail', data.mail);
    formData.append('password', data.password);
    data?.file && formData.append('file', data.file);

    const headers = { 'User-Device': deviceId, 'Content-Type': 'application/json' };
    return await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/signup`, { body: formData, method: 'POST', headers });
  },

  signinRequest: async (deviceId: string, data: any) => {
    const headers = { 'User-Device': deviceId, 'Content-Type': 'application/json' };
    return await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/signin`, { body: JSON.stringify(data), method: 'POST', headers });
  },

  verifyAccountRequest: async (session: string) => {
    return await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/verify-email/${session}`, { method: 'GET' });
  },

  resetPasswordRequest: async (session: any, data: any) => {
    return await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/reset-password/${session}`, { body: JSON.stringify(data), method: 'PATCH' });
  },

  sendVerificationLinkRequest: async (deviceId: string, action: string, data: any) => {
    const headers = { 'User-Device': deviceId, 'Content-Type': 'application/json' };
    return await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/send-verification-link/${action}`, { body: JSON.stringify(data), method: 'POST', headers });
  },

	signoutRequest: async (session: string, deviceId: string) => {
		const headers =  { Authorization: `Bearer ${session}`, 'User-Device': deviceId, 'Content-Type': 'application/json' };
		return await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/signout`, { method: 'DELETE', headers });
	},

  // JOBS RELATED APIS
  createJobRequest: async (data: any) => {
    const authSessions = getAuthSessions();
    if (!authSessions) {
      throw new Error('Authentication required');
    }

    const headers = {
      'Authorization': `Bearer ${authSessions.session.access_token}`,
      'User-Device': authSessions.device,
      'Content-Type': 'application/json'
    };

    return await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/jobs`, {
      body: JSON.stringify(data),
      method: 'POST',
      headers
    });
  },

  getJobsRequest: async (token: string, deviceId: string, queryParams = {}) => {
    const authSessions = getAuthSessions();
    const headers = {
      'Authorization': `Bearer ${authSessions?.session?.access_token || ""}`,
      'User-Device': authSessions?.device || "",
      'Content-Type': 'application/json'
    };

    return await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/jobs/get-jobs`, {
      method: 'GET',
      headers
    });
  },

  getJobDetailsRequest: async (token: string, deviceId: string, jobId: string) => {
    const authSessions = getAuthSessions();
    const headers = {
      'Authorization': `Bearer ${authSessions?.session?.access_token || ""}`,
      'User-Device': authSessions?.device || "",
      'Content-Type': 'application/json'
    };

    return await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/jobs/${jobId}`, {
      method: 'GET',
      headers
    });
  },

  updateJobRequest: async (token: string, deviceId: string, jobId: string, data: any) => {
    const authSessions = getAuthSessions();
    const headers = {
      'Authorization': `Bearer ${authSessions?.session?.access_token || ""}`,
      'User-Device': authSessions?.device || "",
      'Content-Type': 'application/json'
    };
    return await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/jobs/${jobId}`, {
      body: JSON.stringify(data),
      method: 'PATCH',
      headers
    });
  },

  deleteJobRequest: async (token: string, deviceId: string, jobId: string) => {
    const authSessions = getAuthSessions();
    const headers = {
      'Authorization': `Bearer ${authSessions?.session?.access_token || ""}`,
      'User-Device': authSessions?.device || "",
      'Content-Type': 'application/json'
    };
    return await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/jobs/${jobId}`, {
      method: 'DELETE',
      headers
    });
  },

  // CANDIDATES RELATED APIS
  getCandidatesRequest: async (token: string, deviceId: string, queryParams = {}) => {
    const authSessions = getAuthSessions();
    const headers = {
      'Authorization': `Bearer ${authSessions?.session?.access_token || ""}`,
      'User-Device': authSessions?.device || "",
      'Content-Type': 'application/json'
    };
    const queryString = new URLSearchParams(queryParams).toString();
    return await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/candidates?${queryString}`, {
      method: 'GET',
      headers
    });
  },

  getCandidateDetailsRequest: async (token: string, deviceId: string, candidateId: string) => {
    const authSessions = getAuthSessions();
    const headers = {
      'Authorization': `Bearer ${authSessions?.session?.access_token || ""}`,
      'User-Device': authSessions?.device || "",
      'Content-Type': 'application/json'
    };
    return await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/candidates/${candidateId}`, {
      method: 'GET',
      headers
    });
  },

  updateCandidateRequest: async (token: string, deviceId: string, candidateId: string, data: any) => {
    const authSessions = getAuthSessions();
    const headers = {
      'Authorization': `Bearer ${authSessions?.session?.access_token || ""}`,
      'User-Device': authSessions?.device || "",
      'Content-Type': 'application/json'
    };
    return await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/candidates/${candidateId}`, {
      body: JSON.stringify(data),
      method: 'PATCH',
      headers
    });
  },
};
