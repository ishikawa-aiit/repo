import { Input } from '@chakra-ui/react'
import { screen, render, within } from '@testing-library/react'
import { FieldError } from 'react-hook-form'

import { FormControl } from '.'

const labelText = 'サンプルテキスト'

describe('props:children', () => {
  it('正常にレンダリングされている', () => {
    const { container } = render(
      <FormControl label={labelText}>
        <Input />
      </FormControl>,
    )

    const { getByText } = within(screen.getByTestId('FormControl'))

    expect(getByText(labelText)).toBeInTheDocument()
    expect(container).toMatchSnapshot()
  })
})

describe('props:isRequired', () => {
  it('trueの場合、フィールドが入力必須になる', () => {
    const { container } = render(
      <FormControl label={labelText} isRequired={true}>
        <Input data-testid="Input" />
      </FormControl>,
    )

    expect(screen.getByTestId('Input')).toBeRequired()
    expect(container).toMatchSnapshot()
  })

  it('falseの場合、フィールドが入力任意になる', () => {
    const { container } = render(
      <FormControl label={labelText} isRequired={false}>
        <Input data-testid="Input" />
      </FormControl>,
    )

    expect(screen.getByTestId('Input')).not.toBeRequired()
    expect(container).toMatchSnapshot()
  })
})

describe('props:error', () => {
  it('バリデーションエラーが発生した場合、バリデーションエラー文が表示される', () => {
    const sampleError: FieldError = {
      type: 'sample',
      message: 'sampleMessage',
    }
    const { container } = render(
      <FormControl label={labelText} isRequired={true} error={sampleError}>
        <Input data-testid="Input" />
      </FormControl>,
    )

    const { getByText } = within(screen.getByTestId('FormControl'))

    expect(getByText(sampleError.message as string)).toBeInTheDocument()
    expect(container).toMatchSnapshot()
  })

  it('バリデーションエラーが発生していない場合、バリデーションエラー文が表示されない', () => {
    const message = 'sampleMessage'

    const { container } = render(
      <FormControl label={labelText} isRequired={false}>
        <Input data-testid="Input" />
      </FormControl>,
    )

    const { queryByText } = within(screen.getByTestId('FormControl'))

    expect(queryByText(message)).not.toBeInTheDocument()
    expect(container).toMatchSnapshot()
  })
})
