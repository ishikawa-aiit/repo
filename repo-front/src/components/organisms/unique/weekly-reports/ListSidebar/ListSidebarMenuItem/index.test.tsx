import { render, screen } from '@testing-library/react'
import React from 'react'

import { ListSidebarMenuItem } from '.'

const testMenuItem = {
  link: '0',
  name: 'testName0',
  isCurrent: false,
}

jest.mock('next/link', () => {
  return ({ children, ...rest }: { children: React.ReactElement }) => {
    return React.cloneElement(children, { ...rest })
  }
})

describe('ListSidebarMenuItem', () => {
  it('正常にレンダリングされている', () => {
    const { name } = testMenuItem
    const { container } = render(<ListSidebarMenuItem {...testMenuItem} />)

    expect(screen.getByText(name)).toBeInTheDocument()
    expect(container).toMatchSnapshot()
  })

  it('指定のパスとリンクのhref属性が一致する', () => {
    const { link } = testMenuItem
    const { container } = render(<ListSidebarMenuItem {...testMenuItem} />)

    expect(screen.getByRole('link')).toHaveAttribute('href', `#${link}`)
    expect(container).toMatchSnapshot()
  })
})

describe('props:isCurrent', () => {
  it('trueの場合、リンクがカレントとなる', () => {
    const { container } = render(<ListSidebarMenuItem {...testMenuItem} isCurrent={true} />)

    expect(screen.getByTestId('ListSidebarCurrentMenuItem')).toBeInTheDocument()
    expect(container).toMatchSnapshot()
  })

  it('falseの場合、リンクがカレントではない', () => {
    const { container } = render(<ListSidebarMenuItem {...testMenuItem} />)

    expect(screen.getByTestId('ListSidebarMenuItem')).toBeInTheDocument()
    expect(screen.queryByTestId('ListSidebarCurrentMenuItem')).not.toBeInTheDocument()
    expect(container).toMatchSnapshot()
  })
})
