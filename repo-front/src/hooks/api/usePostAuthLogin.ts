import { AxiosResponse, AxiosError } from 'axios'
import { StatusCodes } from 'http-status-codes'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useMutation } from 'react-query'
import { useRecoilState } from 'recoil'

import { showToastOutOfService } from '@/components/molecules'
import { apiToken } from '@/contexts'
import { useClientWithToken } from '@/hooks'
import { ApiAuthTypes, ClientWithToken } from '@/types'

/**
 * API認証用情報を取得
 * @returns API認証用情報
 */
const postAuthLogin = async (req: ApiAuthTypes.LoginRequest, client: ClientWithToken) => {
  const { data } = await client.post<ApiAuthTypes.LoginRequest, AxiosResponse<ApiAuthTypes.LoginSuccessfulResponse>>(
    '/api/auth/login',
    req,
  )

  return data
}

/**
 * API認証用情報を取得するカスタムフック
 */
export const usePostAuthLogin = () => {
  const client = useClientWithToken()
  const router = useRouter()
  const [_, setApiToken] = useRecoilState(apiToken)

  const { data, mutate } = useMutation<
    ApiAuthTypes.LoginSuccessfulResponse,
    AxiosError,
    ApiAuthTypes.LoginRequest,
    ApiAuthTypes.LoginSuccessfulResponse
  >(
    (req) => {
      return postAuthLogin(req, client)
    },
    {
      onSuccess: async (data) => {
        setApiToken(data.token)
        await router.push('/weekly-reports/create')
      },
      onError: async (error) => {
        if (error.response?.status !== StatusCodes.UNAUTHORIZED) {
          showToastOutOfService()
        }
        await router.push('/')
      },
    },
  )

  useEffect(() => {
    if (!router.isReady) {
      return
    }

    if (Object.keys(router.query).length !== 0 && router.query.code) {
      const req: ApiAuthTypes.LoginRequest = {
        code: router.query.code as string,
      }
      mutate(req)
    }

    // mutateは依存関係以外なので、静的検証から外します
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router, router.isReady])

  return { data, mutate }
}
