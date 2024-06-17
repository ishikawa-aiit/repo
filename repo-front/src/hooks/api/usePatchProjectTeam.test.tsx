import { StatusCodes } from 'http-status-codes'
import { rest } from 'msw'
import { act } from 'react-dom/test-utils'
import { useRecoilState } from 'recoil'

import { renderHookWithQueryClient, generateTestQueryClient, server } from '.jest'
import { showToastOutOfService, showToastUnauthorized, toast } from '@/components/molecules'
import { usePatchProjectTeam } from '@/hooks/api'

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

const expected = {
  teamId: 1,
}

describe('usePatchProjectTeam', () => {
  it('成功時、成功を示すトーストが実行される', async () => {
    const queryClient = generateTestQueryClient()
    const { result, waitForNextUpdate, waitFor } = renderHookWithQueryClient(usePatchProjectTeam, queryClient)

    act(() => {
      result.current.mutate(expected)
    })

    await waitForNextUpdate()

    await waitFor(() => {
      expect(toast).toBeCalledWith({
        status: 'success',
        title: '所属PTを設定しました。',
      })
    })
  })

  it('失敗時(APIからのレスポンスステータスが401以外の場合)、失敗を示すトーストが実行される', async () => {
    server.resetHandlers(
      rest.patch('/api/users/my-setting', (_req, res, ctx) => {
        return res(ctx.status(StatusCodes.INTERNAL_SERVER_ERROR))
      }),
    )

    const queryClient = generateTestQueryClient()
    const { result, waitFor } = renderHookWithQueryClient(usePatchProjectTeam, queryClient)

    act(() => {
      result.current.mutate(expected)
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
      rest.patch('/api/users/my-setting', (_req, res, ctx) => {
        return res(ctx.status(StatusCodes.UNAUTHORIZED))
      }),
    )

    const queryClient = generateTestQueryClient()
    const { result, waitFor } = renderHookWithQueryClient(usePatchProjectTeam, queryClient)

    act(() => {
      result.current.mutate(expected)
    })

    await waitFor(() => {
      return result.current.isError
    })

    await waitFor(() => {
      expect(showToastUnauthorized).toBeCalled()
    })
  })
})
