describe("Posting a comment", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get('[data-cy="read-article-button"]')
      .first()
      .click();
  });
  it("posts a comment when logged in", () => {
    cy.get('[data-cy="navbar-login-button"]').click();
    cy.get('[data-cy="username-input"]').type("guest");
    cy.get('[data-cy="form-login-button"]').click();
    cy.get('[data-cy="add-comment-button"]').click();
    cy.get('[data-cy="comment-body-input"]').type("Testing posting a comment");
    cy.get('[data-cy="post-comment-button"]').click();
    cy.wait(500);
    cy.get('[data-cy="comment-body"]').contains("Testing posting a comment");
  });
  it("disables the add comment button when not logged in", () => {
    cy.get('[data-cy="add-comment-button"]').should("be.disabled");
  });
  it("disables the post comment button while the body is blank", () => {
    cy.get('[data-cy="navbar-login-button"]').click();
    cy.get('[data-cy="username-input"]').type("guest");
    cy.get('[data-cy="form-login-button"]').click();
    cy.get('[data-cy="add-comment-button"]').click();
    cy.get('[data-cy="post-comment-button"]').should("be.disabled");
    cy.get('[data-cy="comment-body-input"]').type("Testing posting a comment");
    cy.get('[data-cy="post-comment-button"]').should("not.be.disabled");
  });
});
