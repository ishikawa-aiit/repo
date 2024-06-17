import { render } from '@testing-library/react'

import { Textarea } from '.'

describe('snapshots', () => {
  it('最新のスナップショットに更新されている', () => {
    const { container } = render(<Textarea />)

    expect(container).toMatchSnapshot()
  })
})
