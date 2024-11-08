describe('User Registration Test', () => {
  // Caso de prueba para verificar el registro de un nuevo usuario
  it('Debería registrar un nuevo usuario', () => {
    
    // Visita la página principal de la aplicación en el puerto local 5173
    cy.visit('http://localhost:5173')
    
    // Busca un elemento que contenga el texto 'Registrate' y haz clic en él
    cy.contains('Registrate').click()
    
    // Encuentra el campo de entrada de correo electrónico y escribe un email de prueba
    cy.get('input[name="email"]').type('prueba70@gmail.com')
    
    // Encuentra el campo de entrada de contraseña y escribe una contraseña de prueba
    cy.get('input[name="password"]').type('prueba70')
    
    // Encuentra el campo de confirmación de contraseña y escribe la misma contraseña
    cy.get('input[name="rPassword"]').type('prueba70')
    
    // Busca y hace clic nuevamente en el botón de 'Registrate' para enviar el formulario
    cy.contains('Registrate').click()
    
    // Verifica que el mensaje "User already registered" sea visible si el usuario ya existe
    cy.contains('User already registered').should('be.visible')
    
    // Comprueba que la URL actual incluya 'auth/login', indicando que se redirigió a la página de inicio de sesión
    cy.url().should('include', 'auth/login')
  })
})
