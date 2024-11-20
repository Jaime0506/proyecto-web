
describe('Login Test', () => {
  // Caso de prueba para verificar la navegación a la página de inicio de sesión
  it('Debe iniciar sesión con credenciales válidas', () => {
    
    // Visita la página principal de la aplicación en el puerto local 5173
    cy.visit('http://localhost:5173')
    
    // Busca un elemento que contenga el texto 'Conéctate' y haz clic en él
    cy.contains('Conéctate').click()
    
    // Verifica que la URL después de hacer clic en 'Conéctate' contenga 'auth/login',
    // lo que indica que la navegación a la página de inicio de sesión fue exitosa
    cy.url().should('include', 'auth/login')
    
  })
})

  