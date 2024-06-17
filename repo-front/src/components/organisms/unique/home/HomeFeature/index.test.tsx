import { render } from '@testing-library/react'

import { HomeFeature } from '.'

describe('snapshots', () => {
  it('最新のスナップショットに更新されている', () => {
    const { container } = render(<HomeFeature />)

    expect(container).toMatchSnapshot()
  })
})
