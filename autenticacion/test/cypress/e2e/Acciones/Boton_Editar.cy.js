describe('Navigation Test', () => {
  // Caso de prueba para verificar la navegación hacia la página de registro
  it('Debe navegar a la página de registro', () => {
    
    // Visita la página principal de la aplicación en el puerto local 5173
    cy.visit('http://localhost:5173')

    // Encuentra el campo de entrada de correo electrónico y escribe un email de prueba
    cy.get('input[name="email"]').type('prueba1@gmail.com')
    
    // Encuentra el campo de entrada de contraseña y escribe una contraseña de prueba
    cy.get('input[name="password"]').type('prueba1')
    
    // Encuentra el botón de envío del formulario (para iniciar sesión) y haz clic en él
    cy.get('button[type="submit"]').click()

    // Verifica que la URL después del inicio de sesión contenga 'app/home'
    cy.url().should('include', 'app/home')

    // Encuentra y verifica que el icono de configuración esté visible, y haz clic en él
    cy.get('a[href="/app/settings"] img').should('be.visible').click()
    
    // Verifica que la URL cambie a la página de configuración ('/app/settings')
    cy.url().should('include', '/app/settings')

    // Busca el botón para editar perfil y haz clic en él
    cy.contains('button', 'Editar perfil').click()
    
    // Encuentra el campo de entrada para el nombre completo, borra el contenido actual y escribe un nuevo nombre
    cy.get('input[name="CambioNombre"]').clear().type('Juliana Bolivar Suarez ')

    // Opcional: Haz clic en el botón de guardar para confirmar los cambios
    cy.get('button[type="submit"]').contains('Guardar').click()
    // Nota: Cambia el texto del botón en caso de que sea diferente
  })
})



