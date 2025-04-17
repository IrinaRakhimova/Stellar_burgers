/// <reference types="cypress" />

import { SELECTORS } from "../support/selectors";

describe("Ingredient Modal", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should open modal with ingredient details when an ingredient is clicked", () => {
    cy.get(SELECTORS.ingredient).first().click();

    cy.get(SELECTORS.ingredientModal).should("be.visible");

    cy.get(SELECTORS.ingredientName).should("exist");
    cy.get(SELECTORS.ingredientCalories).should("exist");

    cy.get(SELECTORS.modalClose).click();
    cy.get(SELECTORS.ingredientModal).should("not.exist");
  });
});
