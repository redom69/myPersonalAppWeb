describe('App Tests for Login', () => {
  beforeEach(() => {
    cy.intercept('POST', '/login', (req) => {
      if (req.body.username === 'admin@admin.com') {
        req.reply({
          statusCode: 200,
          body: {
            access_token:
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1X2lkIjoiYjIwYzUwZmUtZDg4Yy00ZTQwLTk3MDUtMzI1M2YwNzBmMjI1IiwiY3JlYXRlZF9hdCI6IjIwMjMtMTItMTlUMTY6MTc6MTYuODk2WiIsInVwZGF0ZWRfYXQiOiIyMDI0LTA1LTIxVDEzOjQ3OjQwLjcxOFoiLCJlbWFpbCI6ImFkbWluaXN0cmFjaW9uQG1hcnNpbmV0LmNvbSIsIm9faWQiOiIzMTM4MTcwMS05ZjllLTRmMDAtYjNhYy03NjA2ZDk0MjBlODciLCJhY3RpdmUiOnRydWUsImlzX2FkbWluIjp0cnVlLCJyb2xlIjoibWFyc2kiLCJuYW1lIjoiQWRtaW5pc3RyYWRvciIsImlhdCI6MTcxOTM4NDQwNywiZXhwIjoxNzM0OTM2NDA3fQ.Yn_2pm_y0yqXqb0rCcoY2EhfU3I9U0TY9_ZlfQbR80o',
            refresh_token:
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1X2lkIjoiYjIwYzUwZmUtZDg4Yy00ZTQwLTk3MDUtMzI1M2YwNzBmMjI1IiwiY3JlYXRlZF9hdCI6IjIwMjMtMTItMTlUMTY6MTc6MTYuODk2WiIsInVwZGF0ZWRfYXQiOiIyMDI0LTA1LTIxVDEzOjQ3OjQwLjcxOFoiLCJlbWFpbCI6ImFkbWluaXN0cmFjaW9uQG1hcnNpbmV0LmNvbSIsIm9faWQiOiIzMTM4MTcwMS05ZjllLTRmMDAtYjNhYy03NjA2ZDk0MjBlODciLCJhY3RpdmUiOnRydWUsImlzX2FkbWluIjp0cnVlLCJyb2xlIjoibWFyc2kiLCJuYW1lIjoiQWRtaW5pc3RyYWRvciIsImlhdCI6MTcxOTM4NDQwNywiZXhwIjoxNzE5NDcwODA3fQ.cnzKLNchbQIGSUEPbxqGZVDJ-dq7u4A1BIUO0N1YZTY',
          },
        });
      } else {
        req.reply({
          statusCode: 400,
          body: { message: 'Usuario y contraseña no válidos' },
        });
      }
    }).as('loginUser');

    cy.verifyLoginPage();
  });

  it('Should allow user to login with valid credentials', () => {
    cy.fixture('auth/loginData').then((login) => {
      cy.login(login.username, login.password);
    });

    cy.wait('@loginUser').its('response.statusCode').should('eq', 200);
    cy.url().should('include', '/authenticated');
    cy.checkDashboard();
  });

  it('Should display an error message for invalid login', () => {
    cy.get('input[name="username"]').type('invalid@email.com');
    cy.get('#password-login input[name="password"]').type('wrongpassword');
    cy.get('button#button-login-submit').click();

    cy.wait('@loginUser').its('response.statusCode').should('eq', 400);
    cy.popMessage('Usuario y Contraseña inválidos');
    cy.url().should('include', '/login');
  });

  it('Should display an error message for empty login', () => {
    cy.get('input[name="username"]').clear();
    cy.get('#password-login input[name="password"]').clear();
    cy.get('button#button-login-submit').click();

    cy.get('div.field.mb-5.col-12')
      .find('.p-error')
      .should('be.visible')
      .and('contain.text', '*Email es requerido');

    cy.get('div.field.col-12')
      .find('.p-error')
      .should('be.visible')
      .and('contain.text', '*Contraseña es requerida');
  });
});
