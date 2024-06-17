import { screen, render, within } from '@testing-library/react'

import { Link } from '.'

const sampleAddress = '/sample'
const sampleTextInLink = 'サンプルテキストリンク内'

describe('props:children', () => {
  it('正常にレンダリングされている', () => {
    const { container } = render(<Link href={sampleAddress} text={sampleTextInLink} />)

    const { getByText } = within(screen.getByTestId('Link'))

    expect(screen.getByRole('link')).toHaveAttribute('href', sampleAddress)
    expect(getByText(sampleTextInLink)).toBeInTheDocument()

    expect(container).toMatchSnapshot()
  })
})
