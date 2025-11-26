import { BasePage } from "../base.page";
import { intercept } from "../common/intercepts";
import { loginSelectors as selectors } from "./login.selectors";
import { CommonSelectors as cs } from "../common/common.selector";
export class LoginPage extends BasePage {
  constructor() {
    super();
    cy.intercept("GET", intercept.i18nMessages.url).as(
      `${intercept.i18nMessages.alias}`
    );
  }
  private fillUsername(username: string): this {
    cy.get(selectors.usernameInput)
      .first()
      .should("be.visible")
      .clear()
      .type(username);
    return this;
  }

  private fillPassword(password: string): this {
    cy.get(selectors.passwordInput)
      .first()
      .should("be.visible")
      .clear()
      .type(password);
    return this;
  }

  private submitLogin(): this {
    cy.get(cs.button.submit)
      .first()
      .should("be.enabled")
      .contains("Login")
      .click();
    return this;
  }

  loginUser(username: string, password: string): this {
    cy.intercept("GET", intercept.i18nMessages.url).as(
      `${intercept.i18nMessages.alias}`
    );

    // Navigate to Login page & assert URL
    cy.visit(this.url.auth.login);
    cy.wait(`@${intercept.i18nMessages.alias}`);
    cy.location("pathname").should("eq", this.url.auth.login);
    cy.get(selectors.logo).should("exist").should("be.visible");

    // Fill and submit the login form
    this.fillUsername(username).fillPassword(password).submitLogin();
    return this;
  }
}
