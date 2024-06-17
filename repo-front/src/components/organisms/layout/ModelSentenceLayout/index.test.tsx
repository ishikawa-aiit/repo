import { render, screen } from '@testing-library/react'

import { ModelSentenceLayout } from '.'

import { CreationTemplateType } from '@/components/templates/weekly-reports/CreationTemplate/type'

const modelSentence: CreationTemplateType.ModelSentencePropsType = {
  name: 'doneActivity',
  modelSentence: 'これまでの活動と成果の実績',
}

const explainSentence: CreationTemplateType.ExplainSentencePropsType = {
  name: 'selectTemplate',
  explainSentence: 'テンプレートを選択できます',
}

const testText1 = '子コンポーネント1'
const testExplainComponent = <div style={{ gridArea: 'selectTemplate_left' }}>{testText1}</div>
const testText2 = '子コンポーネント2'
const testModelComponent = <div style={{ gridArea: 'doneActivity_left' }}>{testText2}</div>

describe('props:children', () => {
  it('子コンポーネントが正常にレンダリングされている', () => {
    const { container } = render(
      <ModelSentenceLayout modelSentences={[modelSentence]} explainSentences={[explainSentence]}>
        {testExplainComponent}
        {testModelComponent}
      </ModelSentenceLayout>,
    )

    expect(screen.getByText(testText1)).toBeInTheDocument()
    expect(screen.getByText(testText2)).toBeInTheDocument()
    expect(container).toMatchSnapshot()
  })
})

describe('ModelSentenceLayout', () => {
  it('テンプレートの特徴文と例文が正常にレンダリングされている', () => {
    const { container } = render(
      <ModelSentenceLayout modelSentences={[modelSentence]} explainSentences={[explainSentence]}>
        {testExplainComponent}
        {testModelComponent}
      </ModelSentenceLayout>,
    )

    expect(screen.getByText(explainSentence.explainSentence)).toBeInTheDocument()
    expect(screen.getByText(modelSentence.modelSentence)).toBeInTheDocument()
    expect(container).toMatchSnapshot()
  })
})
