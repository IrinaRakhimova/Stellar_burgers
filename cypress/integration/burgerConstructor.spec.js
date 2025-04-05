describe('Burger Constructor Functionality', () => {
    beforeEach(() => {
      cy.visit('/burger-constructor');
    });
  
    it('should allow dragging ingredients', () => {
      cy.get('[data-testid="ingredient"]').first().trigger('dragstart');
      cy.get('[data-testid="burger-constructor"]').trigger('drop');
      cy.get('[data-testid="burger-constructor"]').should('contain', 'Burger Ingredient');
    });
  
    it('should show order modal after clicking order button', () => {
      cy.get('[data-testid="ingredient"]').first().trigger('dragstart');
      cy.get('[data-testid="burger-constructor"]').trigger('drop');
      cy.get('[data-testid="order-button"]').click();
      cy.get('[data-testid="order-modal"]').should('be.visible');
    });
  
    it('should create an order', () => {
      cy.get('[data-testid="ingredient"]').first().trigger('dragstart');
      cy.get('[data-testid="burger-constructor"]').trigger('drop');
      cy.get('[data-testid="order-button"]').click();
      cy.get('[data-testid="order-modal"]').should('contain', 'Order Created');
    });
  
    it('should remove ingredient from constructor', () => {
      cy.get('[data-testid="ingredient"]').first().trigger('dragstart');
      cy.get('[data-testid="burger-constructor"]').trigger('drop');
      cy.get('[data-testid="remove-ingredient"]').click();
      cy.get('[data-testid="burger-constructor"]').should('not.contain', 'Burger Ingredient');
    });
  
    it('should update total price when ingredients are added or removed', () => {
      cy.get('[data-testid="ingredient"]').first().trigger('dragstart');
      cy.get('[data-testid="burger-constructor"]').trigger('drop');
      cy.get('[data-testid="total-price"]').should('contain', '100');
      cy.get('[data-testid="remove-ingredient"]').click();
      cy.get('[data-testid="total-price"]').should('contain', '0');
    });
  });