describe('Valid Login Tests', () => {
  beforeEach(() => {
    cy.fixture('credentials.json').as('credentials');
    cy.visit('http://127.0.0.1:8080/login');
  });

  it('logs in with valid credentials and stores token and profile in localStorage', function () {
    cy.intercept('POST', 'https://nf-api.onrender.com/api/v1/social/auth/login').as('loginRequest');

    cy.get('[data-cy="emailInput"]').click();
    cy.get('@credentials').then((user) => {
      cy.get('[data-cy="emailInput"]').type(user.validEmail);
      cy.get('[data-cy="passwordInput"]').click();
      cy.get('[data-cy="passwordInput"]').type(user.validPassword);
    });

    cy.get('[data-cy="login-btn"]').click();

    cy.wait('@loginRequest').then((interception) => {
      expect(interception.response.statusCode).to.eq(200);

      // Verify localStorage
      cy.window().then((win) => {
        expect(win.localStorage.getItem('token')).to.exist;
        expect(win.localStorage.getItem('profile')).to.exist;
      });

      // Verify the URL
      cy.location('pathname').should('eq', '/');
    });
  });
});
