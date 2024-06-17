import { render } from '@testing-library/react'

import { LoadingTemplate } from '.'

const title = 'サンプルタイトル'
const description = 'サンプルディスクリプション'

describe('snapshots', () => {
  it('最新のスナップショットに更新されている', () => {
    const { container } = render(<LoadingTemplate title={title} description={description} />)

    expect(container).toMatchSnapshot()
  })
})
