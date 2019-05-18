describe("404 Error", () => {
  it("displays a 404 error if you visit a non-existent path", () => {
    cy.visit("/thispagedoesnotexist");
    cy.get('[data-cy="error-status"]').contains("404");
  });
});
