import { screen, render } from '@testing-library/react'

import { SettingSlack } from '.'

describe('props:hasSlackConnection', () => {
  it('trueの場合、設定済みが表示されている', () => {
    const { container } = render(<SettingSlack hasSlackConnection={true} />)

    expect(screen.getByText('設定済み')).toBeInTheDocument()
    expect(container).toMatchSnapshot()
  })

  it('falseの場合、未設定が表示されている', () => {
    const { container } = render(<SettingSlack hasSlackConnection={false} />)

    expect(screen.getByText('未設定')).toBeInTheDocument()
    expect(container).toMatchSnapshot()
  })
})
