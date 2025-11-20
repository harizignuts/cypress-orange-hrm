import { HomePage } from "../support/page-object/home/home.page";
import { CommonPage } from "../support/page-object/common/common.page";

describe("template spec", () => {
  it("passes", () => {
    cy.visit("https://example.cypress.io");
  });

  // New test to click on Utilities link
  it("should click on Utilities link", () => {
    const homePage = new HomePage();
    const commonPage = new CommonPage();

    // Open the home page
    homePage.open();
    homePage.clickUtilitiesLink();

    // Assert that the navbar is visible (common element)
    commonPage.Navbar.should("be.visible");
  });
});
