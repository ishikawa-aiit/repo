import 'cypress-localstorage-commands'

import { reportWeekSelectOptions, selectors } from '../constants'
import { createWeeklyReportInputs } from '../helpers'

describe('週報閲覧', () => {
  beforeEach(() => {
    cy.login({ reset: true })
  })

  it('週報が0件のときは、リストサイドバーが表示されない', () => {
    cy.visit('weekly-reports/list')

    cy.get('[data-cy=ListSidebar]').should('not.exist')
  })

  it('週報一覧ページで週報をコピーできる', { browser: 'electron' }, () => {
    cy.visit('weekly-reports/create')

    const inputs = createWeeklyReportInputs()

    inputs.forEach((item) => {
      cy.get(`${item.type}[name=${item.name}]`).type(item.value)
    })

    cy.get('select[name="requirementId"]').select(reportWeekSelectOptions.select2.id)
    cy.get('button[type=submit]').click()
    cy.url({ timeout: 15000 }).should('include', 'weekly-reports/list')

    cy.get(selectors.indexWeeklyReport.card, { timeout: 15000 })
      .first()
      .find(selectors.indexWeeklyReport.copyButton)
      .each((element, index) => {
        cy.wrap(element)
          .click()
          .then(() => {
            cy.get('.chakra-alert', { timeout: 10000 }).should('be.visible')
            cy.task('getClipboard').should('eq', inputs[index].value)
          })
      })
  })

  it('自身の週報のみ閲覧できる', () => {
    const currentUser = 'test@example.com'
    const otherUser = 'other-user@example.com'

    cy.login({ email: otherUser })
    cy.visit('weekly-reports/create')

    const inputsOther = createWeeklyReportInputs(otherUser)

    inputsOther.forEach((item) => {
      cy.get(`${item.type}[name=${item.name}]`).type(item.value)
    })

    cy.get('select[name="requirementId"]').select(reportWeekSelectOptions.select2.id)
    cy.get('button[type=submit]').click()
    cy.url({ timeout: 15000 }).should('include', 'weekly-reports/list')

    cy.login()
    cy.visit('weekly-reports/create')

    const inputs = createWeeklyReportInputs(currentUser)

    inputs.forEach((item) => {
      cy.get(`${item.type}[name=${item.name}]`).type(item.value)
    })

    cy.get('select[name="requirementId"]').select(reportWeekSelectOptions.select2.id)
    cy.get('button[type=submit]').click()
    cy.url({ timeout: 15000 }).should('include', 'weekly-reports/list')

    cy.get(selectors.indexWeeklyReport.card, { timeout: 15000 }).should('contain', currentUser)
    cy.get(selectors.indexWeeklyReport.card, { timeout: 15000 }).should('not.contain', otherUser)
  })

  it('週報が1件以上のときは、リストサイドバーから週報へ飛べる', () => {
    const inputs = createWeeklyReportInputs()
    const reportWeek = reportWeekSelectOptions.select1.id

    // 一番下の週報が画面から外れるまで、週報を作成する
    for (let i = 0; i < 2; i++) {
      cy.visit('weekly-reports/create')
      cy.get('select[name="requirementId"]').select(reportWeek)
      inputs.forEach((item) => {
        cy.get(`${item.type}[name=${item.name}]`).invoke('val', item.value).type('!')
      })
      cy.get('button[type=submit]').click()
      cy.url({ timeout: 15000 }).should('include', 'weekly-reports/list')
    }

    // 一番下の週報が画面に表示されていないが、リストサイドバーの報告週をクリックすることで画面に表示される
    cy.get('[data-cy=Card]').last().isNotInViewport()
    cy.get('[data-cy=ListSidebarMenuItem]').last().click()
    cy.get('[data-cy=Card]').last().isInViewport()
  })
})

describe('週報のソート', () => {
  it('週報作成を作成した際に週報が報告週の降順で表示される', () => {
    const createWeeklyReport = (requirementId: string) => {
      cy.visit('/weekly-reports/create')

      const inputs = createWeeklyReportInputs()

      inputs.forEach((item) => {
        cy.get(`${item.type}[name=${item.name}]`).type(item.value)
      })

      cy.get('select[name="requirementId"]').select(requirementId)
      cy.get('button[type=submit]').click()
    }

    const older = reportWeekSelectOptions.select1
    const later = reportWeekSelectOptions.select2

    cy.login({ reset: true })

    createWeeklyReport(later.id)
    cy.url().should('include', 'weekly-reports/list')

    createWeeklyReport(older.id)
    cy.url().should('include', 'weekly-reports/list#1')

    cy.get(selectors.indexWeeklyReport.listSidebar).children().eq(0).should('contain', later.display)
    cy.get(selectors.indexWeeklyReport.listSidebar).children().eq(1).should('contain', older.display)
  })
})
