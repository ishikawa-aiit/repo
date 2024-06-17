import 'cypress-localstorage-commands'

import { selectors } from '../constants'

describe('ログイン機能', () => {
  beforeEach(() => {
    cy.login()
  })

  it('ログイン済みであれば、/weekly-reports/createに遷移される', () => {
    cy.visit('/')
    cy.get(selectors.top.linkToCreationPage).click()

    cy.url({ timeout: 15000 }).should('include', '/weekly-reports/create')
  })
})
