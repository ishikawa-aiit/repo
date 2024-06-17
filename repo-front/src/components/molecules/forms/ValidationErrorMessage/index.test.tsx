import { screen, render, within } from '@testing-library/react'

import { ValidationErrorMessage } from '.'

describe('props:message', () => {
  it('メッセージが正常にレンダリングされている', () => {
    const sampleText = 'サンプルテキスト'
    const { container } = render(<ValidationErrorMessage message={sampleText} />)

    const { getByText } = within(screen.getByTestId('ValidationErrorMessage'))

    expect(getByText(sampleText)).toBeInTheDocument()
    expect(container).toMatchSnapshot()
  })
})
