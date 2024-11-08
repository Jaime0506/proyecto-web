describe("Visibilización de la descripción de la materia correspondiente", () => {
    it("Se debe visualizar la descripción de la materia que seleccione el usuario", () => {
      // Visitar la página de inicio de sesión
      cy.visit("http://localhost:5173/auth/login");
      
      // Introducir el nombre de usuario y la contraseña
      cy.get('input[name="email"]').type("davidcasallas1202@gmail.com"); // Tagname + atributo
      cy.get('input[name="password"]').type("123456*"); // Tagname + atributo
      
      cy.get('button[type="submit"]').click(); // Tagname + atributo
  
      cy.contains("Matemáticas Especiales").click();
  
      
      // Verifica que la sección con el texto "Asistencia" esté visible
      cy.contains("a", "Asistencia").should("be.visible");
      cy.get('[class="text-lg mt-4"]').should("be.visible");
  
    });
  });
  