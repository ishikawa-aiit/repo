import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useRecoilState } from 'recoil'

import { renderWithQueryClient } from '../../../../../.jest'

import { templateDefaultExists } from './constants'

import { CreationTemplate } from '.'

import { CustomTemplateTypes, RequirementTypes } from '@/components/types'
import { ProductConst } from '@/constants'

jest.mock('next/router', () => {
  return {
    useRouter: () => {
      return {
        pathname: '/',
      }
    },
  }
})

jest.mock('recoil')
const setUser = jest.fn()
;(useRecoilState as jest.Mock).mockReturnValue([{ name: '新渡戸 稲造' }, setUser])

const expectedCustomTemplate: CustomTemplateTypes.CustomTemplatesProps = [
  {
    id: 1,
    name: 'dummy1',
    activityTime: 'dummy1',
    doneActivity: 'dummy1',
    todoActivity: 'dummy1',
    solution: 'dummy1',
    event: 'dummy1',
    remark: 'dummy1',
    team: {
      id: 1,
      name: 'dummy1',
      createdAt: 'dummy1',
      updatedAt: 'dummy1',
    },
  },
  templateDefaultExists,
]

const expectedRequirements: RequirementTypes.RequirementProps[] = [
  {
    id: 1,
    targetDuration: {
      startAt: '2022-04-04T00:00:00+09:00',
      endAt: '2022-04-09T00:00:00+09:00',
    },
    submissionDuration: {
      startAt: '2022-04-10T00:00:00+09:00',
      endAt: '2022-04-17T00:00:00+09:00',
    },
  },
  {
    id: 2,
    targetDuration: {
      startAt: '2022-04-11T00:00:00+09:00',
      endAt: '2022-04-16T00:00:00+09:00',
    },
    submissionDuration: {
      startAt: '2022-04-17T00:00:00+09:00',
      endAt: '2022-04-24T00:00:00+09:00',
    },
  },
  {
    id: 3,
    targetDuration: {
      startAt: '2022-04-18T00:00:00+09:00',
      endAt: '2022-04-23T00:00:00+09:00',
    },
    submissionDuration: {
      startAt: '2022-04-24T00:00:00+09:00',
      endAt: '2022-05-01T00:00:00+09:00',
    },
  },
]

const renderTemplate = () => {
  return renderWithQueryClient(
    <CreationTemplate
      title={`週報作成 | ${ProductConst.PRODUCT_CATEGORY} ${ProductConst.PRODUCT_NAME}`}
      description="週報を作成することができるページです。"
      customTemplates={expectedCustomTemplate}
      requirements={expectedRequirements}
    />,
  )
}

beforeAll(() => {
  jest.useFakeTimers().setSystemTime(new Date('2022-04-17T23:59:59+09:00'))
})

afterAll(() => {
  jest.useRealTimers()
})

describe('template', () => {
  const fillField = async (testId: string) => {
    const field = screen.getByTestId<HTMLInputElement>(testId)
    userEvent.type(field, 'a')
    await waitFor(() => {
      expect(field.value).toStrictEqual('a')
    })
  }

  const applyTemplate = () => {
    userEvent.selectOptions(screen.getByTestId('Select_template'), 'dummy1')
    userEvent.click(screen.getByTestId('ApplyTemplateButton'))
  }

  const waitForAppliedTemplate = async () => {
    await waitFor(() => {
      expect(screen.getByTestId<HTMLTextAreaElement>('TextArea_remark').value).not.toEqual('')
    })
  }

  const waitForOpenModal = async () => {
    await waitFor(() => {
      expect(screen.getByTestId(`TemplateModal`)).toBeVisible()
    })
  }

  const expectTemplateFieldIsFilled = () => {
    const targetFields = ['activityTime', 'doneActivity', 'todoActivity', 'solution', 'event', 'remark']
    targetFields.forEach((field) => {
      expect(screen.getByTestId<HTMLTextAreaElement>(`TextArea_${field}`).value).toEqual(
        expectedCustomTemplate[0][field],
      )
    })
  }

  it('デフォルトではセレクトボックス内の最初の要素が選択されている', async () => {
    const { container } = renderTemplate()

    expect(screen.getByRole('option', { name: expectedCustomTemplate[0]['name'], selected: true })).toBeInTheDocument()
    expect(container).toMatchSnapshot()
  })

  it('報告週の初期値が04/04 ~ 04/09となっている', async () => {
    const { container } = renderTemplate()

    expect(screen.getByRole('option', { name: '04/04 ~ 04/09', selected: true })).toBeInTheDocument()
    expect(container).toMatchSnapshot()
  })

  it('未入力の場合、テンプレート反映ボタンをクリックするとテキストエリアにテンプレートが反映される', async () => {
    const { container } = renderTemplate()

    applyTemplate()
    await waitForAppliedTemplate()

    expectTemplateFieldIsFilled()
    expect(container).toMatchSnapshot()
  })

  it('入力済みの場合、テンプレート反映ボタンをクリックするとモーダルが表示される', async () => {
    const { container } = renderTemplate()

    await fillField('TextArea_activityTime')
    applyTemplate()
    await waitForOpenModal()

    expect(container).toMatchSnapshot()
  })

  it('テンプレート対象以外のフィールドが入力済みの場合、テンプレート反映ボタンをクリックするとテキストエリアにテンプレートが反映される', async () => {
    const { container } = renderTemplate()

    const user = userEvent.setup({
      // useFakeTimer時にタイマーが進まないので、jest.advanceTimersByTimeを使って進める
      advanceTimers: jest.advanceTimersByTime,
    })
    await user.selectOptions(screen.getByTestId('Select_requirementId'), '1')
    applyTemplate()
    await waitForAppliedTemplate()

    expectTemplateFieldIsFilled()
    expect(container).toMatchSnapshot()
  })
})

describe('snapshots', () => {
  it('最新のスナップショットに更新されている', () => {
    const { container } = renderWithQueryClient(
      <CreationTemplate
        title={`週報作成 | ${ProductConst.PRODUCT_CATEGORY} ${ProductConst.PRODUCT_NAME}`}
        description="週報を作成することができるページです。"
        customTemplates={expectedCustomTemplate}
        requirements={expectedRequirements}
      />,
    )

    expect(container).toMatchSnapshot()
  })
})
