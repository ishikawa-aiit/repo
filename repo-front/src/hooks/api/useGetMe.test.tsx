import { StatusCodes } from 'http-status-codes'
import { rest } from 'msw'
import { useRouter } from 'next/router'

import { useGetMe } from './useGetMe'

import { renderHookWithQueryClient, server } from '.jest'
import { showToastOutOfService, showToastUnauthorized } from '@/components/molecules'

jest.mock('next/router')
const router = {
  push: jest.fn(),
}
;(useRouter as jest.Mock).mockReturnValue(router)

jest.mock('@/components/molecules', () => {
  return {
    __esModule: true,
    showToastOutOfService: jest.fn(),
    showToastUnauthorized: jest.fn(),
  }
})

describe('useGetWeeklyReports', () => {
  it('成功した場合、モックサーバで指定した値が返ってくる', async () => {
    const expected = {
      id: 1,
      name: '新渡戸 稲造',
      createdAt: '2022-05-19T16:23:29.000000Z',
      updatedAt: '2022-05-19T16:23:29.000000Z',
      team: {
        id: 1,
        name: '飛田PT',
        createdAt: '2022-10-23T14:52:47.000000Z',
        updatedAt: '2022-10-23T14:52:47.000000Z',
      },
    }

    const { result, waitFor } = renderHookWithQueryClient(useGetMe)

    await waitFor(() => {
      expect(result.current.me).toStrictEqual(expected)
    })
  })

  it('APIからのレスポンスステータスが401の場合、toastが実行されてトップページに戻る', async () => {
    server.resetHandlers(
      rest.get('/api/users/me', (_req, res, ctx) => {
        return res(ctx.status(StatusCodes.UNAUTHORIZED))
      }),
    )

    const { result, waitFor } = renderHookWithQueryClient(useGetMe)

    await waitFor(() => {
      return result.current.isError
    })

    expect(showToastUnauthorized).toBeCalled()
    expect(router.push).toBeCalledWith('/')
  })

  it('APIからのレスポンスステータスが401以外の場合、toastが実行される', async () => {
    server.resetHandlers(
      rest.get('/api/users/me', (_req, res, ctx) => {
        return res(ctx.status(StatusCodes.INTERNAL_SERVER_ERROR))
      }),
    )

    const { result, waitFor } = renderHookWithQueryClient(useGetMe)

    await waitFor(() => {
      return result.current.isError
    })

    expect(showToastOutOfService).toBeCalled()
  })
})
