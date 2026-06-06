import { BASE_URL } from '@/lib/definitions';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import Cookies from 'js-cookie';

const axiosInstance = axios.create({
    baseURL: `${BASE_URL}/api/v1`,
    withCredentials: true,
    // headers: {
    //     'ngrok-skip-browser-warning': 'any',
    // },
});

export const request = async (options: AxiosRequestConfig) => {
    const token = Cookies.get('token');
    if (token) {
        axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
    }

    const onSuccess = (response: AxiosResponse) => response;
    const onError = (error: any) => {
        if (!error.response) {
            return Promise.reject({
                status: null,
                message: 'Network error. Please try again after sometime',
            });
        }
        if (error?.response?.status === 401) {
            Cookies.remove('token');
            if (typeof window !== 'undefined') window.location.href = '/login';
        }
        return Promise.reject(error?.response);
    };

    return axiosInstance(options).then(onSuccess).catch(onError);
};

export const getRequest = (endpoint: string) =>
    request({ method: 'GET', url: endpoint });

export const postRequest = <T>(endpoint: string, data?: T, config?: AxiosRequestConfig) =>
    request({ method: 'POST', url: endpoint, data, ...config });

export const putRequest = <T>(endpoint: string, data?: T) =>
    request({ method: 'PUT', url: endpoint, data });

export const deleteRequest = (endpoint: string) =>
    request({ method: 'DELETE', url: endpoint });
