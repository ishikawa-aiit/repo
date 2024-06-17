import { AxiosError } from 'axios'
import { StatusCodes } from 'http-status-codes'
import { rest } from 'msw'
import { act } from 'react-dom/test-utils'
import { UseMutationResult } from 'react-query'
import { useRecoilState } from 'recoil'

import { renderHookWithQueryClient, generateTestQueryClient, server } from '.jest'
import { showToastOutOfService, showToastUnauthorized } from '@/components/molecules'
import { WeeklyReportsTypes } from '@/components/types'
import { usePostWeeklyReport } from '@/hooks/api'
import { ApiPostWeeklyReportTypes, QueryKeys } from '@/types'

jest.mock('@/components/molecules', () => {
  return {
    __esModule: true,
    showToastOutOfService: jest.fn(),
    showToastUnauthorized: jest.fn(),
  }
})

jest.mock('recoil')
const setApiToken = jest.fn()
;(useRecoilState as jest.Mock).mockReturnValue([undefined, setApiToken])

const request = {
  requirementId: '1',
  activityTime: 'sent',
  doneActivity: 'sent',
  todoActivity: 'sent',
  solution: 'sent',
  event: 'sent',
  remark: 'sent',
}

const queryDatum = {
  id: 1,
  requirementId: '2',
  requirement: {
    id: 1,
    targetDuration: {
      id: 1,
      startAt: '2022-01-01T00:00:00+09:00',
      endAt: '2022-01-01T00:00:00+09:00',
      createdAt: '2022-01-01T00:00:00+09:00',
      updatedAt: '2022-01-01T00:00:00+09:00',
    },
    submissionDuration: {
      id: 11,
      startAt: '2022-01-01T00:00:00+09:00',
      endAt: '2022-01-01T00:00:00+09:00',
      createdAt: '2022-01-01T00:00:00+09:00',
      updatedAt: '2022-01-01T00:00:00+09:00',
    },
    createdAt: '2022-01-01T00:00:00+09:00',
    updatedAt: '2022-01-01T00:00:00+09:00',
  },
  activityTime: 'sent',
  doneActivity: 'sent',
  todoActivity: 'sent',
  solution: 'sent',
  event: 'sent',
  remark: 'sent',
}

describe('usePostWeeklyReport', () => {
  it('useMutationのonSuccessが実行される前、入力したデータがqueryClient.getQueryDataにセットされている', async () => {
    const queryClient = generateTestQueryClient()
    const { result, waitFor } = renderHookWithQueryClient<
      UseMutationResult<
        ApiPostWeeklyReportTypes.Response,
        AxiosError,
        ApiPostWeeklyReportTypes.Props,
        WeeklyReportsTypes.ReportsProps
      >
    >(usePostWeeklyReport, queryClient)

    const temporaryQueryData = [queryDatum]

    queryClient.setQueryData<WeeklyReportsTypes.ReportsProps>(QueryKeys.GET_WEEKLY_REPORTS, () => {
      return []
    })

    await waitFor(() => {
      result.current.mutate({ request, temporaryQueryData, rollbackQueryData: [] })

      return expect(
        queryClient.getQueryData<WeeklyReportsTypes.ReportsProps>(QueryKeys.GET_WEEKLY_REPORTS),
      ).toStrictEqual(temporaryQueryData)
    })
  })

  it('成功時、queryClient.getQueryDataのキャッシュデータにAPIレスポンスが追加されている', async () => {
    const queryClient = generateTestQueryClient()
    const { result, waitFor } = renderHookWithQueryClient<
      UseMutationResult<
        ApiPostWeeklyReportTypes.Response,
        AxiosError,
        ApiPostWeeklyReportTypes.Props,
        WeeklyReportsTypes.ReportsProps
      >
    >(usePostWeeklyReport, queryClient)

    const rollbackQueryDatum = Object.assign({}, queryDatum)
    rollbackQueryDatum.id = 2
    // サーバからのレスポンスより前の日付
    rollbackQueryDatum.requirement.targetDuration.startAt = '2022-07-01T00:00:00+09:00'

    queryClient.setQueryData<WeeklyReportsTypes.ReportsProps>(QueryKeys.GET_WEEKLY_REPORTS, () => {
      return []
    })

    act(() => {
      result.current.mutate({ request, temporaryQueryData: [], rollbackQueryData: [rollbackQueryDatum] })
    })

    await waitFor(() => {
      return expect(
        queryClient.getQueryData<WeeklyReportsTypes.ReportsProps>(QueryKeys.GET_WEEKLY_REPORTS) || [],
      ).toHaveLength(2)
    })

    const cached = queryClient.getQueryData<WeeklyReportsTypes.ReportsProps>(QueryKeys.GET_WEEKLY_REPORTS) || []

    expect(cached[0].id).toStrictEqual(1)
    expect(cached[1].id).toStrictEqual(2)
  })

  it('失敗時(APIからのレスポンスステータスが401以外の場合)、トーストが実行され、キャッシュデータが実行前にロールバックされる', async () => {
    server.resetHandlers(
      rest.post('/api/weekly-reports', (_req, res, ctx) => {
        return res(ctx.status(StatusCodes.INTERNAL_SERVER_ERROR))
      }),
    )

    const queryClient = generateTestQueryClient()
    const { result, waitFor } = renderHookWithQueryClient<
      UseMutationResult<
        ApiPostWeeklyReportTypes.Response,
        AxiosError,
        ApiPostWeeklyReportTypes.Props,
        WeeklyReportsTypes.ReportsProps
      >
    >(usePostWeeklyReport, queryClient)

    queryClient.setQueryData<WeeklyReportsTypes.ReportsProps>(QueryKeys.GET_WEEKLY_REPORTS, () => {
      return []
    })

    act(() => {
      result.current.mutate({ request, temporaryQueryData: [], rollbackQueryData: [] })
    })

    await waitFor(() => {
      return result.current.isError
    })

    await waitFor(() => {
      expect(showToastOutOfService).toBeCalled()
      expect(queryClient.getQueryData<WeeklyReportsTypes.ReportsProps>(QueryKeys.GET_WEEKLY_REPORTS)).toHaveLength(0)
    })
  })

  it('失敗時(APIからのレスポンスステータスが401の場合)、トーストが実行され、キャッシュデータが実行前にロールバックされる', async () => {
    server.resetHandlers(
      rest.post('/api/weekly-reports', (_req, res, ctx) => {
        return res(ctx.status(StatusCodes.UNAUTHORIZED))
      }),
    )

    const queryClient = generateTestQueryClient()
    const { result, waitFor } = renderHookWithQueryClient(usePostWeeklyReport, queryClient)

    queryClient.setQueryData<WeeklyReportsTypes.ReportsProps>(QueryKeys.GET_WEEKLY_REPORTS, () => {
      return []
    })

    act(() => {
      result.current.mutate({ request, temporaryQueryData: [], rollbackQueryData: [] })
    })

    await waitFor(() => {
      return result.current.isError
    })

    await waitFor(() => {
      expect(showToastUnauthorized).toBeCalled()
      expect(queryClient.getQueryData<WeeklyReportsTypes.ReportsProps>(QueryKeys.GET_WEEKLY_REPORTS)).toHaveLength(0)
    })
  })
})
