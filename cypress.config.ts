import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    specPattern: 'cypress/e2e/**/*.cy.{ts,js}',
    baseUrl: 'http://localhost:5173', 
  },
});