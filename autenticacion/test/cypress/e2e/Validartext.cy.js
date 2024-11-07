
// YA

describe('My First Test', () => {
    it('finds the content "type"', () => {
      cy.visit('http://localhost:5173')
  
      cy.contains('Conéctate')
    })
  })