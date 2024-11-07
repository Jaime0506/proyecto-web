

// ya
describe('Login Test', () => {
    it('should log in with valid credentials', () => {
      cy.visit('http://localhost:5173')
      
    cy.contains('Conéctate').click()
      cy.url().should('include', 'auth/login')
      
    })
  })
  