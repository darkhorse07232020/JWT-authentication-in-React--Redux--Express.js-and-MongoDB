import axios, { apiUrl } from './axiosConfig';

export default function register() {
  return axios.get(`${apiUrl}/user/get`);
}
