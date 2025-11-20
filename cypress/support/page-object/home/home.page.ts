import { BasePage } from "../base.page";
import { HomeSelectors } from "./home.selectors";

export class HomePage extends BasePage {
  // URL path for this page
  url = "/";

  /**
   * @author Hari Malam
   * @description This method opens (visits) the home page
   * @returns void
   */
  open() {
    this.visit(this.url, true);
  }

  clickUtilitiesLink() {
    this.$(HomeSelectors.utilitiesLink).first().should("be.visible").click();
  }
}
