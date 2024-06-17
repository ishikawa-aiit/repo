describe('APIとの通信確認', () => {
  it('アクセスした際に、通信失敗のアラートが表示されない', () => {
    cy.visit('/')

    cy.get('.chakra-alert').should('not.exist')
  })
})
