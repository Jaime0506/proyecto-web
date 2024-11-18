describe("Inicio de Sesión y visualización de secciones correspondientes según Usuario", () => {
  it("Inicio de sesión con credenciales válidas", () => {
    // Visitar la página de inicio de sesión
    cy.visit("http://localhost:5173/auth/login");

    // Introducir el nombre de usuario y la contraseña
    cy.get('input[name="email"]').type("sebas@gmail.com"); // Tagname + atributo
    cy.get('input[name="password"]').type("sebastian"); // Tagname + atributo
    
    // Hacer clic en el botón de inicio de sesión
    cy.get('button[type="submit"]').click(); // Tagname + atributo
    
    cy.contains("Cerrar sesion").click();
    
    // Introducir el nombre de usuario y la contraseña
    cy.get('input[name="email"]').type("davidcasallas1202@gmail.com"); // Tagname + atributo
    cy.get('input[name="password"]').type("123456*"); // Tagname + atributo
    
    cy.get('button[type="submit"]').click(); // Tagname + atributo

    cy.contains("Matemáticas Especiales").click();

    // Verifica que la sección con el texto "Novedades" esté visible
    cy.contains("a", "Novedades").should("be.visible");
    
    // Verifica que la sección con el texto "Tareas" esté visible
    cy.contains("a", "Tareas").should("be.visible");
    
    // Verifica que la sección con el texto "Asistencia" esté visible
    cy.contains("a", "Asistencia").should("be.visible");

  });
});
