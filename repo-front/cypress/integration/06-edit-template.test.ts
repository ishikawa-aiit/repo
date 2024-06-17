import 'cypress-localstorage-commands'

import { selectors } from '../constants'
import { createCustomTemplateInputs, getTime } from '../helpers'

describe('テンプレート編集', () => {
  const updateCustomTemplateInputs = (overwrittenTemplateName = 'upカスタムテンプレート') => {
    return [
      { type: 'input', name: 'name', value: overwrittenTemplateName },
      { type: 'textarea', name: 'activityTime', value: 'up協働作業: ◯時間 各自作業: ◯時間' },
      { type: 'textarea', name: 'doneActivity', value: 'up（テンプレート）いろいろやります' },
      { type: 'textarea', name: 'todoActivity', value: 'up（テンプレート）いろいろやりました' },
      { type: 'textarea', name: 'solution', value: 'up（テンプレート）いろいろな問題がおきました' },
      { type: 'textarea', name: 'event', value: 'up（テンプレート）いろいろなことがありました' },
      { type: 'textarea', name: 'remark', value: 'up（テンプレート）なし' },
    ]
  }

  beforeEach(() => {
    cy.login({ reset: true })
  })

  it('テンプレートを編集できる', () => {
    const templateName = 'カスタムテンプレート' + getTime()
    const inputs = createCustomTemplateInputs(templateName)
    const updateTemplateName = 'upカスタムテンプレート'
    const updateInputs = updateCustomTemplateInputs(updateTemplateName)

    // 編集対象のテンプレートの作成
    cy.visit('custom-templates/create')
    inputs.forEach((item) => {
      cy.get(`${item.type}[name=${item.name}]`).type(item.value)
    })
    cy.get('button[type=submit]').click()
    cy.url().should('include', 'weekly-reports/create')

    // 編集対象のテンプレートを選択した際にデフォルト値にテンプレートの内容が入る
    cy.visit('custom-templates/create')
    cy.contains(`${selectors.createTemplate.templateSelect} > option`, templateName)
    cy.get(selectors.createTemplate.templateSelect).select(templateName)
    inputs.forEach((item) => {
      cy.get(`${item.type}[name=${item.name}]`).should('have.value', item.value)
    })

    // 編集したテンプレートを保存すると週報作成ページで編集したテンプレートがデフォルトで表示される
    updateInputs.forEach((item) => {
      cy.get(`${item.type}[name=${item.name}]`).clear()
      cy.get(`${item.type}[name=${item.name}]`).type(item.value)
    })
    cy.get('button[type=submit]').click()
    cy.contains(selectors.toast, 'テンプレートを編集しました。')
    cy.url().should('include', 'weekly-reports/create')
    cy.get(`${selectors.createWeeklyReport.templateSelect} option:selected`).should('have.text', updateTemplateName)
  })

  it('他人が共有したテンプレートは編集できない', () => {
    const templateName = 'カスタムテンプレート' + getTime()
    const inputs = createCustomTemplateInputs(templateName)
    const otherUser = 'other-user@example.com'

    // PT1 と関連付ける
    cy.visit('setting')
    cy.get(selectors.setting.teamSelect).select('飛田PT')
    cy.get('.chakra-alert').should('be.visible')

    // 共有テンプレートの作成
    cy.visit('custom-templates/create')
    cy.get(selectors.createTemplate.shareSwitch).click()
    inputs.forEach((item) => {
      cy.get(`${item.type}[name=${item.name}]`).type(item.value)
    })
    cy.get('button[type=submit]').click()
    cy.get('.chakra-alert').should('be.visible')

    // 別のユーザでログインし、元のユーザと同じPTと関連付ける
    cy.login({ email: otherUser })
    cy.visit('setting')
    cy.get(selectors.setting.teamSelect).select('飛田PT')
    cy.get('.chakra-alert').should('be.visible')

    // テンプレート編集で共有テンプレートが表示されない
    cy.visit('custom-templates/create')
    cy.get(`${selectors.createTemplate.templateSelect} > option`).should('not.contain', templateName)
  })

  it('テンプレートを選択したあとに新規作成に戻すと、内容がすべて空になる', () => {
    const templateName = 'カスタムテンプレート' + getTime()
    const inputs = createCustomTemplateInputs(templateName)
    const optionValueCreate = '新規作成'

    // 最初に選択するテンプレートを作成
    cy.visit('custom-templates/create')
    inputs.forEach((item) => {
      cy.get(`${item.type}[name=${item.name}]`).type(item.value)
    })
    cy.get('button[type=submit]').click()
    cy.get('.chakra-alert').should('be.visible')

    // 作成したテンプレートを選択する
    cy.visit('custom-templates/create')
    cy.contains(`${selectors.createTemplate.templateSelect} > option`, templateName)
    cy.get(selectors.createTemplate.templateSelect).select(templateName)
    inputs.forEach((item) => {
      cy.get(`${item.type}[name=${item.name}]`).should('have.value', item.value)
    })

    // 新規作成に戻すと内容が空になる
    cy.contains(`${selectors.createTemplate.templateSelect} > option`, optionValueCreate)
    cy.get(selectors.createTemplate.templateSelect).select(optionValueCreate)
    inputs.forEach((item) => {
      cy.get(`${item.type}[name=${item.name}]`).should('have.value', '')
    })
  })

  it('テンプレートを選択した後、共有PTスイッチを押すと、「保存する」ボタンが活性になる', () => {
    const templateName = 'カスタムテンプレート' + getTime()
    const inputs = createCustomTemplateInputs(templateName)

    // PT1 と関連付ける
    cy.visit('setting')
    cy.get(selectors.setting.teamSelect).select('飛田PT')
    cy.get('.chakra-alert').should('be.visible')

    // テンプレートを作成する
    cy.visit('custom-templates/create')
    inputs.forEach((item) => {
      cy.get(`${item.type}[name=${item.name}]`).type(item.value)
    })
    cy.get('button[type=submit]').click()
    cy.url().should('include', 'weekly-reports/create')

    // テンプレートを選択する
    cy.visit('custom-templates/create')
    cy.get(selectors.createTemplate.templateSelect).select(templateName)

    // 共有PTスイッチを押す
    cy.get(selectors.createTemplate.shareSwitch).click()

    // 「保存する」ボタンが活性化になる
    cy.get('button[type=submit]').should('be.enabled')
  })
})
