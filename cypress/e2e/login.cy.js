describe('Login form', () => {
  beforeEach(() => {
    cy.fixture('credentials.json').as('credentials');
    cy.visit('/');
    cy.wait(500);
  });

  it('should log in with valid credentials', () => {
    cy.intercept('POST', 'https://nf-api.onrender.com/api/v1/social/auth/login', {
      statusCode: 200,
      body: {
        name: 'test',
        email: 'valid@stud.noroff.no',
        banner: null,
        avatar: '',
        accessToken: 'testToken',
      },
    }).as('loginResponse');

    cy.get(`[data-cy="loginFormBtn"]`).click();
    cy.wait(500);
    cy.get(`[data-cy="emailInput"]`).click();
    cy.get('@credentials').then((user) => {
      cy.get(`[data-cy="emailInput"]`).type(`${user.validEmail}`);
      cy.get(`[data-cy="passwordInput"]`).click();
      cy.get(`[data-cy="passwordInput"]`).type(`${user.validPassword}{enter}`);
    });

    cy.wait('@loginResponse');

    cy.window().its('localStorage.token').should('exist');
    cy.window().its('localStorage.profile').should('exist');
    cy.get(`[data-cy="logoutBtn"]`).click({ force: true });
    cy.location('pathname').should('equal', '/');
    cy.wait(500);
    cy.get(`[data-cy="loginFormBtn"]`).click();
    cy.wait(500);
    cy.get(`[data-cy="emailInput"]`).click();
    cy.get(`@credentials`).then((user) => {
      cy.get(`[data-cy="emailInput"]`).type(user.validEmail);
      cy.get(`[data-cy="passwordInput"]`).click();
      cy.get(`[data-cy="passwordInput"]`).type(`${user.validPassword}`);
    });

    cy.get(`[data-cy="login-btn"]`).click();
    cy.wait('@loginResponse');

    cy.window().its('localStorage.token').should('exist');
    cy.window().its('localStorage.profile').should('exist');
  });

  it('should not submit the login form when provided with invalid credentials and user is shown a message', () => {
    cy.intercept('POST', 'https://nf-api.onrender.com/api/v1/social/auth/login', {
      statusCode: 401,
      body: {
        message: 'Invalid email or password',
      },
    }).as('loginFailed');
    cy.get(`[data-cy="loginFormBtn"]`).click();
    cy.wait(500);
    cy.get(`[data-cy="emailInput"]`).click();
    cy.get('@credentials').then((user) => {
      cy.get(`[data-cy="emailInput"]`).type(`${user.validEmail}`);
      cy.get(`[data-cy="passwordInput"]`).click();
      cy.get(`[data-cy="passwordInput"]`).type(`${user.validPassword}{enter}`);
    });
    cy.wait('@loginFailed');
    cy.on('window:alert', () => {
      expect(true).to.be.true;
    });
    cy.location('pathname').should('equal', '/');
  });
});
