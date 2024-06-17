import { AtomKeys } from '@/contexts/global/atoms/keys'
import '@testing-library/cypress/add-commands'
import 'cypress-localstorage-commands'

// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('login', (body = {}) => {
  if (!body.email) {
    body.email = 'test@example.com'
  }
  if (body.reset === undefined) {
    body.reset = false
  }
  if (body.slack === undefined) {
    body.slack = false
  }

  cy.request({
    method: 'POST',
    url: '/api/auth/login/test',
    body,
  })
    .its('body')
    .then(({ token }) => {
      cy.setLocalStorage(AtomKeys.API_TOKEN_ATOM, JSON.stringify(token))
    })
})

Cypress.Commands.add('isInViewport', { prevSubject: 'element' }, (element) => {
  cy.window().then((window) => {
    const { documentElement } = window.document
    const bottom = documentElement.clientHeight
    const rect = element[0].getBoundingClientRect()
    expect(rect).to.satisfy((rect: DOMRect) => {
      // ページ内リンクで飛ぶとrect.topが-0.5の位置に飛ぶため-1に設定している
      return rect.top < bottom && rect.top > -1
    })
  })
})

Cypress.Commands.add('isNotInViewport', { prevSubject: 'element' }, (element) => {
  cy.window().then((window) => {
    const { documentElement } = window.document
    const bottom = documentElement.clientHeight
    const rect = element[0].getBoundingClientRect()
    expect(rect).to.satisfy((rect: DOMRect) => {
      // ページ内リンクで飛ぶとrect.topが-0.5の位置に飛ぶため-1に設定している
      return rect.top > bottom || rect.bottom < -1
    })
  })
})
