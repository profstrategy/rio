import { API_URL } from '@/environment-config'
import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import { getSession, signOut } from 'next-auth/react'
const axiosInstance = axios.create({
    baseURL: API_URL,
    timeout: 30000,
    headers: {
        'Content-Type': 'application/json',
    }
})

// request interceptor
axiosInstance.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
        const session = await getSession();
        const token = session?.user.accessToken;

        if (token) {
           config.headers.set('Authorization', `Bearer ${token}`);
        }
        return config
    },
    (error: AxiosError) => {
    console.error('Request interceptor error:', error.message);
    return Promise.reject(error);
  }
)

// Response interceptor
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    // Handle successful responses
    if (response?.data) {
      return response;
    }
    return response;
  },
  (error: AxiosError) => {
    // Handle errors
    if (error.response) {
      // Server responded with error status
      console.error(
        'Response error:',
        error.response.status,
        error.response.data
      );

      // Handle 401 Unauthorized errors
      if (error.response.status === 401) {
        signOut({ callbackUrl: '/' });
      }
    } else if (error.request) {
      // Request made but no response received
      console.error('Request error:', error.request);
      if (error.code === 'ECONNREFUSED') {
        console.error(
          'Connection refused. Please check if the server is running and accessible.'
        );
      }
    } else {
      // Error in request setup
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);
export default axiosInstance;