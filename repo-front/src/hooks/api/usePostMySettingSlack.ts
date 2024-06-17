import { AxiosResponse, AxiosError } from 'axios'
import { StatusCodes } from 'http-status-codes'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useMutation } from 'react-query'

import { showToastOutOfService, showToastSettingSuccess, showToastCancelSetting } from '@/components/molecules'
import { useClientWithToken } from '@/hooks'
import { ApiAuthTypes, ClientWithToken } from '@/types'

/**
 * API認証用情報を取得
 * @returns API認証用情報
 */
const postMySettingSlack = async (req: ApiAuthTypes.LoginRequest, client: ClientWithToken) => {
  const { data } = await client.post<ApiAuthTypes.LoginRequest, AxiosResponse<StatusCodes>>(
    '/api/users/my-setting/slack',
    req,
  )

  return data
}

/**
 * API認証用情報を取得するカスタムフック
 */
export const usePostMySettingSlack = () => {
  const client = useClientWithToken()
  const router = useRouter()

  const { data, mutate } = useMutation<StatusCodes, AxiosError, ApiAuthTypes.LoginRequest>(
    (req) => {
      return postMySettingSlack(req, client)
    },
    {
      onSuccess: async () => {
        showToastSettingSuccess()
        await router.push('/setting')
      },
      onError: async () => {
        showToastOutOfService()
        await router.push('/setting')
      },
    },
  )

  useEffect(() => {
    if (!router.isReady) {
      return
    }

    if (Object.keys(router.query).length !== 0) {
      if (router.query.code) {
        const req: ApiAuthTypes.LoginRequest = {
          code: router.query.code as string,
        }
        mutate(req)
      } else {
        ;(async () => {
          showToastCancelSetting()
          await router.push('/setting')
        })()
      }
    }

    // mutateは依存関係以外なので、静的検証から外します
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router, router.isReady])

  return { data, mutate }
}
