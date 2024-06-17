import { AxiosError, AxiosResponse } from 'axios'
import { StatusCodes } from 'http-status-codes'
import { useRouter } from 'next/router'
import { useQuery, useQueryClient } from 'react-query'

import { showToastOutOfService, showToastUnauthorized } from '@/components/molecules'
import { UserTypes } from '@/components/types/user'
import { useClientWithToken } from '@/hooks/server/useClientWithToken'
import { ClientWithToken, QueryKeys, ApiUsersTypes } from '@/types'

/**
 * ログインしているユーザ情報を取得
 * @returns ユーザ
 */
const getMe = async (client: ClientWithToken): Promise<UserTypes.User> => {
  const { data } = await client.get<AxiosResponse<ApiUsersTypes.User, AxiosError>>('/api/users/me')

  return data.data
}

/**
 * ログインしているユーザ情報を取得するカスタムフック
 */
export const useGetMe = () => {
  const client = useClientWithToken()
  const queryClient = useQueryClient()
  const router = useRouter()

  const {
    data: me,
    isLoading,
    isError,
  } = useQuery<UserTypes.User, AxiosError>(
    QueryKeys.GET_ME,
    async () => {
      await queryClient.invalidateQueries(QueryKeys.GET_WEEKLY_REPORTS)

      return await getMe(client)
    },
    {
      cacheTime: 2 * 60 * 60 * 1000, // キャッシュ時間を2時間に設定する
      onError: (error) => {
        if (error.response?.status === StatusCodes.UNAUTHORIZED) {
          showToastUnauthorized()
          router.push('/')
        } else {
          showToastOutOfService()
        }
      },
    },
  )

  return {
    me,
    isLoading,
    isError,
  }
}
