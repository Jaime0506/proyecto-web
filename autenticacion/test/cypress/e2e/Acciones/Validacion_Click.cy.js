
describe('My First Test', () => {
  // Caso de prueba para hacer clic en el enlace "tipo"
  it('hace clic en el enlace "tipo"', () => {
    
    // Visita la página principal de la aplicación en el puerto local 5173
    cy.visit('http://localhost:5173')

    // Busca un elemento que contenga el texto 'Iniciar' y haz clic en él
    cy.contains('Iniciar').click()
  })
})
