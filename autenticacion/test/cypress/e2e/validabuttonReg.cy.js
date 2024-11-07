
// ya
describe('Navigation Test', () => {
    it('should navigate to the registration page', () => {
      cy.visit('http://localhost:5173')
  
      cy.contains('Registrate').click()
      cy.url().should('include', '/auth/register')
      cy.contains('Inicia sesion para empezar a usar nuestros servicios').should('be.visible')
    })
  })
  