import { render, screen, act, within } from '@testing-library/react'

import { toast, Toast } from '.'

const body = 'サンプルボディ'
const status = {
  error: 'error' as const,
}
const title = 'サンプルタイトル'
const description = 'サンプルディスクリプション'

describe('props:children', () => {
  it('正常にレンダリングされている', () => {
    const { container } = render(<Toast>{body}</Toast>)

    const { getByText } = within(screen.getByTestId('Toast'))

    expect(getByText(body)).toBeInTheDocument()
    expect(container).toMatchSnapshot()
  })
})

describe('props:title', () => {
  it('タイトルが正常にレンダリングされている', async () => {
    const { container } = render(<Toast>{body}</Toast>)
    const title = 'テストタイトル'

    await act(async () => {
      toast({
        status: status.error,
        title,
        description,
      })
    })

    const allByTitle = await screen.findByRole('alert', { name: title })

    expect(allByTitle).toBeInTheDocument()
    expect(container).toMatchSnapshot()
  })
})

describe('props:description', () => {
  it('ディスクリプションが正常にレンダリングされている', async () => {
    const { container } = render(<Toast>{body}</Toast>)
    const description = 'テストディスクリプション'

    await act(async () => {
      toast({
        status: status.error,
        title,
        description,
      })
    })

    const allByDescription = await screen.findByText(description)

    expect(allByDescription).toBeInTheDocument()
    expect(container).toMatchSnapshot()
  })
})
