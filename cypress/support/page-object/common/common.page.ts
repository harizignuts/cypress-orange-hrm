import { BasePage } from "../base.page";
import { CommonSelectors } from "./common.selector";

export class CommonPage extends BasePage {
  header() {
    return cy.get(CommonSelectors.header.topbar);
  }

  dropdownButton() {
    return cy.get(CommonSelectors.header.dropdown.button);
  }

  logout() {
    this.dropdownButton()
      .should("be.visible")
      .click()
      .then(() => {
        cy.get(CommonSelectors.header.dropdown.menuItem)
          .should("be.visible")
          .contains("Logout")
          .click();
      });
  }
  getMainMenuItem(item: string) {
    return cy.get(CommonSelectors.mainMenu.item).contains(item);
  }
}
