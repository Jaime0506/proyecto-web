
// ya
describe('User Registration Test', () => {
    it('should register a new user', () => {
      cy.visit('http://localhost:5173')
      cy.contains('Registrate').click()
      
      cy.get('input[name="email"]').type('prueba18@gmail.com')
      cy.get('input[name="password"]').type('prueba18')
      cy.get('input[name="rPassword"]').type('prueba18')
      cy.contains('Registrate').click()
  
      

    
    
  
      cy.url().should('include', 'app/home')
    
    
    
    })
  })
  