
import { twMerge } from "tailwind-merge"
import { type ClassValue, clsx } from "clsx"

export const encrypt = (data: string) => {
  try {
    return btoa(data);
  } catch (error: unknown) {
    window.location.replace("/");
    return String(error);
  }
};

export const decrypt = (data: string) => {
  try {
    return atob(data);
  } catch (error: unknown) {
    window.location.replace("/");
    return String(error);
  }
};

export const generateDeviceId = (digits = 12) => {
  const deviceId = Math.random().toString(36).substr(2, 16);
  localStorage.setItem("user_device", encrypt(deviceId));
  return deviceId.slice(0, digits);
};

export const authVerify = async () => {
  try {
    const userDevice = localStorage.getItem("user_device");
    const authSessionData = localStorage.getItem("auth_session_data");

    if (!authSessionData) {
      localStorage.clear();
      window.location.replace("/");
      return;
    }

    if (!userDevice) {
      localStorage.clear();
      window.location.replace("/");
      return;
    }

    const decryptedAuthSessionData = decrypt(authSessionData);
    if (!decryptedAuthSessionData) {
      localStorage.clear();
      window.location.replace("/");
      return;
    }

    const parsedAuthSessionData = JSON.parse(decryptedAuthSessionData);
    const { access_token } = parsedAuthSessionData?.session;

    const decryptedUserDevice = decrypt(userDevice);
    const headers: any = { Authorization: access_token };
    if (decryptedUserDevice) headers["User-Device"] = decryptedUserDevice;

    const response = await fetch('/api/auth-verify-data', { method: 'GET', headers });
    if (!response.ok) {
      localStorage.clear();
      window.location.replace("/");
      return;
    }

    const data = await response.json();
    if (!data?.success) {
      localStorage.clear();
      window.location.replace("/");
      return;
    }

    localStorage.setItem("auth_session_data", encrypt(JSON.stringify(data?.data)));
    return { administration: data?.data?.administration, session: data?.data?.session };
  } catch (error: any) {
    console.log(error);
    localStorage.clear();
    window.location.replace("/");
  }
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
};

export function signupValidation(formData: { file: File | null; firstname: string; lastname: string; email: string; password: string; confirmPassword: string; }): { error: boolean; field?: string; message?: string } {
  const { file, firstname, lastname, email, password, confirmPassword } = formData;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9]).{8,}$/;

  if (!file) {
    return { error: true, field: 'file', message: 'Profile picture is required' };
  }

  if (!firstname.trim()) {
    return { error: true, field: 'firstname', message: 'First name is required' };
  }

  if (!lastname.trim()) {
    return { error: true, field: 'lastname', message: 'Last name is required' };
  }

  if (!email.trim()) {
    return { error: true, field: 'email', message: 'Email is required' };
  }

  if (!emailRegex.test(email.trim())) {
    return { error: true, field: 'email', message: 'Invalid email format' };
  }

  if (!password.trim()) {
    return { error: true, field: 'password', message: 'Password is required' };
  }

  if (!passwordRegex.test(password.trim())) {
    return { error: true, field: 'password', message: 'Password must be at least 8 characters long and include uppercase, lowercase, number, and special character (e.g., Qwerty@123).', };
  }

  if (!confirmPassword.trim()) {
    return { error: true, field: 'confirmPassword', message: 'Confirm password is required' };
  }

  if (password !== confirmPassword) {
    return { error: true, field: 'confirmPassword', message: 'Passwords do not match' };
  }

  return { error: false };
};

export function signinValidation(formData: { email: string; password: string }): { error: boolean; field?: string; message?: string } {
  const { email, password } = formData;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9]).{8,}$/;

  if (!email.trim()) {
    return { error: true, field: 'email', message: 'Email is required' };
  }

  if (!emailRegex.test(email.trim())) {
    return { error: true, field: 'email', message: 'Invalid email format' };
  }

  if (!password.trim()) {
    return { error: true, field: 'password', message: 'Password is required' };
  }

  if (!passwordRegex.test(password.trim())) {
    return { error: true, field: 'password', message: 'Password must be at least 8 characters long and include uppercase, lowercase, number, and special character (e.g., Qwerty@123).', };
  }

  return { error: false };
};

export function resetPasswordValidation(formData: { password: string; confirmPassword: string; }): { error: boolean; field?: string; message?: string } {
  const { password, confirmPassword } = formData;

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9]).{8,}$/;

  if (!password.trim()) {
    return { error: true, field: 'password', message: 'Password is required' };
  }

  if (!passwordRegex.test(password.trim())) {
    return { error: true, field: 'password', message: 'Password must be at least 8 characters long and include uppercase, lowercase, number, and special character (e.g., Qwerty@123).', };
  }

  if (!confirmPassword.trim()) {
    return { error: true, field: 'confirmPassword', message: 'Confirm password is required', };
  }

  if (password !== confirmPassword) {
    return { error: true, field: 'confirmPassword', message: 'Passwords do not match', };
  }

  return { error: false };
}

export function EmailValidation(formData: { email: string; }): { error: boolean; field?: string; message?: string } {
  const { email } = formData;

  const trimmedEmail = email.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!trimmedEmail) {
    return { error: true, field: 'email', message: 'Email is required', };
  }

  if (trimmedEmail.length < 4) {
    return { error: true, field: 'email', message: 'Email should have at least 4 characters', };
  }

  if (!emailRegex.test(trimmedEmail)) {
    return { error: true, field: 'email', message: 'Invalid email format', };
  }

  return { error: false };
}
