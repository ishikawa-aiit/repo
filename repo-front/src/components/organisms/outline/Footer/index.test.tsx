import { render } from '@testing-library/react'

import { Footer } from '.'

describe('snapshots', () => {
  it('最新のスナップショットに更新されている', () => {
    const { container } = render(<Footer />)

    expect(container).toMatchSnapshot()
  })
})
