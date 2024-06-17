import { render, screen } from '@testing-library/react'
import React from 'react'

import { ListNone } from '.'

jest.mock('next/link', () => {
  return ({ children, ...rest }: { children: React.ReactElement }) => {
    return React.cloneElement(children, { ...rest })
  }
})

describe('props: isError', () => {
  it('trueの場合、「表示できる週報はありません」と表示される', () => {
    const { container } = render(<ListNone isError={true} />)

    expect(screen.getByText('表示できる週報はありません')).toBeInTheDocument()
    expect(screen.queryByText('作成された週報はありません')).not.toBeInTheDocument()
    expect(screen.queryByTestId('Button')).not.toBeInTheDocument()
    expect(container).toMatchSnapshot()
  })

  describe('falseの場合', () => {
    it('「作成された週報はありません」と表示され、週報作成ページへのリンクボタンが表示される', () => {
      const { container } = render(<ListNone isError={false} />)

      expect(screen.getByText('作成された週報はありません')).toBeInTheDocument()
      expect(screen.queryByText('表示できる週報はありません')).not.toBeInTheDocument()
      expect(screen.getByTestId('Button')).toBeInTheDocument()
      expect(container).toMatchSnapshot()
    })

    it('指定のパスとリンクのhref属性が一致する', () => {
      const { container } = render(<ListNone isError={false} />)

      expect(screen.getByTestId('Button')).toHaveAttribute('href', '/weekly-reports/create')
      expect(container).toMatchSnapshot()
    })
  })
})
