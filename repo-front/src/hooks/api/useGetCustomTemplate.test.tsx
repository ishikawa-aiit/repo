import { renderHook } from '@testing-library/react-hooks'
import { StatusCodes } from 'http-status-codes'
import { rest } from 'msw'
import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { useRecoilState } from 'recoil'

import { server } from '../../../.jest/__mocks__/server'

import { useGetCustomTemplate } from './useGetCustomTemplate'

import { showToastOutOfService } from '@/components/molecules'
import { templateForNewCreate, templateDefaultExists } from '@/components/templates'

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

describe('useGetCustomTemplate', () => {
  it('成功した場合、モックサーバで指定した値が返ってくる', async () => {
    const expected = [
      {
        id: 1,
        name: 'dummy1',
        activityTime: 'dummy1',
        doneActivity: 'dummy1',
        todoActivity: 'dummy1',
        solution: 'dummy1',
        event: 'dummy1',
        remark: 'dummy1',
        team: null,
      },
      {
        id: 2,
        name: 'dummy2',
        activityTime: 'dummy2',
        doneActivity: 'dummy2',
        todoActivity: 'dummy2',
        solution: 'dummy2',
        event: 'dummy2',
        remark: 'dummy2',
        team: {
          id: 1,
          name: 'dummy2',
          createdAt: 'dummy2',
          updatedAt: 'dummy2',
        },
      },
      {
        id: 3,
        name: 'dummy3',
        activityTime: 'dummy3',
        doneActivity: 'dummy3',
        todoActivity: 'dummy3',
        solution: 'dummy3',
        event: 'dummy3',
        remark: 'dummy3',
        team: null,
      },
      templateDefaultExists,
    ]
    const { MockProvider } = createMockProvider()
    const { result, waitForNextUpdate } = renderHook(
      () => {
        return useGetCustomTemplate()
      },
      {
        wrapper: MockProvider,
      },
    )

    expect(result.current.customTemplates).toHaveLength(0)

    await waitForNextUpdate()

    expect(result.current.customTemplates).toStrictEqual(expected)
  })

  it('query引数にselfCreationを指定して成功した場合、モックサーバで指定した値が返ってくる', async () => {
    const expected = [
      templateForNewCreate,
      {
        id: 1,
        name: 'dummy1',
        activityTime: 'dummy1',
        doneActivity: 'dummy1',
        todoActivity: 'dummy1',
        solution: 'dummy1',
        event: 'dummy1',
        remark: 'dummy1',
        team: null,
      },
      {
        id: 2,
        name: 'dummy2',
        activityTime: 'dummy2',
        doneActivity: 'dummy2',
        todoActivity: 'dummy2',
        solution: 'dummy2',
        event: 'dummy2',
        remark: 'dummy2',
        team: {
          id: 1,
          name: 'dummy2',
          createdAt: 'dummy2',
          updatedAt: 'dummy2',
        },
      },
    ]
    const { MockProvider } = createMockProvider()
    const { result, waitForNextUpdate } = renderHook(
      () => {
        return useGetCustomTemplate('self-created')
      },
      {
        wrapper: MockProvider,
      },
    )

    expect(result.current.customTemplates).toHaveLength(0)

    await waitForNextUpdate()

    expect(result.current.customTemplates).toStrictEqual(expected)
  })

  it('失敗した場合、エラーが返され、toastが実行される', async () => {
    server.resetHandlers(
      rest.get('/api/templates', (_req, res, ctx) => {
        return res(ctx.status(StatusCodes.INTERNAL_SERVER_ERROR))
      }),
    )

    const { MockProvider } = createMockProvider()
    const { result, waitForNextUpdate } = renderHook(
      () => {
        return useGetCustomTemplate()
      },
      {
        wrapper: MockProvider,
      },
    )

    await waitForNextUpdate()

    expect(result.current.customTemplates).toHaveLength(0)
    expect(showToastOutOfService).toBeCalled()
  })
})
