import axios, { AxiosResponse } from 'axios';

// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
export const API_URL = process.env.REACT_APP_API_URL;
// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
export const apiUrl = `${API_URL}/api`;

axios.interceptors.request.use(
  (config: any) => {
    const { origin } = new URL(config.url as string);
    const allowedOrigins = [API_URL];
    const token = localStorage.getItem('token');

    if (token && allowedOrigins.includes(origin)) {
      config.headers['x-auth-token'] = token;
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (res: AxiosResponse) => res,
  (err: any) => {
    if (err.message === 'Network Error' && !err.response && window.location.pathname !== '/server-error') {
      // window.location.href = '/server-error';
    } else {
      throw err;
    }
  }
);

export default axios;
