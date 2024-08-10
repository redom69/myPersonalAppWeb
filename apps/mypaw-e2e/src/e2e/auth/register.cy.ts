describe('App Tests for Register', () => {
  beforeEach(() => {
    cy.intercept('POST', '/register', (req) => {
      if (req.body.email === 'email-ayuda.test@marsinet.com') {
        req.reply({
          statusCode: 201,
          body: {
            access_token:
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1X2lkIjoiYjIwYzUwZmUtZDg4Yy00ZTQwLTk3MDUtMzI1M2YwNzBmMjI1IiwiY3JlYXRlZF9hdCI6IjIwMjMtMTItMTlUMTY6MTc6MTYuODk2WiIsInVwZGF0ZWRfYXQiOiIyMDI0LTA1LTIxVDEzOjQ3OjQwLjcxOFoiLCJlbWFpbCI6ImFkbWluaXN0cmFjaW9uQG1hcnNpbmV0LmNvbSIsIm9faWQiOiIzMTM4MTcwMS05ZjllLTRmMDAtYjNhYy03NjA2ZDk0MjBlODciLCJhY3RpdmUiOnRydWUsImlzX2FkbWluIjp0cnVlLCJyb2xlIjoibWFyc2kiLCJuYW1lIjoiQWRtaW5pc3RyYWRvciIsImlhdCI6MTcxOTM4NDQwNywiZXhwIjoxNzM0OTM2NDA3fQ.Yn_2pm_y0yqXqb0rCcoY2EhfU3I9U0TY9_ZlfQbR80o',
            refresh_token:
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1X2lkIjoiYjIwYzUwZmUtZDg4Yy00ZTQwLTk3MDUtMzI1M2YwNzBmMjI1IiwiY3JlYXRlZF9hdCI6IjIwMjMtMTItMTlUMTY6MTc6MTYuODk2WiIsInVwZGF0ZWRfYXQiOiIyMDI0LTA1LTIxVDEzOjQ3OjQwLjcxOFoiLCJlbWFpbCI6ImFkbWluaXN0cmFjaW9uQG1hcnNpbmV0LmNvbSIsIm9faWQiOiIzMTM4MTcwMS05ZjllLTRmMDAtYjNhYy03NjA2ZDk0MjBlODciLCJhY3RpdmUiOnRydWUsImlzX2FkbWluIjp0cnVlLCJyb2xlIjoibWFyc2kiLCJuYW1lIjoiQWRtaW5pc3RyYWRvciIsImlhdCI6MTcxOTM4NDQwNywiZXhwIjoxNzE5NDcwODA3fQ.cnzKLNchbQIGSUEPbxqGZVDJ-dq7u4A1BIUO0N1YZTY',
          },
        });
      } else {
        req.reply({
          statusCode: 409,
          body: { message: 'El email ya existe' },
        });
      }
    }).as('registerUser');

    cy.verifyLoginPage();
    cy.get('#button-login-register').click();
    cy.url().should('include', '/register');
    cy.registerForm();
  });

  it('Should register a new user successfully', () => {
    cy.fixture('auth/registerData').then((register) => {
      cy.get('#input-register-name').type(register.name);
      cy.get('#input-register-surnames').type(register.surnames);
      cy.get('#input-register-email').type(register.email);
      cy.get('#input-register-password').type(register.password);
      cy.get('#input-register-phone').type(register.phone);
      cy.get('#input-register-birth_date input.p-inputtext').type(
        register.birthDate
      );
      cy.get('#input-register-nationality').type(register.nationality);
      cy.get('.p-dropdown-trigger').click();
      cy.contains('.p-dropdown-item', register.institution).click();
    });

    cy.get('#checkbox-confirm-legal-notice > div.p-checkbox-box').click();
    cy.get('#checkbox-confirm-confidentiality > div.p-checkbox-box').click();
    cy.get('#checkbox-confirm-cookies-policy > div.p-checkbox-box').click();
    cy.get('button#button-register-submit').click();

    // Esperar a que la solicitud se complete y verificar la respuesta
    cy.wait('@registerUser').then((interception) => {
      expect(interception.response.statusCode).to.eq(201);

      // Verificar que la respuesta contiene los tokens necesarios
      expect(interception.response.body).to.have.property('access_token');
      expect(interception.response.body).to.have.property('refresh_token');
    });

    // Verificar que el usuario ha sido redirigido a la página autenticada
    cy.url().should('include', '/authenticated');
  });

  it('Should display an error message for already registered email', () => {
    cy.fixture('auth/registerData').then((register) => {
      cy.get('#input-register-name').type(register.name);
      cy.get('#input-register-surnames').type(register.surnames);
      cy.get('#input-register-email').type('administracion@marsinet.com');
      cy.get('#input-register-password').type(register.password);
      cy.get('#input-register-phone').type(register.phone);
      cy.get('#input-register-birth_date input.p-inputtext').type(
        register.birthDate
      );
      cy.get('#input-register-nationality').type(register.nationality);
      cy.get('.p-dropdown-trigger').click();
      cy.contains('.p-dropdown-item', register.institution).click();
    });

    cy.get('#checkbox-confirm-legal-notice > div.p-checkbox-box').click();
    cy.get('#checkbox-confirm-confidentiality > div.p-checkbox-box').click();
    cy.get('#checkbox-confirm-cookies-policy > div.p-checkbox-box').click();
    cy.get('button#button-register-submit').click();

    // Wait for the API call to complete and verify the response
    cy.wait('@registerUser').its('response.statusCode').should('eq', 409);

    // Verify that the appropriate error message is displayed
    cy.popMessage('El email ya existe');
  });

  it('Should display error messages for missing required fields', () => {
    // Verificar que los mensajes de error se muestren para cada campo requerido
    cy.get('#input-register-name')
      .parents('.field')
      .find('.p-error')
      .should('be.visible')
      .and('contain.text', '*Nombre es requerido');

    cy.get('#input-register-surnames')
      .parents('.field')
      .find('.p-error')
      .should('be.visible')
      .and('contain.text', '*Apellidos es requerido');

    cy.get('#input-register-email')
      .parents('.field')
      .find('.p-error')
      .should('be.visible')
      .and('contain.text', '*Email es requerido');

    cy.get('#input-register-password')
      .parents('.field')
      .find('.p-error')
      .should('be.visible')
      .and('contain.text', '*La contraseña es requerida.');

    cy.get('#input-register-phone')
      .parents('.field')
      .find('.p-error')
      .should('be.visible')
      .and('contain.text', '*Teléfono es requerido');

    // Verificar que el botón de registro esté deshabilitado
    cy.get('button#button-register-submit').should('be.disabled');
  });
});
