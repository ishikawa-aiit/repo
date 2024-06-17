import { StatusCodes } from 'http-status-codes'
import { rest } from 'msw'
import { useRouter } from 'next/router'
import { act } from 'react-dom/test-utils'
import { useRecoilState } from 'recoil'

import { usePostMySettingSlack } from '.'

import { renderHookWithQueryClient, server } from '.jest'
import { showToastOutOfService, showToastSettingSuccess, showToastCancelSetting } from '@/components/molecules'

jest.mock('@/components/molecules', () => {
  return {
    __esModule: true,
    showToastOutOfService: jest.fn(),
    showToastSettingSuccess: jest.fn(),
    showToastCancelSetting: jest.fn(),
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

describe('usePostSlackAuthCode', () => {
  it('成功した場合、toastが実行されて設定ページに戻る', async () => {
    const { result, waitFor } = renderHookWithQueryClient(usePostMySettingSlack)

    act(() => {
      result.current.mutate({
        code: 'dummy',
      })
    })

    await waitFor(() => {
      expect(showToastSettingSuccess).toBeCalled()
      expect(push).toBeCalledWith('/setting')
    })
  })

  it('失敗した場合、toastが実行されて設定ページに戻る', async () => {
    server.resetHandlers(
      rest.post('/api/users/my-setting/slack', (_req, res, ctx) => {
        return res(ctx.status(StatusCodes.BAD_REQUEST))
      }),
    )

    const { result, waitFor } = renderHookWithQueryClient(usePostMySettingSlack)

    act(() => {
      result.current.mutate({
        code: 'dummy',
      })
    })

    await waitFor(() => {
      expect(showToastOutOfService).toBeCalled()
      expect(push).toBeCalledWith('/setting')
    })
  })

  it('認証コードが無い場合、toastが実行されて設定ページに戻る', async () => {
    const router = {
      push: push,
      query: {
        error: 'dummy',
      },
      isReady: true,
    }
    ;(useRouter as jest.Mock).mockReturnValue(router)

    renderHookWithQueryClient(usePostMySettingSlack)
    expect(showToastCancelSetting).toBeCalled()
    expect(push).toBeCalledWith('/setting')
  })
})
