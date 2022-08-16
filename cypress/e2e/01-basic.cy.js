/// <reference types="cypress" />

const urlBase = 'http://localhost:3000';
const systemNumber = 'O1241585';

describe('Home page renders correctly', () => {
  before(() => {
    cy.visit(urlBase);
  });

  it('Home page and Navbar renders', () => {
    cy.get('[data-cy="nav-back"]').should('exist');
    cy.get('[data-cy="nav-top"]').should('exist');
    cy.get('[data-cy="nav-home"]').should('exist');
    cy.get('[data-cy="nav-mygallery"]').should('exist');
    cy.get('[data-cy="nav-user"]').should('exist');

    cy.get('[data-cy="search-input"]').should('exist');
    cy.get('[data-cy="search-submit-btn"]').should('exist');
    cy.get('[data-cy="featured-item__item1"]').should('exist');
    cy.contains('Constable').should('exist');
  });

  it('Gallery renders', () => {
    cy.get('[data-cy="featured-item__item1"]').click();
    cy.get('[data-cy="object-count"]', { timeout: 10000 }).should('exist');
    cy.get('[data-cy="layout-column"]').should('exist');
    cy.get('[data-cy="layout-list"]').should('exist');
    cy.get('[data-cy="first-page"]').should('exist').should('have.length', 2);
    cy.get('[data-cy="previous-page"]')
      .should('exist')
      .should('have.length', 2);
    cy.get('[data-cy="page-display"]').should('exist').should('have.length', 2);
    cy.get('[data-cy="next-page"]').should('exist').should('have.length', 2);
    cy.get('[data-cy="last-page"]').should('exist').should('have.length', 2);
    cy.get('[data-cy="gallery-card"]').should('have.length', 15);
  });
});

describe('Item page renders correctly', () => {
  before(() => {
    cy.visit(`${urlBase}/item/${systemNumber}`);
  });

  it('Item page renders', () => {
    cy.contains('Peter Rabbit', { timeout: 10000 }).should('exist');
    cy.contains('Watercolour').should('exist');
    cy.contains('BP.1568A').should('exist');
    cy.get('[data-cy="item-image"]').should('exist');
    cy.get('[data-cy="item-book-btn"]').should('exist');
  });

  it('Item page modal shows and hides on click', () => {
    cy.get('[data-cy="item-image"]').click();
    cy.get('[data-component="modal-image"]').should('exist');
    cy.get('[data-cy="modal-image-close"]').should('exist').click();
    cy.get('[data-component="modal-image"]').should('not.exist');
  });
});

describe('Bookmarks page renders correctly', () => {
  before(() => {
    cy.visit(`${urlBase}/mygallery`);
  });

  it('My Gallery page renders empty initially', () => {
    cy.contains('My Gallery').should('exist');
    cy.contains('No images').should('exist');
  });

  it('Added bookmark show up in my Gallery', () => {
    cy.visit(`${urlBase}/item/${systemNumber}`);
    cy.get('[data-cy="item-book-btn"]').click();
    cy.visit(`${urlBase}/mygallery`);
    cy.contains('No images').should('not.exist');
    cy.contains('Peter Rabbit').should('exist');
  });
});

describe('Login/New Account/Password Reset page renders correctly', () => {
  it('Login page renders', () => {
    cy.visit(`${urlBase}/login`);
    cy.get('#email').should('exist');
    cy.get('#user-password').should('exist');
    cy.contains('Forgot password?').should('exist');
    cy.get('button[type=submit]').should('exist');
    cy.contains('Sign up').should('exist');
  });

  it('New account page renders', () => {
    cy.visit(`${urlBase}/register`);
    cy.get('#first-name').should('exist');
    cy.get('#email').should('exist');
    cy.get('#user-password').should('exist');
    cy.get('#user-password-confirmation').should('exist');
    cy.get('button[type=submit]').should('exist');
    cy.get('a[href="/login"]').should('exist');
  });

  it('Password Reset page renders', () => {
    cy.visit(`${urlBase}/password-reset`);
    cy.get('#email').should('exist');
    cy.get('button[type=submit]').should('exist');
  });
});
