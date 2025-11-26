import { CommonPage } from "./page-object/common/common.page";
import { LoginPage } from "./page-object/Login/login.page";

export const logout = () => {
  cy.log("Logging out");
  const commonPage = new CommonPage();

  commonPage.logout();
  return this;
};
