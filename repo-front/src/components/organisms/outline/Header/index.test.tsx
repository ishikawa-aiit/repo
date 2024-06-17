import { screen, within } from '@testing-library/react'
import { useRecoilState } from 'recoil'

import { renderWithQueryClient } from '../../../../../.jest'

import { Header } from '.'

jest.mock('recoil')
const user = {
  name: '新渡戸 稲造',
}
;(useRecoilState as jest.Mock).mockReturnValue([user])

describe('snapshots', () => {
  it('最新のスナップショットに更新されている', () => {
    const { container } = renderWithQueryClient(<Header />)

    expect(container).toMatchSnapshot()
  })

  it('ログイン中はユーザー名が表示される', () => {
    renderWithQueryClient(<Header />)

    const { getByText } = within(screen.getByTestId('HeaderUserName'))
    expect(getByText(user.name)).toBeInTheDocument()
  })
})
