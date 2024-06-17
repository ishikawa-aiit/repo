import { AxiosResponse, AxiosError } from 'axios'
import { StatusCodes } from 'http-status-codes'
import { useMutation, useQueryClient } from 'react-query'

import { showToastOutOfService, showToastUnauthorized } from '@/components/molecules'
import { WeeklyReportsTypes } from '@/components/types'
import { useClientWithToken } from '@/hooks/server/useClientWithToken'
import { ApiPostWeeklyReportTypes, ClientWithToken, QueryKeys } from '@/types'
import { sortWeeklyReportQueryData } from '@/utils'

const postWeeklyReport = async (req: ApiPostWeeklyReportTypes.Request, client: ClientWithToken) => {
  const { data } = await client.post<
    ApiPostWeeklyReportTypes.Request,
    AxiosResponse<ApiPostWeeklyReportTypes.Response>
  >('/api/weekly-reports', req)

  return data
}

/**
 * 週報を保存するカスタムフック
 */
export const usePostWeeklyReport = () => {
  const queryClient = useQueryClient()

  const client = useClientWithToken()

  const { mutate } = useMutation<
    ApiPostWeeklyReportTypes.Response,
    AxiosError,
    ApiPostWeeklyReportTypes.Props,
    WeeklyReportsTypes.ReportsProps
  >(
    (props) => {
      return postWeeklyReport(props.request, client)
    },
    {
      onMutate: async (props) => {
        queryClient.setQueryData<WeeklyReportsTypes.ReportsProps>(
          QueryKeys.GET_WEEKLY_REPORTS,
          sortWeeklyReportQueryData(props.temporaryQueryData) as WeeklyReportsTypes.ReportsProps,
        )

        return props.rollbackQueryData
      },
      onSuccess: (result, _req, context) => {
        const { id, requirement, activityTime, doneActivity, todoActivity, solution, event, remark } = result.data

        const queryData = [
          {
            id,
            requirement,
            activityTime,
            doneActivity,
            todoActivity,
            solution,
            event,
            remark,
          },
          ...(context as WeeklyReportsTypes.ReportsProps),
        ]
        queryClient.setQueryData<WeeklyReportsTypes.ReportsProps>(
          QueryKeys.GET_WEEKLY_REPORTS,
          sortWeeklyReportQueryData(queryData) as WeeklyReportsTypes.ReportsProps,
        )
      },
      onError: (error, _request, context) => {
        if (error.response?.status === StatusCodes.UNAUTHORIZED) {
          showToastUnauthorized()
        } else {
          showToastOutOfService()
        }

        queryClient.setQueryData(QueryKeys.GET_WEEKLY_REPORTS, context)
      },
    },
  )

  return { mutate }
}
