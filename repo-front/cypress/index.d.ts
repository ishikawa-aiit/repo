/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable<Subject> {
    /**
     * テスト用のAPIでログインする
     */
    login(args?: { email?: string; reset?: boolean; slack?: boolean }): Chainable<Subject>

    /**
     * 要素がViewport内に含まれているか確認
     */
    isInViewport(): Chainable<Subject>

    /**
     * 要素がViewport内に含まれてないか確認
     */
    isNotInViewport(): Chainable<Subject>
  }
}
