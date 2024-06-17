import { render, screen, within } from '@testing-library/react'

import { ListSidebar } from '.'

jest.mock('next/router', () => {
  return {
    useRouter: () => {
      return {
        pathname: '/list',
        asPath: '/list#0',
      }
    },
  }
})

const testMenuItems = [
  {
    link: '0',
    name: 'testName1',
  },
  {
    link: '1',
    name: 'testName2',
  },
]

describe('ListSidebar', () => {
  it('menuItems内のオブジェクト数分、正常にレンダリングされている', () => {
    const { container } = render(<ListSidebar menuItems={testMenuItems} />)
    const expected = testMenuItems.length
    const { getAllByText } = within(screen.getByTestId('ListSidebar'))

    expect(getAllByText(/testName\d/)).toHaveLength(expected)
    expect(container).toMatchSnapshot()
  })
})

describe('ルーターから返ってくるパス名とmenuItemsのlink', () => {
  it('一致する場合、カレントページとなる', async () => {
    const { container } = render(<ListSidebar menuItems={testMenuItems} />)
    const { getByTestId } = within(screen.getByTestId('ListSidebar'))
    const { getAllByTestId } = within(screen.getByTestId('ListSidebar'))
    const listSidebarMenuItems = getAllByTestId('ListSidebarMenuItem')

    expect(getByTestId('ListSidebarCurrentMenuItem')).toHaveTextContent('testName1')

    listSidebarMenuItems.forEach((listSidebarMenuItem) => {
      expect(listSidebarMenuItem).not.toHaveTextContent('testName1')
    })
    expect(container).toMatchSnapshot()
  })
})
