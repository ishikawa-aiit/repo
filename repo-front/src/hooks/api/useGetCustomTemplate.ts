import { AxiosError, AxiosResponse } from 'axios'
import { StatusCodes } from 'http-status-codes'
import { useQuery } from 'react-query'

import { showToastOutOfService } from '@/components/molecules'
import { templateForNewCreate, templateDefaultExists } from '@/components/templates'
import { CustomTemplateTypes } from '@/components/types'
import { useClientWithToken } from '@/hooks/server/useClientWithToken'
import { ApiGetCustomTemplateTypes, ClientWithToken, QueryKeys } from '@/types'

const isNotQuerySelfCreated = (query?: ApiGetCustomTemplateTypes.QueryType) => {
  return query !== 'self-created'
}

/**
 * カスタムテンプレート一覧を取得
 */
const getCustomTemplate = async (
  client: ClientWithToken,
  query?: ApiGetCustomTemplateTypes.QueryType,
): Promise<CustomTemplateTypes.CustomTemplateProps[]> => {
  const { data } = await client.get<AxiosResponse<ApiGetCustomTemplateTypes.Response, AxiosError>>('/api/templates', {
    params: { type: query },
  })

  const customTemplates = data.data.map(
    ({ id, name, activityTime, doneActivity, todoActivity, solution, event, remark, team }) => {
      return {
        id,
        name,
        activityTime,
        doneActivity,
        todoActivity,
        solution,
        event,
        remark,
        team,
      }
    },
  )

  const templates: CustomTemplateTypes.CustomTemplateProps[] = isNotQuerySelfCreated(query)
    ? [...customTemplates, templateDefaultExists]
    : [templateForNewCreate, ...customTemplates]

  return templates
}

/**
 * カスタムテンプレート一覧を表示するカスタムフック
 */
export const useGetCustomTemplate = (query?: ApiGetCustomTemplateTypes.QueryType) => {
  const client = useClientWithToken()
  const key = isNotQuerySelfCreated(query) ? 'all' : 'self-created'

  const { data: customTemplates = [] } = useQuery<CustomTemplateTypes.CustomTemplateProps[], AxiosError>(
    [QueryKeys.GET_CUSTOM_TEMPLATES, key],
    async () => {
      return await getCustomTemplate(client, query)
    },
    {
      cacheTime: 0,
      onError: (error) => {
        if (error.response?.status !== StatusCodes.UNAUTHORIZED) {
          showToastOutOfService()
        }
      },
    },
  )

  return {
    customTemplates,
  }
}
