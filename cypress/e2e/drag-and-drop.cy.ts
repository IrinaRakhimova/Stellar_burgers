describe("Drag and Drop Ingredients", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should drag ingredient from BurgerIngredients and drop it into BurgerConstructor", () => {
    cy.get('[data-testid="ingredient"]').first().trigger("dragstart");

    cy.get('[data-testid="burger-constructor-drop-zone"]').trigger("drop");

    cy.get('[data-testid="burger-constructor-item"]', { timeout: 5000 }).should(
      "have.length",
      1
    );
  });
});
