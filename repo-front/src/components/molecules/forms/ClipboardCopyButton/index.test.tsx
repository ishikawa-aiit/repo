import { fireEvent, render, screen, waitFor } from '@testing-library/react'

import { ClipboardCopyButton } from '.'

describe('snapshot', () => {
  it('正常にレンダリングされている', () => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const { container } = render(<ClipboardCopyButton copyText="" onCopied={() => {}} />)

    expect(container).toMatchSnapshot()
  })
})

describe('copy', () => {
  it('onCopied の処理が呼ばれる', async () => {
    const handleOnCopy = jest.fn<() => void, never[]>()

    render(<ClipboardCopyButton copyText="" onCopied={handleOnCopy} />)

    fireEvent.click(screen.getByTestId('ClipboardCopyButton'))

    await waitFor(() => {
      expect(handleOnCopy).toBeCalled()
    })
  })
})
