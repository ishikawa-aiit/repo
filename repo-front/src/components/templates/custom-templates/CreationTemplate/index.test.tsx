import { fireEvent, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useRecoilState } from 'recoil'

import { renderWithQueryClient } from '../../../../../.jest'

import { templateCharacterLimitConst, getValidationErrorMessage, templateForNewCreate } from './constants'

import { CreationTemplate } from '.'

import { CustomTemplateTypes } from '@/components/types'
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
;(useRecoilState as jest.Mock).mockReturnValue([
  { name: '新渡戸 稲造', team: { teamId: '1', name: '飛田PT' } },
  setUser,
])

const expected: CustomTemplateTypes.CustomTemplatesProps = [
  templateForNewCreate,
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
]

const renderTemplate = () => {
  return renderWithQueryClient(
    <CreationTemplate
      title={`テンプレート作成 | ${ProductConst.PRODUCT_CATEGORY} ${ProductConst.PRODUCT_NAME}`}
      description="カスタムテンプレートを作成することができるページです。"
      customTemplates={expected}
    />,
  )
}

const fillField = async (input: string, testId: string, isClear = false) => {
  const field = screen.getByTestId<HTMLInputElement>(testId)

  fireEvent.change(field, { target: { value: input } })
  await waitFor(() => {
    expect(field.value).toStrictEqual(input)
  })
  if (isClear) {
    fireEvent.change(field, { target: { value: '' } })
  }
}

const { MAX_INPUT, MAX_TEXTAREA } = templateCharacterLimitConst

describe('フォーム入力バリデーション/ボタンの活性・非活性', () => {
  const maxInput = 'a'.repeat(MAX_INPUT)
  const overInput = 'a'.repeat(MAX_INPUT + 1)
  const overTextArea = 'a'.repeat(MAX_TEXTAREA + 1)
  const inputField = 'Input_name'

  const textAreaFields = ['activityTime', 'doneActivity', 'todoActivity', 'solution', 'event', 'remark']

  const expectDisableButton = async () => {
    await waitFor(() => {
      expect(screen.getByTestId('Button')).toBeDisabled()
    })
  }

  const applyTemplate = async () => {
    userEvent.selectOptions(screen.getByTestId('Select_id'), 'dummy1')
  }

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('テンプレート名に1～250文字の入力があると、「保存する」ボタンが活性になる', async () => {
    const { container } = renderTemplate()

    await fillField(maxInput, inputField)

    await waitFor(() => {
      expect(screen.getByTestId('Button')).toBeEnabled()
    })
    expect(container).toMatchSnapshot()
  })

  it('テンプレート名に入力が無いと「保存する」ボタンが非活性になる', async () => {
    const { container } = renderTemplate()

    await expectDisableButton
    expect(container).toMatchSnapshot()
  })

  it('テンプレート名に空白のみ入力すると「保存する」ボタンが非活性になる', async () => {
    const { container } = renderTemplate()

    await fillField(' ', inputField)

    await expectDisableButton
    expect(container).toMatchSnapshot()
  })

  it('テンプレート名の入力が250文字を超えると「保存する」ボタンが非活性になる', async () => {
    const { container } = renderTemplate()

    await fillField(overInput, inputField)

    await expectDisableButton
    expect(container).toMatchSnapshot()
  })

  it('TextAreaの入力が16000文字を超えると「保存する」ボタンが非活性になる', async () => {
    const { container } = renderTemplate()

    await Promise.all(
      textAreaFields.map(async (field) => {
        await fillField(overTextArea, `TextArea_${field}`)
        await expectDisableButton
        expect(container).toMatchSnapshot()
      }),
    )
  })

  it('テンプレートを選択した後、共有PTスイッチを押すと、「保存する」ボタンが活性になる', async () => {
    const { container } = renderTemplate()

    applyTemplate()
    userEvent.click(screen.getByTestId('Switch_isShared'))

    await waitFor(() => {
      expect(screen.getByTestId('Button')).toBeEnabled()
    })
    expect(container).toMatchSnapshot()
  })
})

describe('セレクトボックス', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('デフォルトでは新規作成が表示される', async () => {
    const { container } = renderTemplate()

    expect(screen.getByRole('option', { name: '新規作成', selected: true })).toBeInTheDocument()
    expect(container).toMatchSnapshot()
  })
})

describe('フォーム入力バリデーション/エラーメッセージの表示', () => {
  const overInput = 'a'.repeat(MAX_INPUT + 1)
  const overTextArea = 'a'.repeat(MAX_TEXTAREA + 1)
  const inputField = 'Input_name'

  const textAreaFields = ['activityTime', 'doneActivity', 'todoActivity', 'solution', 'event', 'remark']

  const expectValidationMessageInTheDocument = async (message: string) => {
    await waitFor(() => {
      const { getByText } = within(screen.getByTestId('ValidationErrorMessage'))
      expect(getByText(message)).toBeInTheDocument()
    })
  }

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('テンプレート名に入力が無いとバリデーションエラーが表示される', async () => {
    const { container } = renderTemplate()

    await fillField('a', inputField, true)

    await expectValidationMessageInTheDocument(getValidationErrorMessage('REQUIRE'))
    expect(container).toMatchSnapshot()
  })

  it('テンプレート名の入力が250文字を超えるとバリデーションエラーが表示される', async () => {
    const { container } = renderTemplate()

    await fillField(overInput, inputField)

    await expectValidationMessageInTheDocument(getValidationErrorMessage('MAX', MAX_INPUT))
    expect(container).toMatchSnapshot()
  })

  it('テンプレート名に空白のみを入力するとバリデーションエラーが表示される', async () => {
    const { container } = renderTemplate()

    await fillField(' ', inputField)

    await expectValidationMessageInTheDocument(getValidationErrorMessage('REQUIRE'))
    expect(container).toMatchSnapshot()
  })

  it('TextAreaの入力が16000文字を超えるとバリデーションエラーが表示される', async () => {
    const { container } = renderTemplate()

    textAreaFields.forEach(async (field) => {
      await fillField(overTextArea, `TextArea_${field}`)

      expectValidationMessageInTheDocument(getValidationErrorMessage('MAX', MAX_TEXTAREA))
      expect(container).toMatchSnapshot()
    })
  })
})

describe('PT共有スイッチの表示', () => {
  it('user.teamが存在する場合、「PTで共有する」のラベル、スイッチが表示される', () => {
    const { container } = renderTemplate()

    expect(screen.getByText('PTで共有する')).toBeInTheDocument()
    expect(screen.getByTestId('Switch_isShared')).toBeInTheDocument()
    expect(container).toMatchSnapshot()
  })
})

describe('PT共有スイッチの表示', () => {
  it('user.teamが存在しない場合、「PTで共有する」のラベル、スイッチが表示されない', () => {
    const setUser = jest.fn()
    ;(useRecoilState as jest.Mock).mockReturnValue([{ name: '新渡戸 稲造', team: null }, setUser])

    const { container } = renderTemplate()

    expect(screen.queryByText('PTで共有する')).not.toBeInTheDocument()
    expect(screen.queryByTestId('Switch_isShared')).not.toBeInTheDocument()
    expect(container).toMatchSnapshot()
  })
})

describe('snapshots', () => {
  it('最新のスナップショットに更新されている', () => {
    const { container } = renderTemplate()

    expect(container).toMatchSnapshot()
  })
})
