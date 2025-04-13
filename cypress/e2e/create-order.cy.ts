import { SELECTORS } from "../support/selectors";

describe("Burger Constructor - Add Bun and Ingredient", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should add a bun and ingredient to the constructor", () => {
    cy.get(SELECTORS.ingredient)
      .contains("булка")
      .first()
      .trigger("dragstart");
    cy.get(SELECTORS.burgerDropZone).trigger("drop");

    cy.get(SELECTORS.ingredient)
      .contains("Соус")
      .first()
      .trigger("dragstart");
    cy.get(SELECTORS.burgerDropZone).trigger("drop");

    cy.wait(500);

    cy.get(SELECTORS.orderButton).click();
    cy.url().should("include", "/login");
  });
});
