describe('Login Test', () => {
  // Caso de prueba para verificar el inicio de sesión con credenciales válidas
  it('Debe iniciar sesión con credenciales válidas', () => {
    
    // Visita la página principal de la aplicación en el puerto local 5173
    cy.visit('http://localhost:5173')
    
    // Encuentra el campo de entrada de correo electrónico y escribe un email de prueba
    cy.get('input[name="email"]').type('prueba40@gmail.com')
    
    // Encuentra el campo de entrada de contraseña y escribe una contraseña de prueba
    cy.get('input[name="password"]').type('prueba1')
    
    // Encuentra el botón de envío del formulario (para iniciar sesión) y haz clic en él
    cy.get('button[type="submit"]').click()

    // Verifica que la URL después de intentar iniciar sesión contenga 'auth/login'
    cy.url().should('include', 'auth/login')
    
    // Comprueba que el mensaje de error "Invalid login credentials" sea visible
    cy.contains('Invalid login credentials').should('be.visible')
  })
})
