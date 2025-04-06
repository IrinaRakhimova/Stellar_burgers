/// <reference types="cypress" />

describe("Ingredient Modal", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should open modal with ingredient details when an ingredient is clicked", () => {
    cy.get('[data-testid="ingredient"]').first().click();

    cy.get('[data-testid="ingredient-modal"]').should("be.visible");

    cy.get('[data-testid="ingredient-name"]').should("exist");
    cy.get('[data-testid="ingredient-calories"]').should("exist");

    cy.get('[data-testid="modal-close"]').click();
    cy.get('[data-testid="ingredient-modal"]').should("not.exist");
  });
});
