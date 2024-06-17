import { AxiosError, AxiosResponse } from 'axios'
import { StatusCodes } from 'http-status-codes'
import { useQuery } from 'react-query'

import { showToastOutOfService } from '@/components/molecules'
import { SettingTypes } from '@/components/types'
import { useClientWithToken } from '@/hooks/server/useClientWithToken'
import { ApiGetTeamsTypes, ClientWithToken, QueryKeys } from '@/types'

/**
 * プロジェクトチーム一覧を取得
 */
const getProjectTeams = async (client: ClientWithToken): Promise<SettingTypes.ProjectTeamsProps> => {
  const { data } = await client.get<AxiosResponse<ApiGetTeamsTypes.Response, AxiosError>>('/api/teams')

  const teams = data.data.map(({ id, name }) => {
    return {
      id,
      name,
    }
  }) as SettingTypes.ProjectTeamsProps

  return [{ id: null, name: 'PT未所属' }, ...teams]
}

/**
 * 所属PTを表示するカスタムフック
 */
export const useGetProjectTeams = () => {
  const client = useClientWithToken()

  const { data: projectTeams = [] } = useQuery<SettingTypes.ProjectTeamsProps, AxiosError>(
    QueryKeys.GET_TEAMS,
    async () => {
      return await getProjectTeams(client)
    },
    {
      onError: (error) => {
        if (error.response?.status !== StatusCodes.UNAUTHORIZED) {
          showToastOutOfService()
        }
      },
    },
  )

  return {
    projectTeams,
  }
}
