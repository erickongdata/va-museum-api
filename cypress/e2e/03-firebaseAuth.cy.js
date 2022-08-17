/// <reference types="cypress" />

const urlBase = 'http://localhost:3000';
const firstName = 'Frank';
const email = 'frank@test-email.com';
const password = 'Pass123';

const loginUser = () => {
  cy.visit(`${urlBase}/login`);
  cy.get('#email').type(email);
  cy.get('#user-password').type(password);
  cy.get('button[type="submit"]').click();
  cy.contains(firstName, { timeout: 20000 }).should('exist');
};

const logoutUser = () => {
  cy.get('[data-cy="nav-user"]').click();
  cy.get('[data-cy="drop-sign-out"]').click();
  cy.url().should('eq', `${urlBase}/logout`);
  cy.get('button[type="submit"]').click();
};

describe('Registered account works', () => {
  it.only('Sign up account test', () => {
    cy.visit(`${urlBase}/register`);
    cy.get('#first-name', { timeout: 10000 }).type(firstName);
    cy.get('#email').type(email);
    cy.get('#user-password').type(password);
    cy.get('#user-password-confirmation').type('123');
    cy.get('button[type="submit"]').click();
    cy.contains('Passwords do not match').should('exist');
    cy.get('#user-password-confirmation').clear().type(password);
    cy.get('button[type="submit"]').click();
    cy.contains(firstName, { timeout: 20000 }).should('exist');
    logoutUser();
  });

  it('Bookmarks are saved', () => {
    loginUser();
    cy.get('[data-cy="search-input"]').type('Potter Beatrix peter rabbit');
    cy.get('[data-cy="search-submit-btn"]').click();
    cy.get('[data-cy="card-book"]')
      .should('have.length', 15)
      .each(($el, index) => {
        if (index < 5) {
          cy.wrap($el).click();
        }
      });
    cy.visit(`${urlBase}/mygallery`);
    cy.get('[data-cy="gallery-card"]').should('exist').should('have.length', 5);
    logoutUser();
    cy.visit(`${urlBase}/mygallery`);
    cy.get('[data-cy="gallery-card"]').should('not.exist');

    loginUser();
    cy.visit(`${urlBase}/mygallery`);
    cy.get('[data-cy="gallery-card"]').should('exist').should('have.length', 5);
    logoutUser();
  });
});
