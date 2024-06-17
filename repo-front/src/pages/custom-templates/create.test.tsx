import { fireEvent, screen, waitFor } from '@testing-library/react'
import { useRouter } from 'next/router'
import { useRecoilState } from 'recoil'

import CreatePage from './create.page'

import { renderWithQueryClient } from '.jest'

jest.mock('next/router')
const router = {
  push: jest.fn(),
}
;(useRouter as jest.Mock).mockReturnValue(router)

jest.mock('recoil')
const setUser = jest.fn()
;(useRecoilState as jest.Mock).mockReturnValue([{ name: '新渡戸 稲造' }, setUser])

describe('/custom-templates/create', () => {
  it('mutateを実行した後、/weekly-reports/createに遷移される', async () => {
    renderWithQueryClient(<CreatePage />)

    screen.getAllByRole('textbox').forEach((element) => {
      fireEvent.change(element, { target: { value: 'dummy' } })
    })
    fireEvent.submit(screen.getByTestId('Button'))

    await waitFor(() => {
      expect(router.push).toBeCalledWith('/weekly-reports/create')
    })
  })
})
