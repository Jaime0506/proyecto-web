describe('User Registration Test', () => {
  // Caso de prueba para verificar el registro de un nuevo usuario
  it('Debería registrar un nuevo usuario', () => {
    
    // Visita la página principal de la aplicación en el puerto local 5173
    cy.visit('http://localhost:5173')
    
    // Busca un elemento que contenga el texto 'Registrate' y haz clic en él para ir a la página de registro
    cy.contains('Registrate').click()
    
    // Encuentra el campo de entrada de correo electrónico y escribe un email único para el registro
    cy.get('input[name="email"]').type('prueba70@gmail.com')
    
    // Encuentra el campo de entrada de contraseña y escribe una contraseña segura
    cy.get('input[name="password"]').type('prueba70')
    
    // Encuentra el campo de confirmación de contraseña y escribe la misma contraseña
    cy.get('input[name="rPassword"]').type('prueba70')
    
    // Busca y haz clic en el botón de 'Registrate' para enviar el formulario y completar el registro
    cy.contains('Registrate').click()

    // Verifica que la URL después del registro contenga 'app/home', indicando que el registro fue exitoso y que se redirigió al inicio
    cy.url().should('include', 'app/home')
  })
})

  