describe("Navigation", () => {
  it("should navigate among the pages", () => {
    // Start from the index page
    cy.visit("/");

    // The page should contain the Dashboard and List on sidebar.
    cy.get("span").contains("Dashboard");
    cy.get("span").contains("List");

    // Find a link with an href attribute containing "list" and click it
    cy.get('a[href*="/list"]').click();

    // The new url should include "/list"
    cy.url().should("include", "/list");
  });
});
