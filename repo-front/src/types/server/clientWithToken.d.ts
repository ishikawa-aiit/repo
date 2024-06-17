import { AxiosRequestConfig, AxiosResponse } from 'axios'

/* eslint-disable @typescript-eslint/no-explicit-any */
export type ClientWithToken = {
  get: <T = any, R = AxiosResponse<T>, D = any>(url: string, config?: AxiosRequestConfig<D>) => Promise<R>
  post: <T = any, R = AxiosResponse<T>, D = any>(url: string, data: D, config?: AxiosRequestConfig<D>) => Promise<R>
  put: <T = any, R = AxiosResponse<T>, D = any>(url: string, data: D, config?: AxiosRequestConfig<D>) => Promise<R>
  patch: <T = any, R = AxiosResponse<T>, D = any>(url: string, data: D, config?: AxiosRequestConfig<D>) => Promise<R>
  delete: <T = any, R = AxiosResponse<T>, D = any>(url: string, config?: AxiosRequestConfig<D>) => Promise<R>
}
/* eslint-enable @typescript-eslint/no-explicit-any */
