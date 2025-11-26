import { BasePage } from "../base.page";
import { intercept } from "../common/intercepts";

export class DashboardPage extends BasePage {
  visitDashboard() {
    cy.visit(this.url.dashboard.index);
    cy.wait([
      `@${intercept.dashboard.employees.actionSummary.alias}`,
      `@${intercept.dashboard.employees.locations.alias}`,
      `@${intercept.dashboard.shortcuts.alias}`,
      `@${intercept.i18nMessages.alias}`,
    ]);
    cy.location("pathname").should("eq", this.url.dashboard.index);
  }
}
