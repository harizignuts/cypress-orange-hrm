import { CommonSelectors } from "./common.selector";

export class CommonPage {
  /**
   * @author Hari Malam
   * @description This method returns the header element
   * @returns Cypress.Chainable
   */
  get Navbar() {
    return cy.get(CommonSelectors.navbar);
  }
}
