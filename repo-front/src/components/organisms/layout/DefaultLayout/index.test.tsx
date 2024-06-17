import { screen, within } from '@testing-library/react'
import { useRecoilState } from 'recoil'

import { renderWithQueryClient } from '../../../../../.jest'

import { DefaultLayout } from '.'

jest.mock('next/router', () => {
  return {
    useRouter: () => {
      return {
        pathname: '/',
      }
    },
  }
})

jest.mock('recoil')
const setUser = jest.fn()
;(useRecoilState as jest.Mock).mockReturnValue([{ name: '新渡戸 稲造' }, setUser])

describe('props:children', () => {
  it('正常にレンダリングされている', () => {
    const contents = 'サンプルテキスト'
    const { container } = renderWithQueryClient(
      <DefaultLayout heading="" title="" description="">
        {contents}
      </DefaultLayout>,
    )
    const { getByText } = within(screen.getByTestId('DefaultLayout'))

    expect(getByText(contents)).toBeInTheDocument()
    expect(container).toMatchSnapshot()
  })
})
