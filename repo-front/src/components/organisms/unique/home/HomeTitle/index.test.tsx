import { fireEvent, screen, waitFor } from '@testing-library/react'
import { useRouter } from 'next/router'

import { HomeTitle } from '.'

import { renderWithQueryClient } from '.jest'

jest.mock('next/router')

const router = {
  push: jest.fn(),
}

;(useRouter as jest.Mock).mockReturnValue(router)

describe('snapshots', () => {
  it('最新のスナップショットに更新されている', () => {
    const { container } = renderWithQueryClient(<HomeTitle />)

    expect(container).toMatchSnapshot()
  })
})

describe('Googleログインボタン', () => {
  it('ボタンをクリックすると、APIサーバーから受け取ったURLに転送される', async () => {
    renderWithQueryClient(<HomeTitle />)

    fireEvent.click(screen.getByTestId('RedirectButton'))

    await waitFor(() => {
      expect(router.push).toBeCalledWith('google_auth_dummy')
    })
  })
})
