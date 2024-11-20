describe('Login Test', () => {
  // Caso de prueba para verificar el inicio de sesión con credenciales válidas
  it('Debe iniciar sesión con credenciales válidas', () => {
    
    // Visita la página principal de la aplicación en el puerto local 5173
    cy.visit('http://localhost:5173')
    
    // Encuentra el campo de entrada de correo electrónico y escribe un email válido para el inicio de sesión
    cy.get('input[name="email"]').type('prueba70@gmail.com')
    
    // Encuentra el campo de entrada de contraseña y escribe una contraseña válida
    cy.get('input[name="password"]').type('prueba70')
    
    // Encuentra el botón de envío del formulario (para iniciar sesión) y haz clic en él
    cy.get('button[type="submit"]').click()

    // Verifica que la URL después del inicio de sesión contenga 'app/home', indicando que el inicio de sesión fue exitoso
    cy.url().should('include', 'app/home')
  })
})

  