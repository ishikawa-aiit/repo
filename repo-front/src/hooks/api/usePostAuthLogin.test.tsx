import { StatusCodes } from 'http-status-codes'
import { rest } from 'msw'
import { useRouter } from 'next/router'
import { act } from 'react-dom/test-utils'
import { useRecoilState } from 'recoil'

import { usePostAuthLogin } from '.'

import { renderHookWithQueryClient, server } from '.jest'
import { showToastOutOfService } from '@/components/molecules'

jest.mock('@/components/molecules', () => {
  return {
    __esModule: true,
    showToastOutOfService: jest.fn(),
  }
})

jest.mock('next/router')
const push = jest.fn()
const router = {
  push: push,
  query: {
    code: 'dummy',
  },
  isReady: true,
}
;(useRouter as jest.Mock).mockReturnValue(router)

jest.mock('recoil')
const setApiToken = jest.fn()
;(useRecoilState as jest.Mock).mockReturnValue([undefined, setApiToken])

describe('usePostAuthLogin', () => {
  it('成功した場合、モックサーバで指定した値が返ってくる', async () => {
    const expected = {
      token: 'dummy',
    }

    const { result, waitFor } = renderHookWithQueryClient(usePostAuthLogin)

    act(() => {
      result.current.mutate({
        code: 'dummy',
      })
    })

    await waitFor(() => {
      expect(result.current.data).toStrictEqual(expected)
      expect(push).toBeCalledWith('/weekly-reports/create')
    })
  })

  it('成功した場合、ローカルストレージにトークンが保存される', async () => {
    const { result, waitFor } = renderHookWithQueryClient(usePostAuthLogin)

    act(() => {
      result.current.mutate({
        code: 'dummy',
      })
    })

    await waitFor(() => {
      expect(setApiToken).toBeCalled()
    })
  })

  it('失敗した場合、toastが実行されてトップページに戻る', async () => {
    server.resetHandlers(
      rest.post('/api/auth/login', (_req, res, ctx) => {
        return res(ctx.status(StatusCodes.BAD_REQUEST))
      }),
    )

    const { result, waitFor } = renderHookWithQueryClient(usePostAuthLogin)

    act(() => {
      result.current.mutate({
        code: 'dummy',
      })
    })

    await waitFor(() => {
      expect(showToastOutOfService).toBeCalled()
      expect(push).toBeCalledWith('/')
    })
  })
})
