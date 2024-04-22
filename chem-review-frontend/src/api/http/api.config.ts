import axios, { type AxiosInstance } from 'axios';

const fallbackUrl = import.meta.env.VITE_BACK_URL ?? 'http://localhost:3000';

const createHttpInstance = (baseUrl?: string): AxiosInstance => {
    const config = {
        baseURL: baseUrl ?? fallbackUrl,
    };
    const instanse = axios.create(config);
    instanse.defaults.headers.authorization = `Bearer ${localStorage.getItem('token')}`;
    return instanse
};

export { createHttpInstance };
