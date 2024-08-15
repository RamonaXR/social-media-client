describe('logout', () => {
  it('should log the user out when clicking the logout button', () => {
    cy.fixture('credentials.json').as('credentials');
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
    cy.visit('/');
    cy.wait(500);
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
  });
});
