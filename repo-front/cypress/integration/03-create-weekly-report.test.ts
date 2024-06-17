import 'cypress-localstorage-commands'

import { reportWeekSelectOptions, selectors } from '../constants'
import { createCustomTemplateInputs, createWeeklyReportInputs } from '../helpers'

describe('週報作成', () => {
  beforeEach(() => {
    cy.login({ reset: true })
    cy.visit('/weekly-reports/create')
  })

  const otherUser = 'other-user@example.com'
  const shareTemplateName = '共有テンプレート'
  const newShareTemplateName = '共有テンプレート_2'
  const listTemplate = new Array(3).fill('・').join('\n')
  const templateSelectOptions = 'チームと個人'
  const templates = [
    {
      name: 'activityTime',
      sentence: 'チーム作業: ○時間○分\n個人作業: ○時間○分',
    },
    {
      name: 'doneActivity',
      sentence: `チームの活動と成果の実績\n${listTemplate}\n\n個人の活動と成果の実績\n${listTemplate}`,
    },
    {
      name: 'todoActivity',
      sentence: `チームの活動と成果の予定\n${listTemplate}\n\n個人の活動と成果の予定\n${listTemplate}`,
    },
    {
      name: 'solution',
      sentence: 'チームの課題と解決策\n課題: \n解決策: \n\n個人の課題と解決策\n課題: \n解決策: ',
    },
    {
      name: 'event',
      sentence: `チームのできごと・気づき\n${listTemplate}\n\n個人のできごと・気づき\n${listTemplate}`,
    },
    {
      name: 'remark',
      sentence: 'チームの特記事項\nなし\n\n個人の特記事項\nなし',
    },
  ]

  const shouldFillWithTemplate = () => {
    templates.forEach((template) => {
      cy.get(`textarea[name="${template.name}"]`).should('have.value', template.sentence)
    })
  }

  const inputs1 = createWeeklyReportInputs()
  const inputs2 = createWeeklyReportInputs()

  it('週報作成ページでフォームに入力をして週報を作成できる', () => {
    inputs1.forEach((item) => {
      cy.get(`${item.type}[name=${item.name}]`).type(item.value)
    })

    cy.get('select[name="requirementId"]').select(reportWeekSelectOptions.select1.id)
    cy.get('button[type=submit]').click()
    cy.url({ timeout: 15000 }).should('include', 'weekly-reports/list')

    inputs1.forEach((item) => {
      cy.get(selectors.indexWeeklyReport.card, { timeout: 15000 }).should('contain', item.value)
    })

    cy.get(selectors.indexWeeklyReport.card, { timeout: 15000 }).should(
      'contain',
      reportWeekSelectOptions.select1.display,
    )
  })

  it('複数の週報を作成できる', () => {
    inputs1.forEach((item) => {
      cy.get(`${item.type}[name=${item.name}]`).type(item.value)
    })

    cy.get('select[name="requirementId"]').select(reportWeekSelectOptions.select1.id)
    cy.get('button[type=submit]').click()
    cy.url({ timeout: 15000 }).should('include', 'weekly-reports/list')

    cy.visit('/weekly-reports/create')

    inputs2.forEach((item) => {
      cy.get(`${item.type}[name=${item.name}]`).type(item.value)
    })

    cy.get('select[name="requirementId"]').select(reportWeekSelectOptions.select2.id)
    cy.get('button[type=submit]').click()
    cy.url({ timeout: 15000 }).should('include', 'weekly-reports/list')

    inputs1.forEach((item) => {
      cy.get(selectors.indexWeeklyReport.card, { timeout: 15000 }).should('contain', item.value)
    })
    inputs2.forEach((item) => {
      cy.get(selectors.indexWeeklyReport.card, { timeout: 15000 }).should('contain', item.value)
    })

    cy.get(selectors.indexWeeklyReport.card, { timeout: 15000 }).should(
      'contain',
      reportWeekSelectOptions.select1.display,
    )
    cy.get(selectors.indexWeeklyReport.card, { timeout: 15000 }).should(
      'contain',
      reportWeekSelectOptions.select2.display,
    )
  })

  it('週報作成ページで「チームと個人」のテンプレートを反映できる', () => {
    cy.get(selectors.createWeeklyReport.templateSelect).select(templateSelectOptions)
    cy.get(selectors.createWeeklyReport.applyTemplateButton).click()

    shouldFillWithTemplate()
  })

  it('週報作成ページで入力済みの場合はモーダルが表示される。「反映する」ボタンをクリックするとテンプレートが反映される', () => {
    const modalApplyButton = '[data-cy=TemplateModalApplyButton]'

    cy.get(selectors.createWeeklyReport.activityTimeField).type('a')
    cy.get(selectors.createWeeklyReport.templateSelect).select(templateSelectOptions)
    cy.get(selectors.createWeeklyReport.applyTemplateButton).click()

    cy.get(selectors.createWeeklyReport.templateModal).should('be.visible')
    cy.get(modalApplyButton).click()

    shouldFillWithTemplate()
  })

  it('週報作成ページで入力済みの場合はモーダルが表示される。「やめる」ボタンをクリックするとテンプレートが反映されない', () => {
    const modalCancelButton = '[data-cy=TemplateModalCancelButton]'

    cy.get(selectors.createWeeklyReport.activityTimeField).type('a')
    cy.get(selectors.createWeeklyReport.templateSelect).select(templateSelectOptions)
    cy.get(selectors.createWeeklyReport.applyTemplateButton).click()

    cy.get(selectors.createWeeklyReport.templateModal).should('be.visible')
    cy.get(modalCancelButton).click()

    templates.forEach((template) => {
      if (template.name === 'activityTime') {
        cy.get(selectors.createWeeklyReport.activityTimeField).should('have.value', 'a')
        return
      }

      cy.get(`textarea[name="${template.name}"]`).should('have.value', '')
    })
  })

  it('自身が作成したテンプレートのみを反映できる', () => {
    const currentUser = 'test@example.com'
    const otherUser = 'other-user@example.com'

    cy.login({ email: otherUser })
    cy.visit('custom-templates/create')

    const inputsOther = createCustomTemplateInputs(otherUser)

    inputsOther.forEach((item) => {
      cy.get(`${item.type}[name=${item.name}]`).type(item.value)
    })

    cy.get('button[type=submit]').click()
    cy.url({ timeout: 15000 }).should('include', 'weekly-reports/create')

    cy.login()
    cy.visit('custom-templates/create', { timeout: 15000 })

    const inputs = createCustomTemplateInputs(currentUser)

    inputs.forEach((item) => {
      cy.get(`${item.type}[name=${item.name}]`).type(item.value)
    })

    cy.get('button[type=submit]').click()
    cy.url({ timeout: 15000 }).should('include', 'weekly-reports/create')

    cy.get(selectors.createWeeklyReport.templateSelect).select(currentUser).should('have.value', currentUser)
    cy.get(`${selectors.createWeeklyReport.templateSelect} option:contains(${otherUser})`).should('not.exist')
  })

  it('同じPTのユーザーは共有されたテンプレートを選択できる', () => {
    const inputs = createCustomTemplateInputs(shareTemplateName)
    cy.visit('setting')
    cy.get(selectors.setting.teamSelect).select('1')

    cy.visit('custom-templates/create')
    cy.get(selectors.createTemplate.shareSwitch).click()
    inputs.forEach((item) => {
      cy.get(`${item.type}[name=${item.name}]`).type(item.value)
    })
    cy.get('button[type=submit]').click()

    cy.login({ email: otherUser })
    cy.visit('setting')
    cy.get(selectors.setting.teamSelect).select('1')
    cy.visit('weekly-reports/create')

    cy.get(selectors.createWeeklyReport.templateSelect)
      .select(shareTemplateName)
      .should('have.value', shareTemplateName)
  })

  it('異なるPTのユーザーは共有されたテンプレートを選択できない', () => {
    const inputs = createCustomTemplateInputs(newShareTemplateName)

    cy.login({ email: otherUser })
    cy.visit('setting')
    cy.get(selectors.setting.teamSelect).select('2')

    cy.visit('custom-templates/create')
    cy.get(selectors.createTemplate.shareSwitch).click()
    inputs.forEach((item) => {
      cy.get(`${item.type}[name=${item.name}]`).type(item.value)
    })
    cy.get('button[type=submit]').click()

    cy.login()
    cy.visit('setting')
    cy.get(selectors.setting.teamSelect).select('3')
    cy.visit('weekly-reports/create')

    cy.get(`${selectors.createWeeklyReport.templateSelect} option:contains(${newShareTemplateName})`).should(
      'not.exist',
    )
  })
})

