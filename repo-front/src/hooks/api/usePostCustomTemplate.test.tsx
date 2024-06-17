import { StatusCodes } from 'http-status-codes'
import { rest } from 'msw'
import { act } from 'react-dom/test-utils'
import { useRecoilState } from 'recoil'

import { renderHookWithQueryClient, generateTestQueryClient, server } from '.jest'
import { showToastOutOfService, showToastUnauthorized, toast } from '@/components/molecules'
import { usePostCustomTemplate } from '@/hooks/api'

jest.mock('@/components/molecules', () => {
  return {
    __esModule: true,
    showToastOutOfService: jest.fn(),
    showToastUnauthorized: jest.fn(),
    toast: jest.fn(),
  }
})

jest.mock('recoil')
const setApiToken = jest.fn()
;(useRecoilState as jest.Mock).mockReturnValue([undefined, setApiToken])

const expectedCreate = {
  name: 'dummy',
  activityTime: 'dummy',
  doneActivity: 'dummy',
  todoActivity: 'dummy',
  solution: 'dummy',
  event: 'dummy',
  remark: 'dummy',
  isShared: false,
}

const expectedUpdate = {
  id: 1,
  name: 'dummy update',
  activityTime: 'dummy update',
  doneActivity: 'dummy update',
  todoActivity: 'dummy update',
  solution: 'dummy update',
  event: 'dummy update',
  remark: 'dummy update',
  isShared: false,
}

const updateResponse = {
  id: 1,
  name: 'dummy update',
  activityTime: 'dummy update',
  doneActivity: 'dummy update',
  todoActivity: 'dummy update',
  solution: 'dummy update',
  event: 'dummy update',
  remark: 'dummy update',
  team: null,
  createdAt: 'dummy',
  updatedAt: 'dummy',
}

describe('usePostCustomTemplate', () => {
  it('テンプレート作成成功時、成功を示すトーストが実行される', async () => {
    const queryClient = generateTestQueryClient()
    const { result, waitForNextUpdate, waitFor } = renderHookWithQueryClient(usePostCustomTemplate, queryClient)

    act(() => {
      result.current.mutate(expectedCreate)
    })

    await waitForNextUpdate()

    await waitFor(() => {
      expect(toast).toBeCalledWith({
        status: 'success',
        title: 'テンプレートを作成しました。',
      })
    })
  })

  it('テンプレート編集成功時、成功を示すトーストが実行される', async () => {
    server.resetHandlers(
      rest.post('/api/templates', (_req, res, ctx) => {
        return res(
          ctx.status(StatusCodes.OK),
          ctx.json({
            data: updateResponse,
          }),
        )
      }),
    )

    const queryClient = generateTestQueryClient()
    const { result, waitForNextUpdate, waitFor } = renderHookWithQueryClient(usePostCustomTemplate, queryClient)

    act(() => {
      result.current.mutate(expectedUpdate)
    })

    await waitForNextUpdate()

    await waitFor(() => {
      expect(toast).toBeCalledWith({
        status: 'success',
        title: 'テンプレートを編集しました。',
      })
    })
  })

  it('失敗時(APIからのレスポンスステータスが401以外の場合)、失敗を示すトーストが実行される', async () => {
    server.resetHandlers(
      rest.post('/api/templates', (_req, res, ctx) => {
        return res(ctx.status(StatusCodes.INTERNAL_SERVER_ERROR))
      }),
    )

    const queryClient = generateTestQueryClient()
    const { result, waitFor } = renderHookWithQueryClient(usePostCustomTemplate, queryClient)

    act(() => {
      result.current.mutate(expectedCreate)
    })

    await waitFor(() => {
      return result.current.isError
    })

    await waitFor(() => {
      expect(showToastOutOfService).toBeCalled()
    })
  })

  it('失敗時(APIからのレスポンスステータスが401の場合)、認証エラーのトーストが実行される', async () => {
    server.resetHandlers(
      rest.post('/api/templates', (_req, res, ctx) => {
        return res(ctx.status(StatusCodes.UNAUTHORIZED))
      }),
    )

    const queryClient = generateTestQueryClient()
    const { result, waitFor } = renderHookWithQueryClient(usePostCustomTemplate, queryClient)

    act(() => {
      result.current.mutate(expectedCreate)
    })

    await waitFor(() => {
      return result.current.isError
    })

    await waitFor(() => {
      expect(showToastUnauthorized).toBeCalled()
    })
  })
})
