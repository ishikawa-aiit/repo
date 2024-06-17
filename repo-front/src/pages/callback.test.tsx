import { waitFor } from '@testing-library/react'
import { useRouter } from 'next/router'
import { useRecoilState } from 'recoil'

import Callback from './callback.page'

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

describe('/callback', () => {
  it('codeがURLに付けたら、/weekly-reports/createに遷移される', async () => {
    renderWithQueryClient(<Callback />)

    await waitFor(() => {
      expect(router.push).toBeCalledWith('/weekly-reports/create')
    })
  })
})
