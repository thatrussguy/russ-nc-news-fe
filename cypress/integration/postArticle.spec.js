describe("Posting an article", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  it("posts an article when logged in", () => {
    cy.get('[data-cy="navbar-login-button"]').click();
    cy.get('[data-cy="username-input"]').type("guest");
    cy.get('[data-cy="form-login-button"]').click();
    cy.get('[data-cy="write-article-button"]').click();
    cy.get('[data-cy="article-title-input"]').type("Testing...");
    cy.get('[data-cy="article-body-input"]').type("...posting an article");
    cy.get('[data-cy="post-article-button"]').click();
    cy.wait(500);
    cy.get('[data-cy="article-title-text"]').contains("Testing...");
  });
  it("disables the write new article button when not logged in", () => {
    cy.get('[data-cy="write-article-button"]').should("be.disabled");
  });
  it("disables the post article button while title or body is blank", () => {
    cy.get('[data-cy="navbar-login-button"]').click();
    cy.get('[data-cy="username-input"]').type("guest");
    cy.get('[data-cy="form-login-button"]').click();
    cy.get('[data-cy="write-article-button"]').click();
    cy.get('[data-cy="post-article-button"]').should("be.disabled");
    cy.get('[data-cy="article-title-input"]').type("Testing...");
    cy.get('[data-cy="post-article-button"]').should("be.disabled");
    cy.get('[data-cy="article-body-input"]').type("...posting an article");
    cy.get('[data-cy="post-article-button"]').should("not.be.disabled");
  });
});
