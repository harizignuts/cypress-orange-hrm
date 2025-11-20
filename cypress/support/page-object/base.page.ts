export class BasePage {
  /**
   * @author Hari Malam
   * @description This method navigates to a given URL
   * @param url - The URL to visit
   * @param assertUrl - Whether to assert the URL after navigation (default: true)
   * @returns this (the current page object)
   */
  visit(url: string, assertUrl: boolean = true) {
    cy.visit(url);

    if (assertUrl) {
      cy.location("pathname").should("eq", url);
    }

    return this;
  }

  /**
   * @author Hari Malam
   * @description This method returns a Cypress chainable for the given selector
   * @param selector - The CSS selector to get
   * @returns Cypress.Chainable
   */
  $(selector: string) {
    return cy.get(selector);
  }
}
