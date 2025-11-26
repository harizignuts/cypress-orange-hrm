import { intercept } from "../../support/page-object/common/intercepts";
import { PIMPage } from "../../support/page-object/PIM/pim.page";
import type { Employee } from "../../support/types/employee";
import { DashboardPage } from "../../support/page-object/Dashboard/dashboard.page";
import { AdminPage } from "../../support/page-object/Admin/admin.page";
import { User } from "../../support/types/user";

describe("....", () => {
  const pimPage = new PIMPage();
  const dashboardPage = new DashboardPage();
  const adminPage = new AdminPage();

  // Prepare employee data and intercepts
  beforeEach(() => {
    const employee: Employee = {
      firstName: "",
      middleName: "D.",
      lastName: "Malam",
      employeeId: "",
      empNumber: "",
      photograph: "cypress/fixtures/profile.jpg",
    };
    const user: User = {
      role: "Admin",
      username: "",
      EmployeeName: "",
      password: "Password123!",
      status: "Enabled",
    };
    employee.employeeId = Math.floor(Math.random() * 100000).toString();
    employee.firstName = `Hari_${employee.employeeId}`;
    user.username = `user_${employee.employeeId}`;
    user.EmployeeName = `${employee.firstName} ${employee.middleName} ${employee.lastName}`;
    cy.wrap(employee).as("employeeData");
    cy.wrap(user).as("userData");

    cy.intercept("GET", intercept.dashboard.employees.actionSummary.url).as(
      intercept.dashboard.employees.actionSummary.alias
    );
    cy.intercept("GET", intercept.dashboard.employees.locations.url).as(
      intercept.dashboard.employees.locations.alias
    );
    cy.intercept("GET", intercept.dashboard.shortcuts.url).as(
      intercept.dashboard.shortcuts.alias
    );

    cy.intercept("GET", intercept.pim.employees.get.url).as(
      intercept.pim.employees.get.alias
    );
    cy.intercept("GET", intercept.admin.employmentStatus.url).as(
      intercept.admin.employmentStatus.alias
    );
    cy.intercept("GET", intercept.admin.jobTitles.url).as(
      intercept.admin.jobTitles.alias
    );
    cy.intercept("GET", intercept.admin.subunits.url).as(
      intercept.admin.subunits.alias
    );
    cy.intercept("GET", intercept.core.validation.unique.url).as(
      intercept.core.validation.unique.alias
    );
    cy.intercept("POST", intercept.pim.employees.post.url).as(
      intercept.pim.employees.post.alias
    );
    cy.intercept("DELETE", intercept.pim.employees.delete.url).as(
      intercept.pim.employees.delete.alias
    );
    cy.intercept("GET", intercept.admin.users.get.url).as(
      intercept.admin.users.get.alias
    );
    cy.intercept("POST", intercept.auth.public.validation.password.url).as(
      intercept.auth.public.validation.password.alias
    );
    cy.intercept("POST", intercept.admin.users.post.url).as(
      intercept.admin.users.post.alias
    );
    cy.intercept("DELETE", intercept.admin.users.delete.url).as(
      intercept.admin.users.delete.alias
    );
  });

  it("....", () => {
    // Visit Dashboard Page
    dashboardPage.visitDashboard();
    // From Dashboard Go to PIM Employee List Page & ADD Employee & Verify
    pimPage.addNewEmployee();

    // Go to Admin Page and Add User
    adminPage.addUser();

    // Finally, Delete the created User
    adminPage.deleteUser();

    // finally, Delete the created Employee
    pimPage.deleteEmployee();
  });
});
