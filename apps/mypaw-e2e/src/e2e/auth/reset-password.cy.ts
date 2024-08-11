describe('App Tests for Reset Password', () => {
  beforeEach(() => {
    cy.verifyLoginPage();
  });

  it('Should reset the password with a valid email', () => {
    cy.contains('div', '¿Olvidaste tu contraseña?').click();
    cy.url().should('include', '/request-reset-password');
    cy.get('img[alt="logo"]').should('be.visible');

    cy.fixture('auth/loginData').then((login) => {
      cy.get('input[name="email"]').should('be.visible').type(login.username);
      cy.get('button.p-button.p-component').click();
    });

    cy.get('#root > div > div').should('be.visible');
    cy.get('#root > div > div > div.text-center > div')
      .contains('Ir a inicio de sesión')
      .click();
    cy.url().should('include', '/login');
  });

  it('Should display an error message for empty email field', () => {
    cy.contains('div', '¿Olvidaste tu contraseña?').click();
    cy.url().should('include', '/request-reset-password');
    cy.get('img[alt="logo"]').should('be.visible');

    cy.get('input[name="email"]').should('be.visible').clear();
    cy.get('button.p-button.p-component').click();

    cy.get(
      '#root > div.flex.align-items-center.justify-content-center.py-8.min-h-screen > div > form > small'
    )
      .should('be.visible')
      .and('contain.text', 'Email es requerido');
  });

  it('Should display an error message for invalid email', () => {
    cy.contains('div', '¿Olvidaste tu contraseña?').click();
    cy.url().should('include', '/request-reset-password');
    cy.get('img[alt="logo "]').should('be.visible');

    cy.get('input[name="email"]')
      .should('be.visible')
      .type('invalid@email.com');
    cy.get('button.p-button.p-component').click();

    cy.popMessage('Usuario no encontrado');
  });
});
