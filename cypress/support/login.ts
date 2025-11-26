import { LoginPage } from "./page-object/Login/login.page";

export const login = (username: string, password: string) => {
  // Create page object instances
  const loginPage = new LoginPage();

  cy.log("Logging in with username: " + username);

  // Use cy.session to cache login session
  cy.session(
    username,
    () => {
      loginPage.loginUser(username, password);
    },
    {
      validate: () => {
        cy.visit(loginPage.url.dashboard.index);
        cy.location("pathname").should("eq", loginPage.url.dashboard.index);
      },
    }
  );
};
