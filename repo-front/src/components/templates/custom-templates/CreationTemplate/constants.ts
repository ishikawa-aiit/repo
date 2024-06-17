import { CustomTemplateType } from './type'

import { CustomTemplateTypes } from '@/components/types'

/**
 * テンプレートのInputコンポーネントを作成する時用
 */
export const templateInputProps: CustomTemplateType.TemplateFormElementsPropType[] = [
  {
    name: 'name',
    label: 'テンプレート名',
    placeholder: 'テンプレートの名前を入力してください',
  },
]

/**
 * テンプレートのTextareaコンポーネントを作成する時用
 */
export const templateTextareaProps: CustomTemplateType.TemplateFormElementsPropType[] = [
  {
    name: 'activityTime',
    label: '活動時間',
    placeholder: '今週の活動とそれにかかった時間を記述してください',
  },
  {
    name: 'doneActivity',
    label: '今週の活動と成果の実績',
    placeholder: '今週のチーム及び個人の活動と、その結果の成果物の状況を記述してください',
  },
  {
    name: 'todoActivity',
    label: '来週の活動と成果の予定',
    placeholder: '次週のチーム及び個人の活動の目標と期待される成果物について、計画を記述してください',
  },
  {
    name: 'solution',
    label: '課題と解決策',
    placeholder: '今週発生した課題と、今週解決した課題及びその解決策を記述してください',
  },
  {
    name: 'event',
    label: 'できごと・気づき',
    placeholder: 'プロジェクト全体で、印象に残る出来事や自分の気づきについて記述してください',
  },
  {
    name: 'remark',
    label: '特記事項',
    placeholder: '他の項目での記述内容以外で報告したい事柄等について記述してください',
  },
]

/**
 * 例文を作成する時用
 */
export const modelSentences: CustomTemplateType.ModelSentencePropsType[] = [
  {
    name: 'name',
    modelSentence: 'チームと個人テンプレート',
  },
  {
    name: 'activityTime',
    modelSentence: 'チーム作業: ○時間○分\n個人作業: ○時間○分',
  },
  {
    name: 'doneActivity',
    modelSentence: 'チームの活動と成果の実績\n・\n・\n・\n\n個人の活動と成果の実績\n・\n・\n・',
  },
  {
    name: 'todoActivity',
    modelSentence: 'チームの活動と成果の予定\n・\n・\n・\n\n個人の活動と成果の予定\n・\n・\n・',
  },
  {
    name: 'solution',
    modelSentence: 'チームの課題と解決策\n課題: \n解決策: \n\n個人の課題と解決策\n課題: \n解決策: ',
  },
  {
    name: 'event',
    modelSentence: 'チームのできごと・気づき\n・\n・\n\n個人のできごと・気づき\n・\n・',
  },
  {
    name: 'remark',
    modelSentence: 'チームの特記事項\n・\n\n個人の特記事項\n・',
  },
]

/**
 * テンプレートのSelectコンポーネントを作成する時用
 */
export const customTemplateSelectProp: CustomTemplateType.TemplateFormElementsPropType = {
  name: 'id',
  label: '編集対象のテンプレート',
}

/**
 * 説明文を作成する時用
 */
export const explainSentences: CustomTemplateType.ExplainSentencePropsType[] = [
  {
    name: 'selectTemplate',
    explainSentence:
      '「新規作成」を選択すると、テンプレートを新規作成することができます。テンプレート名を選択すると、テンプレートを編集することができます。テンプレートを選択すると内容をフォームに反映します。 自身が作成した週報のみ編集可能です。',
  },
  {
    name: 'shareSwitch',
    explainSentence: '',
  },
]

/**
 * 新規作成用テンプレート
 */
export const templateForNewCreate: CustomTemplateTypes.CustomTemplateProps = {
  id: null,
  name: '新規作成',
  activityTime: '',
  doneActivity: '',
  todoActivity: '',
  solution: '',
  event: '',
  remark: '',
  team: null,
}

/**
 * PT共有フラグコンポーネントを作成するとき用
 * teamなしで不活性化するため単独で作成
 */
export const isSharedProp: CustomTemplateType.TemplateFormElementsPropType = { name: 'isShared', label: 'PTで共有する' }

/**
 * INPUTとTEXTAREAの最大入力文字数
 */
export const templateCharacterLimitConst = {
  MAX_INPUT: 250,
  MAX_TEXTAREA: 16000,
} as const

/**
 * バリデーションエラーメッセージ
 */
type validationType = 'MAX' | 'REQUIRE'

export const getValidationErrorMessage = (type: validationType, numOfChars = 0) => {
  switch (type) {
    case 'REQUIRE':
      return '必ず入力してください'
    case 'MAX':
      return `${numOfChars}文字以内で入力してください`
  }
}
