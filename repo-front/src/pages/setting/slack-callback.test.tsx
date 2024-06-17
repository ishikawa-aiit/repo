import { waitFor } from '@testing-library/react'
import { useRouter } from 'next/router'
import { useRecoilState } from 'recoil'

import SlackCallback from './slack-callback.page'

import { renderWithQueryClient } from '.jest'

jest.mock('next/router')
const router = {
  push: jest.fn(),
  query: {
    code: 'dummy',
  },
  isReady: true,
}
;(useRouter as jest.Mock).mockReturnValue(router)

jest.mock('recoil')
const setApiToken = jest.fn()
;(useRecoilState as jest.Mock).mockReturnValue([undefined, setApiToken])

describe('/slack-callback', () => {
  it('codeがURLに付けたら、/settingに遷移される', async () => {
    renderWithQueryClient(<SlackCallback />)

    await waitFor(() => {
      expect(router.push).toBeCalledWith('/setting')
    })
  })
})
