import { render, screen, within } from '@testing-library/react'

import { Sidebar } from '.'

jest.mock('next/router', () => {
  return {
    useRouter: () => {
      return {
        pathname: '/weekly-reports/create',
      }
    },
  }
})

describe('Sidebar', () => {
  it('正常にレンダリングされている', () => {
    const { container } = render(<Sidebar />)

    expect(container).toMatchSnapshot()
  })

  describe('ルーターから返ってくるパス名(pathname)とmenuItemsおよびbottomMenuItems内のlink', () => {
    it('一致する場合、カレントページとなる', () => {
      const { container } = render(<Sidebar />)
      const { getByTestId } = within(screen.getByTestId('Sidebar'))
      const { getAllByTestId } = within(screen.getByTestId('Sidebar'))

      expect(getByTestId('SidebarCurrentMenuItem')).toHaveTextContent('週報作成')

      const sidebarMenuItems = getAllByTestId('SidebarMenuItem')
      sidebarMenuItems.forEach((sidebarMenuItem) => {
        expect(sidebarMenuItem).not.toHaveTextContent('週報作成')
      })
      expect(container).toMatchSnapshot()
    })
  })
})
