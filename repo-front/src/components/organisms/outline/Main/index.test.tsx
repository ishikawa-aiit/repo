import { screen, render, within } from '@testing-library/react'

import { Main } from '.'

const contents = 'サンプルテキスト'

describe('props:children', () => {
  it('正常にレンダリングされている', () => {
    const { container } = render(<Main>{contents}</Main>)

    const { getByText } = within(screen.getByTestId('Main'))

    expect(getByText(contents)).toBeInTheDocument()
    expect(container).toMatchSnapshot()
  })
})
