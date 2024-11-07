
// YA
describe('Login Test', () => {
    it('should log in with valid credentials', () => {
      cy.visit('http://localhost:5173')
      
      cy.get('input[name="email"]').type('prueba1@gmail.com')
      cy.get('input[name="password"]').type('prueba1')
      cy.get('button[type="submit"]').click()
  
      cy.url().should('include', 'app/home')
      
    })
  })
  