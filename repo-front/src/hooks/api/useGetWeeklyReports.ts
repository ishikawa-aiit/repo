import { AxiosError, AxiosResponse } from 'axios'
import { StatusCodes } from 'http-status-codes'
import { useQuery } from 'react-query'

import { showToastOutOfService } from '@/components/molecules'
import { WeeklyReportsTypes } from '@/components/types'
import { useClientWithToken } from '@/hooks/server/useClientWithToken'
import { ApiGetWeeklyReportsTypes, ClientWithToken, QueryKeys } from '@/types'

/**
 * 週報一覧を取得
 * @returns 週報の配列
 */
export const getWeeklyReports = async (client: ClientWithToken): Promise<WeeklyReportsTypes.ReportsProps> => {
  const { data } = await client.get<AxiosResponse<ApiGetWeeklyReportsTypes.Response, AxiosError>>('/api/weekly-reports')
  return data.data.map(({ id, requirement, activityTime, doneActivity, todoActivity, solution, event, remark }) => {
    return {
      id,
      requirement,
      activityTime,
      doneActivity,
      todoActivity,
      solution,
      event,
      remark,
    }
  })
}

/**
 * 週報一覧を表示するカスタムフック
 */
export const useGetWeeklyReports = () => {
  const client = useClientWithToken()

  const {
    data: weeklyReportItems = [],
    isLoading,
    isError,
  } = useQuery<WeeklyReportsTypes.ReportsProps, AxiosError>(
    QueryKeys.GET_WEEKLY_REPORTS,
    async () => {
      return await getWeeklyReports(client)
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
    weeklyReportItems,
    isLoading,
    isError,
  }
}
