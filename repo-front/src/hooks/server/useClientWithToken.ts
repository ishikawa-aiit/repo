import { AxiosRequestConfig } from 'axios'
import { useRecoilState } from 'recoil'

import { apiToken, axiosClient } from '@/contexts'
import { ClientWithToken } from '@/types/server/clientWithToken'

/**
 * 認証用トークンを付与して HTTP リクエストを送信するクライアント
 *
 * @remarks
 * axios のラッパーです。 axios と同じインターフェースで動きます。
 */
export const useClientWithToken = () => {
  const [token] = useRecoilState(apiToken)

  const addApiToken = <D>(config: AxiosRequestConfig<D> = {}): AxiosRequestConfig<D> => {
    if (!config.headers) {
      config.headers = {}
    }

    if (config.headers.Authorization) {
      throw new Error('Authorized header is already set.')
    }

    if (token !== undefined) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  }

  const client: ClientWithToken = {
    get: <T, R, D>(url: string, config?: AxiosRequestConfig<D>) => {
      return axiosClient.get<T, R, D>(url, addApiToken<D>(config))
    },
    post: <T, R, D>(url: string, data: D, config?: AxiosRequestConfig<D>) => {
      return axiosClient.post<T, R, D>(url, data, addApiToken<D>(config))
    },
    put: <T, R, D>(url: string, data: D, config?: AxiosRequestConfig<D>) => {
      return axiosClient.put<T, R, D>(url, data, addApiToken<D>(config))
    },
    patch: <T, R, D>(url: string, data: D, config?: AxiosRequestConfig<D>) => {
      return axiosClient.patch<T, R, D>(url, data, addApiToken<D>(config))
    },
    delete: <T, R, D>(url: string, config?: AxiosRequestConfig<D>) => {
      return axiosClient.delete<T, R, D>(url, addApiToken<D>(config))
    },
  }

  return client
}
