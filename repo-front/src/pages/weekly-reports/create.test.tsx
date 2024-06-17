import { fireEvent, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useRouter } from 'next/router'
import { useRecoilState } from 'recoil'

import CreatePage from './create.page'

import { generateTestQueryClient, renderWithQueryClient } from '.jest'
import { QueryKeys } from '@/types'

jest.mock('next/router')
const router = {
  push: jest.fn(),
  pathname: '/weekly-reports/create',
}
;(useRouter as jest.Mock).mockReturnValue(router)

jest.mock('recoil')
const setUser = jest.fn()
;(useRecoilState as jest.Mock).mockReturnValue([{ name: '新渡戸 稲造' }, setUser])

describe('/weekly-reports/create', () => {
  it('週報作成ページにアクセスすると、キャッシュがセットされている', async () => {
    const queryClient = generateTestQueryClient()

    renderWithQueryClient(<CreatePage />, queryClient)

    await waitFor(() => {
      expect(queryClient.getQueryData(QueryKeys.GET_WEEKLY_REPORTS)).toBeDefined()
    })
  })

  it('mutateを実行した後、/weekly-reports/listに遷移する', async () => {
    const queryClient = generateTestQueryClient()
    renderWithQueryClient(<CreatePage />, queryClient)

    screen.getAllByRole('textbox').forEach((element) => {
      userEvent.type(element, 'dummy')
    })

    // 報告週を取得するまで待つ
    await waitFor(() => {
      // eslint-disable-next-line testing-library/no-node-access
      expect(screen.getByTestId('Select_requirementId').querySelectorAll('option').length).toBeGreaterThan(1)
    })

    await userEvent.selectOptions(screen.getByTestId('Select_requirementId'), '1')

    fireEvent.submit(screen.getByTestId('Button'))

    // サーバのモックで週報は3件定義されている。
    // 今回作成した週報の報告週が最も古いので、リストの最後に表示される。
    await waitFor(() => {
      expect(router.push).toBeCalledWith('/weekly-reports/list#3')
    })
  })
})
