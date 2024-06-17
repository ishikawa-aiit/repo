import { screen, render, within } from '@testing-library/react'

import { Button } from '.'

const buttonText = 'サンプルテキスト'

describe('props:children', () => {
  it('正常にレンダリングされている', () => {
    const { container } = render(<Button>{buttonText}</Button>)

    const { getByText } = within(screen.getByTestId('Button'))

    expect(getByText(buttonText)).toBeInTheDocument()
    expect(container).toMatchSnapshot()
  })
})

describe('props:isDisabled', () => {
  it('trueの場合、buttonがdisabledである', () => {
    const { container } = render(<Button isDisabled>{buttonText}</Button>)

    expect(screen.getByTestId('Button')).toBeDisabled()
    expect(container).toMatchSnapshot()
  })

  it('falseの場合、buttonがenabledである', () => {
    const { container } = render(<Button>{buttonText}</Button>)

    expect(screen.getByTestId('Button')).toBeEnabled()
    expect(container).toMatchSnapshot()
  })
})
