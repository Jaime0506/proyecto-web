describe("Verificación de titulos Materias", () => {
    it("Mostrar el título de la materia y luego verificar que coincida al digirise a la pagina de la Materia", () => {
      // Visitar la página de inicio de sesión
      cy.visit("http://localhost:5173/auth/login");
  
      // Introducir el nombre de usuario y la contraseña
      cy.get('input[name="email"]').type("davidcasallas1202@gmail.com");
      cy.get('input[name="password"]').type("123456*");
      cy.get('button[type="submit"]').click();
  
      // Verificar el título de la materia en el menú principal
      cy.contains("Matemáticas Especiales").should('be.visible').then(($materiaInicio) => {
        const nombreMateriaInicio = $materiaInicio.text();
        cy.log("Título en el menú principal: " + nombreMateriaInicio);
  
        // Navegar a la página de la materia
        cy.contains("Matemáticas Especiales").click();
  
        // Obtener y mostrar el título en la página de detalles de la materia
        cy.get('.text-white.font-normal.text-7xl').then(($tituloMateria) => {
          const nombreMateriaPagina = $tituloMateria.text();
  
          // Mostramos el título en el log después de obtenerlo
          cy.log("El título en la página de detalles es: " + nombreMateriaPagina);
          
          // Ahora realizamos la comparación
          expect(nombreMateriaPagina).to.eq(nombreMateriaInicio);
  
          // Log final para confirmar que ambos coinciden
          cy.log("Título en el menú principal y en la página de detalles coinciden: " + nombreMateriaPagina);
        });
      });
    });
  });
  