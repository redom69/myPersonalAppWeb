// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace Cypress {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Chainable<Subject> {
    verifyLoginPage(): void;
    checkDashboard(): void;
    login(username: string, password: string): void;
    popMessage(text: string): void;
    registerForm(): void;
  }
}

// Define the custom command to verify the Login page
Cypress.Commands.add('verifyLoginPage', () => {
  cy.visit('/login');
  cy.get('img[alt="logo "]').should('be.visible');
  cy.contains('strong', 'Conectando datos,').should('be.visible');
  cy.contains('transformando vidas').should('be.visible');
  cy.get('input[name="username"]').should('be.visible');
  cy.get('#password-login input[name="password"]').should('be.visible');
  cy.get('button#button-login-submit').should('be.visible');
  cy.contains('div', '¿Olvidaste tu contraseña?').should('be.visible');
  cy.get('button#button-login-register').should('be.visible');
  cy.get('input[name="username"]').clear();
  cy.get('#password-login input[name="password"]').clear();
});

// Define the custom command to login
Cypress.Commands.add('login', (username, password) => {
  // Load login data from fixture in subfolder
  // Fill the email input field
  cy.get('input[name="username"]').type(username);

  // Fill the password input field
  cy.get('#password-login input[name="password"]').type(password);

  // Click the login button
  cy.get('button#button-login-submit').click();
});

// Define the custom command to check the Dashboard component
Cypress.Commands.add('checkDashboard', () => {
  // Check for the Dashboard text
  cy.get('.surface-card .font-medium.text-2xl.text-900.p-2').should(
    'contain.text',
    'Dashboard'
  );

  // Additional checks for elements inside the Dashboard component
  cy.get('.surface-card .p-dropdown-label.p-inputtext').should(
    'contain.text',
    'Exo prueba'
  );
  cy.get('.surface-card img[alt="clock"]').should('be.visible');
  cy.get('.surface-card .text-700.text-2xl.font-bold').should(
    'contain.text',
    'Total Pasos'
  );
  cy.get('.surface-card .text-4xl').should('contain.text', '0 pasos');
});

Cypress.Commands.add('popMessage', (text) => {
  // Asegura que el toast esté visible antes de verificar el contenido
  cy.get('.p-toast-message-content', { timeout: 10000 }).should('be.visible');

  // Verifica el contenido del toast
  cy.get('.p-toast-message-content').within(() => {
    cy.get('.p-toast-detail').should('contain.text', text);
  });
});

Cypress.Commands.add('registerForm', () => {
  cy.get('form.col-12[autocomplete="off"]').should('be.visible');
  cy.get('#input-register-name').should('be.visible').clear();
  cy.get('#input-register-surnames').should('be.visible').clear();
  cy.get('#input-register-email').should('be.visible').clear();
  cy.get('#input-register-password').should('be.visible').clear();
  cy.get('#input-register-phone').should('be.visible').clear();
  cy.get('#input-register-birth_date input.p-inputtext')
    .should('be.visible')
    .clear();
  cy.get('#input-register-nationality').should('be.visible').clear();
  cy.get('#checkbox-confirm-legal-notice input[type="checkbox"]').should(
    'exist'
  );
  cy.get('#checkbox-confirm-confidentiality input[type="checkbox"]').should(
    'exist'
  );
  cy.get('#checkbox-confirm-cookies-policy input[type="checkbox"]').should(
    'exist'
  );
  cy.get('button#button-register-submit').should('be.disabled');
});
