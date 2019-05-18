describe("NC News", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  describe("Logging in", () => {
    it("logs in with a valid username", () => {
      cy.get('[data-cy="navbar-login-button"]').click();
      cy.get('[data-cy="username-input"]').type("guest");
      cy.get('[data-cy="form-login-button"]').click();
      cy.get('[data-cy="navbar-logout-button"]');
    });
    it("doesn't log in with an invalid username", () => {
      cy.get('[data-cy="navbar-login-button"]').click();
      cy.get('[data-cy="username-input"]').type("unwelcomeguest");
      cy.get('[data-cy="form-login-button"]').click();
      cy.get('[data-cy="login-form"]').contains("Invalid username");
    });
  });
});
