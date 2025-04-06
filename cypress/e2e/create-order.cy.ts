describe("Burger Constructor - Add Bun and Ingredient", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should add a bun and ingredient to the constructor", () => {
    cy.get('[data-testid="ingredient"]')
      .contains("булка")
      .first()
      .trigger("dragstart");
    cy.get('[data-testid="burger-constructor-drop-zone"]').trigger("drop");

    cy.get('[data-testid="ingredient"]')
      .contains("Соус")
      .first()
      .trigger("dragstart");
    cy.get('[data-testid="burger-constructor-drop-zone"]').trigger("drop");

    cy.wait(500);

    cy.get('[data-testid="order-button"]').click();
    cy.url().should("include", "/login");
  });
});
