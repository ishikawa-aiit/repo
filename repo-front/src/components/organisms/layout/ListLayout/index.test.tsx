import { screen, within } from '@testing-library/react'
import { useRecoilState } from 'recoil'

import { renderWithQueryClient } from '../../../../../.jest'

import { ListLayout } from '.'

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

    const menuItems = [
      {
        link: '0',
        name: '4/4 ~ 4/9',
      },
      {
        link: '1',
        name: '4/11 ~ 4/16',
      },
    ]

    const { container } = renderWithQueryClient(
      <ListLayout heading="" title="" description="" menuItems={menuItems}>
        {contents}
      </ListLayout>,
    )
    const { getByText } = within(screen.getByTestId('ListLayout'))

    expect(getByText(contents)).toBeInTheDocument()
    expect(container).toMatchSnapshot()
  })
})
