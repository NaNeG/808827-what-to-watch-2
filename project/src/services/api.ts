import axios, {AxiosError, AxiosRequestConfig, AxiosResponse} from 'axios';
import { getToken } from './token';
import {StatusCodes} from 'http-status-codes';
import { processErrorHandle } from './process-error-handle';

const StatusCodeMapping: Record<number, boolean> = {
  [StatusCodes.BAD_REQUEST]: true,
  [StatusCodes.UNAUTHORIZED]: true,
  [StatusCodes.NOT_FOUND]: true
};

const shouldDisplayError = (response: AxiosResponse) => !!StatusCodeMapping[response.status];

const BASE_URL = 'https://10.react.pages.academy/wtw';
const TIMEOUT = 5000;


export const createApi = () => {
  const api = axios.create({
    baseURL: BASE_URL,
    timeout: TIMEOUT,
  });

  api.interceptors.request.use((config: AxiosRequestConfig) => {
    const token = getToken();
    if (token) {
      config.headers['x-token'] = token;
    }
    return config;
  });

  api.interceptors.response.use(((res) => res), (error: AxiosError) => {
    if (error.response && shouldDisplayError(error.response)) {
      processErrorHandle(error.response.data.error);
    }

    throw error;
  });

  return api;
};
