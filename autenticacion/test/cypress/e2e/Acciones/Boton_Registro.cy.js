
describe('Navigation Test', () => {
  // Caso de prueba para verificar la navegación hacia la página de registro
  it('Debe navegar a la página de registro', () => {
    
    // Visita la página principal de la aplicación en el puerto local 5173
    cy.visit('http://localhost:5173')

    // Busca un elemento que contenga el texto 'Registrate' y haz clic en él
    cy.contains('Registrate').click()
    
    // Verifica que el mensaje de inicio de sesión esté visible en la página
    cy.contains('Inicia sesion para empezar a usar nuestros servicios').should('be.visible')
    
    // Comprueba que la URL actual incluya '/auth/register', confirmando la navegación a la página de registro
    cy.url().should('include', '/auth/register')
  })
})

  