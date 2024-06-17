process.env.NEXT_PUBLIC_SLACK_CLIENT_ID = '3191404954710.4430430044818'

import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useRouter } from 'next/router'
import { useRecoilState } from 'recoil'

import { renderWithQueryClient } from '../../../../.jest'

import { slackAuthorizeUrl } from './constants'

import { SettingTemplate } from '.'

import { SettingTypes } from '@/components/types'
import { ProductConst } from '@/constants'

jest.mock('recoil')
const setUser = jest.fn()
;(useRecoilState as jest.Mock).mockReturnValue([
  { name: '新渡戸 稲造', team: { id: '1', name: '飛田PT' }, hasSlackConnection: false },
  setUser,
])

jest.mock('next/router')
const router = {
  push: jest.fn(),
}
;(useRouter as jest.Mock).mockReturnValue(router)

const projectTeams: SettingTypes.ProjectTeamsProps = [
  {
    id: null,
    name: 'PT未所属',
  },
  {
    id: 1,
    name: '飛田PT',
  },
  {
    id: 2,
    name: '嶋津PT',
  },
]

const renderTemplate = () => {
  return renderWithQueryClient(
    <SettingTemplate
      title={`所属PT設定 | ${ProductConst.PRODUCT_CATEGORY} ${ProductConst.PRODUCT_NAME}`}
      description="所属PTを設定できるページです。"
      projectTeams={projectTeams}
    />,
  )
}

describe('セレクトボックス', () => {
  it('デフォルトでは設定されているPTで表示される', async () => {
    const { container } = renderTemplate()

    expect(screen.getByRole('option', { name: projectTeams[1].name, selected: true })).toBeInTheDocument()
    expect(container).toMatchSnapshot()
  })

  it('PTが未設定のユーザーの場合、PTが選択されていない状態で表示される', async () => {
    ;(useRecoilState as jest.Mock).mockReturnValue([{ name: '新渡戸 稲造', team: null }, setUser])
    const { container } = renderTemplate()

    expect(screen.getByRole('option', { name: projectTeams[0].name, selected: true })).toBeInTheDocument()
    expect(container).toMatchSnapshot()
  })
})

describe('Slack', () => {
  it('hasSlackConnectionがfalseであれば、「Slackを設定する」ボタンが表示され、押すと指定のURLに遷移する', async () => {
    const { container } = renderTemplate()

    await userEvent.click(screen.getByTestId('ButtonSlackConnection'))
    await waitFor(() => {
      expect(router.push).toBeCalledWith(slackAuthorizeUrl)
    })
    expect(container).toMatchSnapshot()
  })

  it('hasSlackConnectionがtrueであれば、「Slackを設定する」ボタンが表示されない', async () => {
    ;(useRecoilState as jest.Mock).mockReturnValue([
      { name: '新渡戸 稲造', team: { id: '1', name: '飛田PT' }, hasSlackConnection: true },
      setUser,
    ])

    const { container } = renderTemplate()

    expect(screen.queryByTestId('ButtonSlackConnection')).not.toBeInTheDocument()
    expect(container).toMatchSnapshot()
  })
})

describe('snapshots', () => {
  it('最新のスナップショットに更新されている', () => {
    const { container } = renderWithQueryClient(
      <SettingTemplate
        title={`所属PT設定 | ${ProductConst.PRODUCT_CATEGORY} ${ProductConst.PRODUCT_NAME}`}
        description="所属PTを設定できるページです。"
        projectTeams={projectTeams}
      />,
    )

    expect(container).toMatchSnapshot()
  })
})
