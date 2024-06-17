import { PencilIcon } from '@heroicons/react/outline'
import { render, screen } from '@testing-library/react'
import React from 'react'

import { SidebarMenuItem } from '.'

const testMenuItem = {
  link: '/test',
  name: 'テスト',
  icon: <PencilIcon data-testid="Icon" />,
  isCurrent: false,
}

jest.mock('next/link', () => {
  return ({ children, ...rest }: { children: React.ReactElement }) => {
    return React.cloneElement(children, { ...rest })
  }
})

describe('SidebarMenuItem', () => {
  it('正常にレンダリングされている', () => {
    const { name } = testMenuItem
    const { container } = render(<SidebarMenuItem {...testMenuItem} />)

    expect(screen.getByText(name)).toBeInTheDocument()
    expect(screen.getByTestId('Icon')).toBeInTheDocument()
    expect(container).toMatchSnapshot()
  })

  it('指定のパスとリンクのhref属性が一致する', () => {
    const { link } = testMenuItem
    const { container } = render(<SidebarMenuItem {...testMenuItem} />)

    expect(screen.getByRole('link')).toHaveAttribute('href', link)
    expect(container).toMatchSnapshot()
  })
})

describe('props:isCurrent', () => {
  it('trueの場合、リンクがカレントとなる', () => {
    const { container } = render(<SidebarMenuItem {...testMenuItem} isCurrent />)

    expect(screen.getByTestId('SidebarCurrentMenuItem')).toBeInTheDocument()
    expect(screen.queryByTestId('SidebarMenuItem')).not.toBeInTheDocument()
    expect(container).toMatchSnapshot()
  })

  it('falseの場合、リンクがカレントではない', () => {
    const { container } = render(<SidebarMenuItem {...testMenuItem} />)

    expect(screen.getByTestId('SidebarMenuItem')).toBeInTheDocument()
    expect(screen.queryByTestId('SidebarCurrentMenuItem')).not.toBeInTheDocument()
    expect(container).toMatchSnapshot()
  })
})
