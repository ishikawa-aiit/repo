import { renderHook } from '@testing-library/react-hooks'
import { StatusCodes } from 'http-status-codes'
import { rest } from 'msw'
import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { useRecoilState } from 'recoil'

import { server } from '../../../.jest/__mocks__/server'

import { useGetRequirements } from './useGetRequirements'

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

describe('useGetRequirements', () => {
  it('成功した場合、モックサーバで指定した値が返ってくる', async () => {
    const expected = [
      {
        id: 1,
        targetDuration: {
          id: 1,
          startAt: '2022-04-04T00:00:00+09:00',
          endAt: '2022-04-09T00:00:00+09:00',
          createdAt: '2020-04-17T00:00:00+09:00',
          updatedAt: '2020-04-17T00:00:00+09:00',
        },
        submissionDuration: {
          id: 1,
          startAt: '2022-04-10T00:00:00+09:00',
          endAt: '2022-04-17T00:00:00+09:00',
          createdAt: '2020-01-01T00:00:00+09:00',
          updatedAt: '2020-01-01T00:00:00+09:00',
        },
      },
      {
        id: 2,
        targetDuration: {
          id: 2,
          startAt: '2022-04-11T00:00:00+09:00',
          endAt: '2022-04-16T00:00:00+09:00',
          createdAt: '2020-01-01T00:00:00+09:00',
          updatedAt: '2020-01-01T00:00:00+09:00',
        },
        submissionDuration: {
          id: 2,
          startAt: '2022-04-17T00:00:00+09:00',
          endAt: '2022-04-24T00:00:00+09:00',
          createdAt: '2020-01-01T00:00:00+09:00',
          updatedAt: '2020-01-01T00:00:00+09:00',
        },
      },
      {
        id: 3,
        targetDuration: {
          id: 3,
          startAt: '2022-04-18T00:00:00+09:00',
          endAt: '2022-04-23T00:00:00+09:00',
          createdAt: '2020-01-01T00:00:00+09:00',
          updatedAt: '2020-01-01T00:00:00+09:00',
        },
        submissionDuration: {
          id: 3,
          startAt: '2022-04-24T00:00:00+09:00',
          endAt: '2022-05-01T00:00:00+09:00',
          createdAt: '2020-01-01T00:00:00+09:00',
          updatedAt: '2020-01-01T00:00:00+09:00',
        },
      },
    ]
    const { MockProvider } = createMockProvider()
    const { result, waitForNextUpdate } = renderHook(
      () => {
        return useGetRequirements()
      },
      {
        wrapper: MockProvider,
      },
    )

    expect(result.current.requirements).toHaveLength(0)

    await waitForNextUpdate()

    expect(result.current.requirements).toStrictEqual(expected)
  })

  it('失敗した場合、エラーが返され、toastが実行される', async () => {
    server.resetHandlers(
      rest.get('/api/weekly-reports/requirements', (_req, res, ctx) => {
        return res(ctx.status(StatusCodes.INTERNAL_SERVER_ERROR))
      }),
    )

    const { MockProvider } = createMockProvider()
    const { result, waitForNextUpdate } = renderHook(
      () => {
        return useGetRequirements()
      },
      {
        wrapper: MockProvider,
      },
    )

    await waitForNextUpdate()

    expect(result.current.requirements).toHaveLength(0)
    expect(showToastOutOfService).toBeCalled()
  })
})
