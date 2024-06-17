import { renderHook } from '@testing-library/react-hooks'
import { StatusCodes } from 'http-status-codes'
import { rest } from 'msw'
import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { useRecoilState } from 'recoil'

import { server } from '../../../.jest/__mocks__/server'

import { useGetProjectTeams } from './useGetProjectTeams'

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

describe('useGetProjectTeams', () => {
  it('成功した場合、モックサーバで指定した値が返ってくる', async () => {
    const expected = [
      { id: null, name: 'PT未所属' },
      {
        id: 1,
        name: '飛田PT',
      },
      {
        id: 2,
        name: '嶋津PT',
      },
    ]
    const { MockProvider } = createMockProvider()
    const { result, waitForNextUpdate } = renderHook(
      () => {
        return useGetProjectTeams()
      },
      {
        wrapper: MockProvider,
      },
    )

    expect(result.current.projectTeams).toHaveLength(0)

    await waitForNextUpdate()

    expect(result.current.projectTeams).toStrictEqual(expected)
  })

  it('失敗した場合、エラーが返され、toastが実行される', async () => {
    server.resetHandlers(
      rest.get('/api/teams', (_req, res, ctx) => {
        return res(ctx.status(StatusCodes.INTERNAL_SERVER_ERROR))
      }),
    )

    const { MockProvider } = createMockProvider()
    const { result, waitForNextUpdate } = renderHook(
      () => {
        return useGetProjectTeams()
      },
      {
        wrapper: MockProvider,
      },
    )

    await waitForNextUpdate()

    expect(result.current.projectTeams).toHaveLength(0)
    expect(showToastOutOfService).toBeCalled()
  })
})
