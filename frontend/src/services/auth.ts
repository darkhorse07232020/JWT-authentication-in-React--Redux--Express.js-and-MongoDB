import axios, { apiUrl } from './axiosConfig';

export function loginAPI(data: UserInfo) {
  return axios.post(`${apiUrl}/auth/login`, data);
}

export function autoLoginAPI() {
  return axios.post(`${apiUrl}/auth/autologin`);
}

export function registerAPI(data: UserInfo) {
  return axios.post(`${apiUrl}/auth/register`, data);
}

export function requestVerify(email: string) {
  return axios.post(`${apiUrl}/auth/confirm/request`, { email });
}

export function verifyUser(code: string) {
  return axios.get(`${apiUrl}/auth/confirm/${code}`);
}

export function requestReset(data: { email: string }) {
  return axios.post(`${apiUrl}/auth/reset/request`, data);
}

export function resetPassword(code: string, password: string) {
  return axios.get(`${apiUrl}/auth/reset/${code}/${password}`);
}

export function signInWithGoogle(data: UserInfo) {
  return axios.post(`${apiUrl}/auth/login/google`, data);
}
