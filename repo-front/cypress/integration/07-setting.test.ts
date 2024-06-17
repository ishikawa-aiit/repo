import 'cypress-localstorage-commands'

import { selectors } from '../constants'

describe('所属PT設定', () => {
  it('所属PTを設定できる', () => {
    cy.login({ reset: true })
    cy.visit('setting')
    cy.get(selectors.setting.teamSelect).select('1')

    cy.get('.chakra-alert', { timeout: 10000 }).should('be.visible')

    cy.visit('setting')

    cy.get(selectors.setting.teamSelect).select('1').should('have.value', '1')
  })

  it('所属PTを設定解除できる', () => {
    cy.login({ reset: true })
    cy.visit('setting')
    cy.get(selectors.setting.teamSelect).select('1')

    cy.get('.chakra-alert', { timeout: 10000 }).should('be.visible')

    cy.visit('setting')
    cy.get(selectors.setting.teamSelect).select('PT未所属')

    cy.get('.chakra-alert', { timeout: 10000 }).should('be.visible')

    cy.visit('setting')

    cy.contains(`${selectors.setting.teamSelect} > option`, 'PT未所属')
  })
})

describe('Slack設定', () => {
  it('Slack未設定の場合はSlack設定ボタンが表示される', () => {
    cy.login({ reset: true })
    cy.visit('setting')
    cy.get(selectors.setting.slackSettingStatus).should('contain', '未設定')
    cy.get(selectors.setting.slackSettingButton).should('be.enabled')
  })

  it.only('Slack設定済みの場合はSlack設定ボタンが表示されない', () => {
    cy.login({ reset: true, slack: true })
    cy.visit('setting')
    cy.get(selectors.setting.slackSettingStatus).should('contain', '設定済み')
    cy.get(selectors.setting.slackSettingButton).should('not.exist')
  })
})
