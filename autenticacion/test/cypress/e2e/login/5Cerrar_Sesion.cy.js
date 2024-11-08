
// jhon
describe('Login Test', () => {
    it('Debe iniciar sesión con credenciales válidas y luego cerrar sesión.', () => {
      // Visitar la página de inicio
      cy.visit('http://localhost:5173');
      // Rellenar los campos de inicio de sesión
      cy.get('input[name="email"]').type('prueba1@gmail.com');
      cy.get('input[name="password"]').type('prueba1');
      // Hacer clic en el botón de inicio de sesión
      cy.get('button[type="submit"]').click();
      // Verificar que la URL cambie a la página de inicio
      cy.url().should('include', 'app/home');
      // Cerrar sesión
      cy.contains('Cerrar sesion').click(); // Asegúrate de que este texto coincida con el enlace o botón de cerrar sesión
      // Verificar que el usuario ha cerrado sesión
      cy.url().should('include', 'auth/login'); // Asegúrate de que esta URL coincida con la de la página de inicio o de inicio de sesión
      
    });
  });
   
    
  
  