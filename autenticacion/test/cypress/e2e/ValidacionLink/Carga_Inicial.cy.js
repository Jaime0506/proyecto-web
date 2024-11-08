describe('Página Principal Test', () => {
  it('Visita la página principal y verifica que se haya cargado correctamente', () => {
    cy.visit('http://localhost:5173')
    
    

    // Verifica que el mensaje principal esté visible
    cy.contains('Conéctate y gestiona tu aprendizaje de forma simple y colaborativa.').should('be.visible')
    
    // Verifica que el campo de correo electrónico esté presente
    cy.contains('Correo electronico').should('be.visible')
    
    // Verifica que el campo de contraseña esté presente
    cy.contains('Contraseña').should('be.visible')
    
    // Verifica que el botón de "Iniciar" esté visible
    cy.contains('Iniciar').should('be.visible')
    
    // Verifica que el botón de "Registrate" esté visible
    cy.contains('Registrate').should('be.visible')

  })
})
