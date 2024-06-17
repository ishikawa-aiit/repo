import { fireEvent, render, screen, waitFor } from '@testing-library/react'

import { TemplateModal } from '.'

describe('props', () => {
  it('「反映する」ボタンをクリックすると、onApplyとonCloseが実行される', async () => {
    const onApply = jest.fn<() => void, never[]>()
    const onClose = jest.fn<() => void, never[]>()

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    render(<TemplateModal isOpen={true} onClose={onClose} onApply={onApply} />)

    fireEvent.click(screen.getByTestId('TemplateModalApplyButton'))
    await waitFor(() => {
      expect(onClose).toBeCalled()
    })
    expect(onApply).toBeCalled()
  })

  it('「やめる」ボタンをクリックすると、onCloseが実行され、onApplyが実行されない', async () => {
    const onApply = jest.fn<() => void, never[]>()
    const onClose = jest.fn<() => void, never[]>()

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    render(<TemplateModal isOpen={true} onClose={onClose} onApply={onApply} />)

    fireEvent.click(screen.getByTestId('TemplateModalCancelButton'))
    await waitFor(() => {
      expect(onClose).toBeCalled()
    })
    expect(onApply).not.toBeCalled()
  })
})

describe('snapshot', () => {
  it('最新のスナップショットに更新されている', () => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const { container } = render(<TemplateModal isOpen={true} onClose={() => {}} onApply={() => {}} />)

    expect(container).toMatchSnapshot()
  })
})
