import 'cypress-localstorage-commands'

import { selectors } from '../constants'
import { createCustomTemplateInputs } from '../helpers'

import {
  getValidationErrorMessage,
  templateCharacterLimitConst,
} from '@/components/templates/custom-templates/CreationTemplate/constants'

describe('テンプレート作成', () => {
  const templateName = 'カスタムテンプレート'
  const inputs = createCustomTemplateInputs(templateName)
  const inputField = 'input[name=name]'
  const { MAX_INPUT, MAX_TEXTAREA } = templateCharacterLimitConst

  beforeEach(() => {
    cy.login({ reset: true })
  })

  it('フォームに入力をしてテンプレートを作成できる', () => {
    cy.visit('custom-templates/create')

    cy.get(selectors.createTemplate.templateSelect).find('option:selected').should('have.text', '新規作成')

    inputs.forEach((item) => {
      cy.get(`${item.type}[name=${item.name}]`).type(item.value)
    })

    cy.get('button[type=submit]').click()
    cy.contains(selectors.toast, 'テンプレートを作成しました。')
    cy.url({ timeout: 15000 }).should('include', 'weekly-reports/create')

    cy.get(selectors.createWeeklyReport.templateSelect).select(templateName).should('have.value', templateName)
  })

  it('入力のバリデーションチェックが通れば、「保存する」ボタンが活性になる', () => {
    cy.visit('custom-templates/create')
    cy.get(inputField)
      .invoke('val', 'a'.repeat(MAX_INPUT - 1))
      .type('!')

    cy.get('button[type=submit]').should('be.enabled')
  })

  it('必須フィールドに入力しないと、バリデーションエラーメッセージとして「必ず入力してください」と表示され、「保存する」ボタンが非活性になる', () => {
    cy.visit('custom-templates/create')
    cy.get(inputField).type('a').clear()

    cy.get('[data-cy=ValidationErrorMessage]').should('have.text', getValidationErrorMessage('REQUIRE'))
    cy.get('button[type=submit]').should('be.disabled')
  })

  it('必須フィールドに空白のみを入力すると、バリデーションエラーメッセージとして「必ず入力してください」と表示され、「保存する」ボタンが非活性になる', () => {
    cy.visit('custom-templates/create')
    cy.get(inputField).type(' ')

    cy.get('[data-cy=ValidationErrorMessage]').should('have.text', getValidationErrorMessage('REQUIRE'))
    cy.get('button[type=submit]').should('be.disabled')
  })

  it('任意の入力フィールドに251文字入力したならば、バリデーションエラーメッセージとして「250文字以内で入力してください」と表示され、「保存する」ボタンが非活性になる', () => {
    cy.visit('custom-templates/create')
    cy.get(inputField).invoke('val', 'a'.repeat(MAX_INPUT)).type('!')

    cy.get('button[type=submit]').should('be.disabled')
    cy.get('[data-cy=ValidationErrorMessage]').should('have.text', getValidationErrorMessage('MAX', MAX_INPUT))
  })

  it('任意のテキストエリアに16001文字入力したならば、バリデーションエラーメッセージとして「16000文字以内で入力してください」と表示され、「保存する」ボタンが非活性になる', () => {
    const inputs = createCustomTemplateInputs().slice(1) // テンプレート名以外

    cy.visit('custom-templates/create')
    inputs.forEach((item) => {
      cy.get(`${item.type}[name=${item.name}]`).invoke('val', 'a'.repeat(MAX_TEXTAREA)).type('!')
      cy.get('button[type=submit]').should('be.disabled')
      cy.get('[data-cy=ValidationErrorMessage]').should('have.text', getValidationErrorMessage('MAX', MAX_TEXTAREA))
      cy.get(`${item.type}[name=${item.name}]`).clear()
    })
  })

  it('テンプレート作成時にPBLで共有する設定を使用できる', () => {
    cy.visit('setting')
    cy.get(selectors.setting.teamSelect).select('1')

    cy.visit('custom-templates/create')

    cy.get(selectors.createWeeklyReport.shareSwitch).should('exist')
  })

  it('テンプレート作成時にPTに所属していない場合はPBLで共有する設定を使用できない', () => {
    cy.visit('custom-templates/create')

    cy.get(selectors.createWeeklyReport.shareSwitch).should('not.exist')
  })
})
