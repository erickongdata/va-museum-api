/// <reference types="cypress" />

const urlBase = 'http://localhost:3000';

describe('Navigation', () => {
  it('Navbar works', () => {
    cy.visit(urlBase);
    cy.get('[data-cy="nav-mygallery"]').click();
    cy.url().should('eq', `${urlBase}/mygallery`);
    cy.get('[data-cy="nav-home"]').click();
    cy.url().should('eq', `${urlBase}/`);
    cy.get('[data-cy="nav-user"]').click(); // show dropdown
    cy.get('[data-cy="drop-sign-in"]').should('exist').click();
    cy.get('[data-cy="nav-user"]').click(); // hides
    cy.url().should('eq', `${urlBase}/login`);
    cy.get('[data-cy="nav-back"]').click();
    cy.url().should('eq', `${urlBase}/`);
    cy.get('[data-cy="nav-user"]').click();
    cy.get('[data-cy="drop-new-account"]').should('exist').click();
    cy.url().should('eq', `${urlBase}/register`);
  });

  it('SearchParams url works', () => {
    cy.visit(`${urlBase}/?query=Potter+Beatrix+peter+rabbit&page=1`);
    cy.get('[data-cy="gallery-card"]').should('have.length', 15);
    cy.contains('1 of').should('exist');
    cy.visit(`${urlBase}/?query=Potter+Beatrix+peter+rabbit&page=2`);
    cy.contains('2 of').should('exist');
  });

  it('Search bar input field works', () => {
    cy.visit(urlBase);
    cy.get('[data-cy="search-input"]').type(
      'Potter Beatrix peter rabbit{enter}'
    );
    cy.get('[data-cy="gallery-card"]', { timeout: 10000 }).should(
      'have.length',
      15
    );
    cy.visit(urlBase);
    cy.get('[data-cy="search-input"]').type('Potter Beatrix peter rabbit');
    cy.get('[data-cy="search-submit-btn"]').click();
    cy.get('[data-cy="gallery-card"]', { timeout: 10000 }).should(
      'have.length',
      15
    );
  });
});

describe.only('Gallery functions work', () => {
  before(() => {
    cy.visit(urlBase);
    cy.get('[data-cy="search-input"]').type('Potter Beatrix peter rabbit');
    cy.get('[data-cy="search-submit-btn"]').click();
  });

  it('Page navigator', () => {
    cy.url().should(
      'eq',
      `${urlBase}/?query=Potter+Beatrix+peter+rabbit&page=1`
    );
    cy.get('[data-cy="next-page"]').first().click();
    cy.url().should(
      'eq',
      `${urlBase}/?query=Potter+Beatrix+peter+rabbit&page=2`
    );
    cy.get('[data-cy="previous-page"]').first().click();
    cy.url().should(
      'eq',
      `${urlBase}/?query=Potter+Beatrix+peter+rabbit&page=1`
    );
    cy.get('[data-cy="last-page"]').first().click();
    cy.url().should(
      'eq',
      `${urlBase}/?query=Potter+Beatrix+peter+rabbit&page=45`
    );
    cy.get('[data-cy="first-page"]').first().click();
    cy.url().should(
      'eq',
      `${urlBase}/?query=Potter+Beatrix+peter+rabbit&page=1`
    );
    // input field
    cy.get('[data-cy="page-display"]').first().click();
    cy.get('[data-cy="page-input"]').first().type('6{enter}');
    cy.url().should(
      'eq',
      `${urlBase}/?query=Potter+Beatrix+peter+rabbit&page=6`
    );
    cy.get('[data-cy="page-display"]').first().click();
    cy.get('[data-cy="page-input"]').first().type('abc{enter}');
    cy.url().should(
      'eq',
      `${urlBase}/?query=Potter+Beatrix+peter+rabbit&page=1`
    );
    cy.get('[data-cy="page-display"]').first().click();
    cy.get('[data-cy="page-input"]').first().type('999{enter}');
    cy.url().should(
      'eq',
      `${urlBase}/?query=Potter+Beatrix+peter+rabbit&page=45`
    );
    cy.get('[data-cy="page-display"]').first().click();
    cy.get('[data-cy="page-input"]').first().type('-99{enter}');
    cy.url().should(
      'eq',
      `${urlBase}/?query=Potter+Beatrix+peter+rabbit&page=1`
    );
  });
});
