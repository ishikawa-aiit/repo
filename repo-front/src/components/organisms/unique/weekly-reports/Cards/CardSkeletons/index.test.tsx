import { render, screen, within } from '@testing-library/react'

import { CardSkeletons } from '.'

describe('Card', () => {
  it('正常にレンダリングされている', () => {
    const { container } = render(<CardSkeletons />)
    const { getAllByRole } = within(screen.getByTestId('CardSkeletons'))

    expect(getAllByRole('status')).toHaveLength(3)
    expect(container).toMatchSnapshot()
  })
})
