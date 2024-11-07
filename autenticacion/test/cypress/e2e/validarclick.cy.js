
// ya
describe('My First Test', () => {
    it('clicks the link "type"', () => {
      cy.visit('http://localhost:5173')
  
      cy.contains('Iniciar').click()
    })
  })