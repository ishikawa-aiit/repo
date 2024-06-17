import { HomeTemplate } from '.'

import { renderWithQueryClient } from '.jest'

const title = 'サンプルタイトル'
const description = 'サンプルディスクリプション'

describe('snapshots', () => {
  it('最新のスナップショットに更新されている', () => {
    const { container } = renderWithQueryClient(<HomeTemplate title={title} description={description} />)

    expect(container).toMatchSnapshot()
  })
})
