import { AxiosResponse, AxiosError } from 'axios'
import { StatusCodes } from 'http-status-codes'
import { useRouter } from 'next/router'
import { useMutation } from 'react-query'

import { showToastOutOfService } from '@/components/molecules'
import { useClientWithToken } from '@/hooks'
import { ApiAuthTypes, ClientWithToken } from '@/types'

/**
 * リダイレクト用URLを取得
 * @returns リダイレクト用URL
 */
const postAuthRedirect = async (req: ApiAuthTypes.RedirectRequest, client: ClientWithToken) => {
  const { data } = await client.post<ApiAuthTypes.RedirectRequest, AxiosResponse<ApiAuthTypes.RedirectResponse>>(
    '/api/auth/redirect',
    req,
  )

  return data
}

/**
 * リダイレクト用URLを取得するカスタムフック
 */
export const usePostAuthRedirect = () => {
  const client = useClientWithToken()
  const router = useRouter()

  const { data, mutate } = useMutation<
    ApiAuthTypes.RedirectResponse,
    AxiosError,
    ApiAuthTypes.RedirectRequest,
    ApiAuthTypes.RedirectResponse
  >(
    (req) => {
      return postAuthRedirect(req, client)
    },
    {
      onSuccess: (result) => {
        router.push(result.url)
      },
      onError: (error) => {
        if (error.response?.status !== StatusCodes.UNAUTHORIZED) {
          showToastOutOfService()
        }
      },
    },
  )

  return { data, mutate }
}
