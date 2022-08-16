/// <reference types="cypress" />

const urlBase = 'http://localhost:3000';
const firstName = 'Frank';
const email = 'frank@test-email.com';
const password = 'Pass123';

describe('Registered account works', () => {
  it('Sign up account test', () => {
    cy.visit(`${urlBase}/register`);
    cy.get('#first-name', { timeout: 10000 }).type(firstName);
    cy.get('#email').type(email);
    cy.get('#user-password').type(password);
    cy.get('#user-password-confirmation').type('123');
    cy.get('button[type="submit"]').click();
    cy.contains('Passwords do not match').should('exist');
    cy.get('#user-password-confirmation').clear().type(password);
    cy.get('button[type="submit"]').click();
    cy.get('[data-cy="nav-user"]').click();
    cy.get('[data-cy="drop-sign-out"]').click();
    cy.url().should('eq', `${urlBase}/logout`);
    cy.get('button[type="submit"]').click();
  });

  // it('Bookmarks are saved', () => {
  //   cy.get('[data-cy="nav-mygallery"]').click();
  // })
});
