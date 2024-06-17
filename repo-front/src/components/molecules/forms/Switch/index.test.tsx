import { render } from '@testing-library/react'
import React from 'react'

import { Switch } from '.'

describe('snapshots', () => {
  it('最新のスナップショットに更新されている', () => {
    const { container } = render(<Switch />)

    expect(container).toMatchSnapshot()
  })
})
