import { renderHook } from '@testing-library/react-hooks'
import { StatusCodes } from 'http-status-codes'
import { rest } from 'msw'
import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { useRecoilState } from 'recoil'

import { server } from '../../../.jest/__mocks__/server'

import { useGetWeeklyReports } from './useGetWeeklyReports'

import { showToastOutOfService } from '@/components/molecules'

export const createMockProvider = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  })

  const MockProvider = ({ children }: { children: React.ReactNode }) => {
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  }

  return { MockProvider, queryClient }
}

jest.mock('@/components/molecules', () => {
  return {
    __esModule: true,
    showToastOutOfService: jest.fn(),
  }
})

jest.mock('recoil')
const setApiToken = jest.fn()
;(useRecoilState as jest.Mock).mockReturnValue([undefined, setApiToken])

describe('useGetWeeklyReports', () => {
  it('成功した場合、モックサーバで指定した値が返ってくる', async () => {
    const expected = [
      {
        id: 1,
        requirement: {
          id: 14,
          targetDuration: {
            id: 14,
            startAt: '2022-07-04T00:00:00+09:00',
            endAt: '2022-07-09T00:00:00+09:00',
            createdAt: '2022-05-19T16:23:29.000000Z',
            updatedAt: '2022-05-19T16:23:29.000000Z',
          },
          submissionDuration: {
            id: 14,
            startAt: '2022-07-10T00:00:00+09:00',
            endAt: '2022-07-17T00:00:00+09:00',
            createdAt: '2022-05-19T16:23:29.000000Z',
            updatedAt: '2022-05-19T16:23:29.000000Z',
          },
          createdAt: '2022-05-19T16:23:29.000000Z',
          updatedAt: '2022-05-19T16:23:29.000000Z',
        },
        activityTime: '2時間20分',
        doneActivity: 'やったこと1',
        todoActivity: 'やること1',
        solution: '解決したこと1',
        event: '起こったこと1',
        remark: '特別なこと1',
      },
      {
        id: 2,
        requirement: {
          id: 17,
          targetDuration: {
            id: 17,
            startAt: '2022-07-25T00:00:00+09:00',
            endAt: '2022-07-30T00:00:00+09:00',
            createdAt: '2022-05-19T16:23:29.000000Z',
            updatedAt: '2022-05-19T16:23:29.000000Z',
          },
          submissionDuration: {
            id: 17,
            startAt: '2022-07-31T00:00:00+09:00',
            endAt: '2022-08-07T00:00:00+09:00',
            createdAt: '2022-05-19T16:23:29.000000Z',
            updatedAt: '2022-05-19T16:23:29.000000Z',
          },
          createdAt: '2022-05-19T16:23:29.000000Z',
          updatedAt: '2022-05-19T16:23:29.000000Z',
        },
        activityTime: '8時間50分',
        doneActivity: 'やったこと2',
        todoActivity: 'やること2',
        solution: '解決したこと2',
        event: '起こったこと2',
        remark: '特別なこと2',
      },
      {
        id: 3,
        requirement: {
          id: 22,
          targetDuration: {
            id: 22,
            startAt: '2022-10-24T00:00:00+09:00',
            endAt: '2022-10-29T00:00:00+09:00',
            createdAt: '2022-05-19T16:23:29.000000Z',
            updatedAt: '2022-05-19T16:23:29.000000Z',
          },
          submissionDuration: {
            id: 22,
            startAt: '2022-10-30T00:00:00+09:00',
            endAt: '2022-11-06T00:00:00+09:00',
            createdAt: '2022-05-19T16:23:29.000000Z',
            updatedAt: '2022-05-19T16:23:29.000000Z',
          },
          createdAt: '2022-05-19T16:23:29.000000Z',
          updatedAt: '2022-05-19T16:23:29.000000Z',
        },
        activityTime: '5時間20分',
        doneActivity: 'やったこと3',
        todoActivity: 'やること3',
        solution: '解決したこと3',
        event: '起こったこと3',
        remark: '特別なこと3',
      },
    ]
    const { MockProvider } = createMockProvider()
    const { result, waitForNextUpdate } = renderHook(
      () => {
        return useGetWeeklyReports()
      },
      {
        wrapper: MockProvider,
      },
    )

    expect(result.current.isLoading).toBe(true)
    expect(result.current.isError).toBe(false)
    expect(result.current.weeklyReportItems).toHaveLength(0)

    await waitForNextUpdate()

    expect(result.current.isLoading).toBe(false)
    expect(result.current.isError).toBe(false)
    expect(result.current.weeklyReportItems).toStrictEqual(expected)
  })

  it('失敗した場合、エラーが返され、toastが実行される', async () => {
    server.resetHandlers(
      rest.get('/api/weekly-reports', (_req, res, ctx) => {
        return res(ctx.status(StatusCodes.INTERNAL_SERVER_ERROR))
      }),
    )

    const { MockProvider } = createMockProvider()
    const { result, waitForNextUpdate } = renderHook(
      () => {
        return useGetWeeklyReports()
      },
      {
        wrapper: MockProvider,
      },
    )

    await waitForNextUpdate()

    expect(result.current.isError).toBe(true)
    expect(result.current.isLoading).toBe(false)
    expect(result.current.weeklyReportItems).toHaveLength(0)
    expect(showToastOutOfService).toBeCalled()
  })
})
