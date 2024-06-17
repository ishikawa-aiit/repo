import axios, { AxiosRequestConfig } from 'axios'

const config: AxiosRequestConfig = {
  withCredentials: true,
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json',
  },
}

/**
 * APIクライアント（axios）
 */
export const axiosClient = axios.create(config)
