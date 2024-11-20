describe("Checklist de asistencia", () => {
  it("Debe marcar los ítems de acuerdo con la asistencia en la base de datos", () => {
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
    cy.url().should("include", "/app/board/attendance");

    // Hacer clic en el enlace de una fecha específica
    cy.get('a[href="/app/board/attendanceCall"]')
      .contains("Asistencia del 01/00/00")
      .click();

    // Verificar que la URL cambió a la página de la lista de asistencia de esa fecha
    cy.url().should("include", "/app/board/attendanceCall");

    // Verificar que la lista de asistencia para esa fecha se muestra correctamente
    cy.get(".p-4").should("exist");

    // Verificar que hay al menos una fila de estudiante
    cy.get("tr[tabindex=-1]").should("have.length.greaterThan", 1);

    cy.get("tr") // Encuentra todas las filas
      .contains("7e1f5307-2291-489c-ba6b-374d30e2532a") // Busca la fila que contiene el user_id
      .parents("tr") // se queda con la fila completa
      .find('input[value="no"]') // Busca el input con value="no" dentro de la fila
      .should("exist") // Verifica que el input existe
      .should("be.visible") // Verifica que el input es visible
      .should("be.checked"); // Verifica que el input esté marcado (checked)
  });
});
