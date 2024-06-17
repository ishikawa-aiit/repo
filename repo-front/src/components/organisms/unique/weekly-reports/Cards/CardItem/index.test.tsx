import { render, screen, within } from '@testing-library/react'

import { CardItem } from '.'

const testData = {
  title: 'テストタイトル',
  description: 'テスト詳細文',
  isCopyable: false,
}

describe('CardItem', () => {
  it('正常にレンダリングされている', () => {
    const { title, description } = testData
    const { container } = render(<CardItem {...testData} />)
    const { getByRole } = within(screen.getByTestId('CardItem'))

    expect(getByRole('term')).toHaveTextContent(title)
    expect(getByRole('definition')).toHaveTextContent(description)
    expect(container).toMatchSnapshot()
  })
})
