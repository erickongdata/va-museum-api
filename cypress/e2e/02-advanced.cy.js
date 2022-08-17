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

describe('Gallery functions work', () => {
  before(() => {
    cy.visit(urlBase);
    cy.get('[data-cy="search-input"]').type('Potter Beatrix peter rabbit');
    cy.get('[data-cy="search-submit-btn"]').click();
  });

  it('Page navigator', () => {
    // buttons
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

  it('Layout buttons', () => {
    cy.get('[data-cy="gallery-card"]', { timeout: 10000 }).should(
      'have.length',
      15
    );
    cy.get('[data-cy="layout-list"]').click();
    cy.get('[data-cy="gallery-card"]').should('not.exist');
    cy.get('[data-cy="gallery-list-card"]')
      .should('exist')
      .should('have.length', 15);
    cy.get('[data-cy="layout-column"]').click();
    cy.get('[data-cy="gallery-list-card"]').should('not.exist');
    cy.get('[data-cy="gallery-card"]').should('exist');
  });

  it('Gallery card and list card links work', () => {
    // card-links
    cy.get(`[data-cy="card"]`).first().click();
    cy.url().should('contain', `${urlBase}/item/`);
    cy.go('back');
    cy.get('[data-cy="layout-list"]').click();
    cy.get('[data-cy="list-card"]').first().click();
    cy.url().should('contain', `${urlBase}/item/`);
  });

  it('Gallery card and list card bookmarks work', () => {
    // card-bookmarks
    cy.get('[data-cy="card-book"]').first().click();
    cy.visit(`${urlBase}/mygallery/`);
    cy.get('[data-cy="gallery-card"]').should('exist').should('have.length', 1);
    cy.get('[data-cy="card-book"]').first().click();
    cy.get('[data-cy="gallery-card"]').should('not.exist');
    cy.go('back');
    cy.get('[data-cy="layout-list"]').click();
    cy.get('[data-cy="list-card-book"]').first().click();
    cy.visit(`${urlBase}/mygallery/`);
    cy.get('[data-cy="gallery-card"]').should('exist').should('have.length', 1);
    cy.get('[data-cy="layout-list"]').click();
    cy.get('[data-cy="gallery-list-card"]')
      .should('exist')
      .should('have.length', 1);
    cy.get('[data-cy="list-card-book"]').first().click();
    cy.get('[data-cy="gallery-list-card"]').should('not.exist');
  });
});

describe('My Gallery functions functions work', () => {
  before(() => {
    cy.visit(urlBase);
    cy.get('[data-cy="search-input"]').type('Potter Beatrix peter rabbit');
    cy.get('[data-cy="search-submit-btn"]').click();
  });

  it('Multiple bookmarks test', () => {
    // Add 20 bookmarks in total
    cy.get('[data-cy="card-book"]')
      .should('have.length', 15)
      .each(($el) => {
        cy.wrap($el).click();
      });
    cy.get('[data-cy="next-page"]').first().click();
    cy.get('[data-cy="card-book"]')
      .should('have.length', 15)
      .each(($el, index) => {
        if (index < 5) {
          cy.wrap($el).click();
        }
      });
    cy.visit(`${urlBase}/mygallery/`);
    cy.get('[data-cy="gallery-card"]')
      .should('exist')
      .should('have.length', 15);
    cy.get('[data-cy="next-page"]').first().click();
    cy.get('[data-cy="gallery-card"]').should('exist').should('have.length', 5);
    cy.contains('2 of 2').should('exist');
    // Test paging
    cy.get('[data-cy="previous-page"]').first().click();
    cy.get('[data-cy="gallery-card"]')
      .should('exist')
      .should('have.length', 15);
    cy.contains('1 of 2').should('exist');
    cy.get('[data-cy="last-page"]').first().click();
    cy.contains('2 of 2').should('exist');
    cy.get('[data-cy="first-page"]').first().click();
    cy.contains('1 of 2').should('exist');
    cy.get('[data-cy="page-display"]').first().click();
    cy.get('[data-cy="page-input"]').first().type('2{enter}');
    cy.contains('2 of 2').should('exist');
  });
});
