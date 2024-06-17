import { screen, render, within } from '@testing-library/react'

import { HomeLayout } from '.'

const contents = 'サンプルテキスト'

describe('props:children', () => {
  it('正常にレンダリングされている', () => {
    const { container } = render(<HomeLayout>{contents}</HomeLayout>)
    const { getByText } = within(screen.getByTestId('HomeLayout'))

    expect(getByText(contents)).toBeInTheDocument()
    expect(container).toMatchSnapshot()
  })
})
