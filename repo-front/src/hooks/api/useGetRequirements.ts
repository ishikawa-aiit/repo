import { AxiosError, AxiosResponse } from 'axios'
import { StatusCodes } from 'http-status-codes'
import { useQuery } from 'react-query'

import { showToastOutOfService } from '@/components/molecules'
import { RequirementTypes } from '@/components/types'
import { useClientWithToken } from '@/hooks/server/useClientWithToken'
import { ApiRequirementTypes, ClientWithToken, QueryKeys } from '@/types'

/**
 * 報告要件リストを取得
 */
const getRequirements = async (client: ClientWithToken): Promise<RequirementTypes.RequirementProps[]> => {
  const { data } = await client.get<AxiosResponse<ApiRequirementTypes.Requirements, AxiosError>>(
    '/api/weekly-reports/requirements',
  )

  const requirements = data.data.map(({ id, targetDuration, submissionDuration }) => {
    return {
      id,
      targetDuration,
      submissionDuration,
    }
  }) as RequirementTypes.RequirementProps[]

  return [...requirements]
}

/**
 * 報告要件リストを表示するカスタムフック
 */
export const useGetRequirements = () => {
  const client = useClientWithToken()

  const { data: requirements = [] } = useQuery<RequirementTypes.RequirementProps[], AxiosError>(
    QueryKeys.GET_REQUIREMENTS,
    async () => {
      return await getRequirements(client)
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
    requirements,
  }
}