describe('報告週の自動入力', () => {
  beforeEach(() => {
    cy.login()
    cy.visit('/weekly-reports/create')
  })

  it('日付が4月10日であれば、「04/04 ~ 04/09」が報告週に表示される', () => {
    cy.clock(new Date('2022-04-10T00:00:00+09:00'), ['Date'])
    cy.get('select[name="requirementId"] option:selected').should('have.text', '04/04 ~ 04/09')
  })

  it('日付が4月17日であれば、「04/04 ~ 04/09」が報告週に表示される（締め切りが前の週優先）', () => {
    cy.clock(new Date('2022-04-17T23:59:59+09:00'), ['Date'])
    cy.get('select[name="requirementId"] option:selected').should('have.text', '04/04 ~ 04/09')
  })

  it('日付が4月18日であれば、「04/11 ~ 04/16」が報告週に表示される', () => {
    cy.clock(new Date('2022-04-18T00:00:00+09:00'), ['Date'])
    cy.get('select[name="requirementId"] option:selected').should('have.text', '04/11 ~ 04/16')
  })

  it('日付が4月9日であれば、「選択してください」が報告週に表示される', () => {
    cy.clock(new Date('2022-04-09T23:59:59+09:00'), ['Date'])
    cy.get('select[name="requirementId"] option:selected').should('have.text', '選択してください')
  })

  it('日付が2月8日であれば、「01/30 ~ 01/31」が報告週に表示される', () => {
    cy.clock(new Date('2023-02-08T23:59:59+09:00'), ['Date'])
    cy.get('select[name="requirementId"] option:selected').should('have.text', '01/30 ~ 01/31')
  })

  it('日付が2月9日であれば、「選択してください」が報告週に表示される', () => {
    cy.clock(new Date('2023-02-09T00:00:00+09:00'), ['Date'])
    cy.get('select[name="requirementId"] option:selected').should('have.text', '選択してください')
  })

  it('日付が8月4日であれば、「07/25 ~ 07/30」が報告週に表示される(例外の報告週)', () => {
    cy.clock(new Date('2022-08-04T00:00:00+09:00'), ['Date'])
    cy.get('select[name="requirementId"] option:selected').should('have.text', '07/25 ~ 07/30')
  })

  it('日付が8月14日であれば、「08/01 ~ 08/03」が報告週に表示される', () => {
    cy.clock(new Date('2022-08-14T23:59:59+09:00'), ['Date'])
    cy.get('select[name="requirementId"] option:selected').should('have.text', '08/01 ~ 08/03')
  })

  it('日付が8月15日であれば、「選択してください」が報告週に表示される', () => {
    cy.clock(new Date('2022-08-15T00:00:00+09:00'), ['Date'])
    cy.get('select[name="requirementId"] option:selected').should('have.text', '選択してください')
  })

  it('日付が10月8日であれば、「選択してください」が報告週に表示される', () => {
    cy.clock(new Date('2022-10-08T23:59:59+09:00'), ['Date'])
    cy.get('select[name="requirementId"] option:selected').should('have.text', '選択してください')
  })

  it('日付が10月9日であれば、「10/03 ~ 10/08」が報告週に表示される', () => {
    cy.clock(new Date('2022-10-09T00:00:00+09:00'), ['Date'])
    cy.get('select[name="requirementId"] option:selected').should('have.text', '10/03 ~ 10/08')
  })

  it('日付が12月29日であれば、「12/19 ~ 12/24」が報告週に表示される(例外の報告週)', () => {
    cy.clock(new Date('2022-12-29T00:00:00+09:00'), ['Date'])
    cy.get('select[name="requirementId"] option:selected').should('have.text', '12/19 ~ 12/24')
  })

  it('日付が1月8日であれば、「12/26 ~ 12/28」が報告週に表示される(例外の報告週)', () => {
    cy.clock(new Date('2023-01-08T23:59:59+09:00'), ['Date'])
    cy.get('select[name="requirementId"] option:selected').should('have.text', '12/26 ~ 12/28')
  })

  it('日付が1月12日であれば、「01/04 ~ 01/07」が報告週に表示される(例外の報告週)', () => {
    cy.clock(new Date('2023-01-12T00:00:00+09:00'), ['Date'])
    cy.get('select[name="requirementId"] option:selected').should('have.text', '01/04 ~ 01/07')
  })

  it('日付が1月15日であれば、「01/04 ~ 01/07」が報告週に表示される(例外の報告週)', () => {
    cy.clock(new Date('2023-01-15T23:59:59+09:00'), ['Date'])
    cy.get('select[name="requirementId"] option:selected').should('have.text', '01/04 ~ 01/07')
  })
})
