/// <reference types="cypress" />

describe('Home page renders correctly', () => {
  before(() => {
    cy.visit('http://localhost:3000');
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
    cy.get('[data-cy="object-count"]').should('exist');
    cy.get('[data-cy="layout-column"]').should('exist');
    cy.get('[data-cy="layout-list"]').should('exist');
    cy.get('[data-cy="first-page"]').should('exist').should('have.length', 2);
    cy.get('[data-cy="previous-page"]')
      .should('exist')
      .should('have.length', 2);
    cy.get('[data-cy="page-display"]').should('exist').should('have.length', 2);
    cy.get('[data-cy="next-page"]').should('exist').should('have.length', 2);
    cy.get('[data-cy="last-page"]').should('exist').should('have.length', 2);
    cy.get('[data-cy="card-O1241585"]').should('exist');
    cy.contains('Peter Rabbit place card').should('exist');
  });
});

describe('Item page renders correctly', () => {
  before(() => {
    cy.visit('http://localhost:3000/item/O1241585');
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

describe.only('Bookmarks page renders correctly', () => {
  before(() => {
    cy.visit('http://localhost:3000/mygallery');
  });

  it('My Gallery page renders empty initially', () => {
    cy.contains('My Gallery').should('exist');
    cy.contains('No images').should('exist');
  });

  it('Added bookmark show up in my Gallery', () => {
    cy.visit('http://localhost:3000/item/O1241585');
    cy.get('[data-cy="item-book-btn"]').click();
    cy.visit('http://localhost:3000/mygallery');
    cy.contains('No images').should('not.exist');
    cy.contains('Peter Rabbit').should('exist');
  });
});
