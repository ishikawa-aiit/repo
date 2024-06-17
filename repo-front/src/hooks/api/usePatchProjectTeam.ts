import { AxiosResponse, AxiosError } from 'axios'
import { StatusCodes } from 'http-status-codes'
import { useMutation, useQueryClient } from 'react-query'
import { useRecoilState } from 'recoil'

import { showToastOutOfService, showToastUnauthorized, toast } from '@/components/molecules'
import { UserTypes } from '@/components/types'
import { user as userState } from '@/contexts/global/atoms/User'
import { useClientWithToken } from '@/hooks/server/useClientWithToken'
import { ApiPatchMySettingTypes, ClientWithToken, QueryKeys } from '@/types'

const patchProjectTeam = async (req: ApiPatchMySettingTypes.Request, client: ClientWithToken) => {
  const { data } = await client.patch<ApiPatchMySettingTypes.Request, AxiosResponse<ApiPatchMySettingTypes.Response>>(
    '/api/users/my-setting',
    req,
  )

  return data
}

/**
 * 所属PTを更新するカスタムフック
 */
export const usePatchProjectTeam = () => {
  const queryClient = useQueryClient()
  const client = useClientWithToken()
  const [user, setUser] = useRecoilState(userState)

  const { mutate, isLoading } = useMutation<
    ApiPatchMySettingTypes.Response,
    AxiosError,
    ApiPatchMySettingTypes.Request,
    UserTypes.User
  >(
    (req) => {
      return patchProjectTeam(req, client)
    },
    {
      onSuccess: (result) => {
        const updatedUser = {
          ...user,
          team: result.data.team,
        } as UserTypes.User

        queryClient.setQueryData<UserTypes.User>(QueryKeys.GET_ME, updatedUser)

        toast({
          status: 'success',
          title: '所属PTを設定しました。',
        })
      },
      onError: (error, _request) => {
        if (error.response?.status === StatusCodes.UNAUTHORIZED) {
          showToastUnauthorized()
        } else {
          showToastOutOfService()
        }

        setUser(user)
      },
    },
  )

  return { mutate, isLoading }
}
