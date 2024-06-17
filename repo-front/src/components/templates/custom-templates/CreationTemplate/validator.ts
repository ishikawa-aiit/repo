import * as Yup from 'yup'

import { templateCharacterLimitConst, getValidationErrorMessage } from './constants'
import { CustomTemplateType } from './type'

const { MAX_INPUT, MAX_TEXTAREA } = templateCharacterLimitConst

// バリデーションエラーメッセージ定義
Yup.setLocale({
  mixed: {
    required: getValidationErrorMessage('REQUIRE'),
  },
  string: {
    max: ({ max }) => {
      return getValidationErrorMessage('MAX', max)
    },
  },
})

/**
 * カスタムテンプレートページのバリデーションスキーマ
 */
export const templateValidationSchema: Yup.SchemaOf<Omit<CustomTemplateType.Inputs, 'id' | 'isShared'>> =
  Yup.object().shape({
    name: Yup.string().trim().max(MAX_INPUT).required(),
    activityTime: Yup.string().max(MAX_TEXTAREA),
    doneActivity: Yup.string().max(MAX_TEXTAREA),
    todoActivity: Yup.string().max(MAX_TEXTAREA),
    solution: Yup.string().max(MAX_TEXTAREA),
    event: Yup.string().max(MAX_TEXTAREA),
    remark: Yup.string().max(MAX_TEXTAREA),
    isShared: Yup.boolean(),
  })
