export const APIsRequest = {
  signupRequest: async (deviceId: string, data: any) => {
    data.confirmPassword && delete data.confirmPassword;

    const formData = new FormData();
    formData.append('email', data.email);
    formData.append('is_google', data.is_google);
    data?.file && formData.append('file', data.file);
    data.username && formData.append('username', data.username);
    data.password && formData.append('password', data.password);

    const headers =  { 'User-Device': deviceId };
	  return await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/signup`, { body: formData, method: 'POST', headers });
  },

  signinRequest: async (deviceId: string, data: any) => {
    const headers =  { 'User-Device': deviceId, 'Content-Type': 'application/json' };
    return await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/signin`, { body: JSON.stringify(data), method: 'POST', headers });
  },

  verifyAccountRequest: async (session: string) => {
    return await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/verify-email/${session}`, { method: 'GET' });
  },

  resetPasswordRequest: async (session: any,  data: any) => {
    data.confirmPassword && delete data.confirmPassword;
    const headers =  { 'Content-Type': 'application/json' };
    return await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/reset-password/${session}`, { body: JSON.stringify(data), method: 'PATCH' , headers});
  },

  sendVerificationLinkRequest: async (deviceId: string, action: string, data: any) => {
    const headers =  { 'User-Device': deviceId, 'Content-Type': 'application/json' };
    return await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/send-verification-link/${action}`, { body: JSON.stringify(data), method: 'POST', headers });
  },
};