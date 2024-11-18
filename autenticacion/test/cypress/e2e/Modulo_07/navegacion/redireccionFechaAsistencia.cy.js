describe("Acceder a una lista de asistencia segun fecha", () => {
    it("Debe redirigir a la lista de la fecha correspondiente", () => {
      // Visitar la página de login
      cy.visit("http://localhost:5173/auth/login");
  
      // Introducir el nombre de usuario y la contraseña
      cy.get('input[name="email"]').type("davidcasallas1202@gmail.com"); // Tagname + atributo
      cy.get('input[name="password"]').type("123456*"); // Tagname + atributo
      
      // Iniciar sesión
      cy.get('button[type="submit"]').click(); // Tagname + atributo
  
      // Ingresar a la materia
      cy.contains("Matemáticas Especiales").click();
  
      // Ingresar a la lista de asistencias
      cy.get('a[href="/app/board/attendance"]').click();
  
      // Verificar que la URL cambió y se redirige a la página de asistencia
      cy.url().should('include', '/app/board/attendance');
  
      // Hacer clic en el enlace de una fecha específica
      cy.get('a[href="/app/board/attendanceCall"]').contains('Asistencia del 01/00/00').click();
  
      // Verificar que la URL cambió a la página de la lista de asistencia de esa fecha
      cy.url().should('include', '/app/board/attendanceCall');
  
      // Verificar que la lista de asistencia para esa fecha se muestra correctamente
      cy.get('.p-4').should('exist');
    });
  });
  