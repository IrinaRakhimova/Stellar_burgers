import { SELECTORS } from "../support/selectors";

describe("Drag and Drop Ingredients", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should drag ingredient from BurgerIngredients and drop it into BurgerConstructor", () => {
    cy.get(SELECTORS.ingredient).first().trigger("dragstart");

    cy.get(SELECTORS.burgerDropZone).trigger("drop");

    cy.get(SELECTORS.burgerConstructorItem, { timeout: 5000 }).should(
      "have.length",
      1
    );
  });
});
