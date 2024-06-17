import { StatusCodes } from 'http-status-codes'
import { rest } from 'msw'
import { useRouter } from 'next/router'
import { act } from 'react-dom/test-utils'

import { usePostAuthRedirect } from '.'

import { renderHookWithQueryClient, server } from '.jest'
import { showToastOutOfService } from '@/components/molecules'

jest.mock('@/components/molecules', () => {
  return {
    __esModule: true,
    showToastOutOfService: jest.fn(),
  }
})

jest.mock('next/router')

const router = {
  push: jest.fn(),
}

;(useRouter as jest.Mock).mockReturnValue(router)

describe('usePostAuthRedirect', () => {
  it('成功した場合、モックサーバで指定した値が返ってくる', async () => {
    const expected = {
      url: 'google_auth_dummy',
    }

    const { result, waitFor } = renderHookWithQueryClient(usePostAuthRedirect)

    act(() => {
      result.current.mutate(null)
    })

    await waitFor(() => {
      expect(result.current.data).toStrictEqual(expected)
      expect(router.push).toBeCalledWith(expected.url)
    })
  })

  it('失敗した場合、エラーが返され、toastが実行される', async () => {
    server.resetHandlers(
      rest.post('/api/auth/redirect', (_req, res, ctx) => {
        return res(ctx.status(StatusCodes.INTERNAL_SERVER_ERROR))
      }),
    )

    const { result, waitFor } = renderHookWithQueryClient(usePostAuthRedirect)

    act(() => {
      result.current.mutate(null)
    })

    await waitFor(() => {
      expect(showToastOutOfService).toBeCalled()
    })
  })
})
