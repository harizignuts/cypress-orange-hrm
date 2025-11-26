import { AdminPages } from "../../types/AdminPages";
import { Employee } from "../../types/employee";
import { User } from "../../types/user";
import { BasePage } from "../base.page";
import { CommonSelectors as cs } from "../common/common.selector";
import { intercept } from "../common/intercepts";
import { adminSelectors as selectors } from "./admin.selectors";

export class AdminPage extends BasePage {
  addUser(): this {
    this.visit().clickAddButton().fillAddUserForm().clickSaveButton();
    this.visit().searchUser().verifyRecordFound();
    return this;
  }

  deleteUser(): this {
    cy.get<User>("@userData").then((user) => {
      cy.get<Employee>("@employeeData").then((employee) => {
        this.visit()
          .searchUser()
          .getRecordFromTable(user, employee)
          .within(() => {
            cy.get(cs.trashIcon).should("be.visible").click();
          })
          .then(() => {
            cy.get(cs.sheet)
              .contains("button", "Yes, Delete")
              .should("be.visible")
              .click();
            cy.wait([`@${intercept.admin.users.delete.alias}`]);
          });
      });
    });
    return this;
  }

  private searchUser(): this {
    this.fillUserSearchForm().clickSearchButton();
    return this;
  }

  private visit(page: AdminPages = "default"): this {
    cy.visit(this.url.admin[page]);
    cy.wait(`@${intercept.admin.users.get.alias}`);
    return this;
  }

  private clickAddButton(): this {
    cy.get(cs.button.button)
      .contains("Add", { matchCase: false })
      .should("be.visible")
      .click();
    return this;
  }

  private selectUserRole(role: "Admin" | "ESS"): this {
    cy.contains(cs.form.inputGroup, "User Role", { matchCase: false })
      .find(selectors.addUserForm.selectTextInput)
      .should("be.visible")
      .click()
      .then(() => {
        cy.get(selectors.addUserForm.selectDropdown)
          .should("be.visible")
          .contains("span", role)
          .click();
      });
    return this;
  }

  private selectStatus(status: "Enabled" | "Disabled"): this {
    cy.contains(cs.form.inputGroup, "Status", { matchCase: false })
      .find(selectors.addUserForm.selectTextInput)
      .should("be.visible")
      .click()
      .then(() => {
        cy.get(selectors.addUserForm.selectDropdown)
          .should("be.visible")
          .contains("span", status)
          .click();
      });
    return this;
  }

  private selectEmployeeName(firstname: string, lastname: string): this {
    cy.contains(cs.form.inputGroup, "Employee Name", { matchCase: false })
      .find(selectors.addUserForm.employeeNameInput)
      .should("be.visible")
      .clear()
      .type(`${firstname} ${lastname}`)
      .then(() => {
        cy.wait(`@${intercept.pim.employees.get.alias}`);
        cy.get(selectors.addUserForm.selectAutocompleteDropdown)
          .should("be.visible")
          .should("not.contain", "searching...", { matchCase: false })
          .then(() => {
            cy.get(selectors.addUserForm.selectAutocompleteOption)
              .should("be.visible")
              .first()
              .should("contain", firstname, { matchCase: false })
              .should("contain", lastname, { matchCase: false })
              .click();
          });
      });
    return this;
  }

  private clickSaveButton(): this {
    cy.get(cs.button.submit)
      .contains("Save", { matchCase: false })
      .should("be.visible")
      .click();
    cy.wait([
      `@${intercept.admin.users.get.alias}`,
      `@${intercept.admin.users.post.alias}`,
    ]);
    return this;
  }

  private typeUsername(username: string): this {
    cy.contains(cs.form.inputGroup, "Username", { matchCase: false })
      .find(selectors.addUserForm.usernameInput)
      .should("be.visible")
      .clear()
      .type(username)
      .should("have.value", username);
    return this;
  }

  private typePassword(password: string): this {
    cy.contains(cs.form.inputGroup, "Password", { matchCase: false })
      .find(cs.form.input.password)
      .should("be.visible")
      .clear()
      .type(password)
      .should("have.value", password);

    cy.wait(`@${intercept.auth.public.validation.password.alias}`);
    return this;
  }

  private typeConfirmPassword(password: string): this {
    cy.contains(cs.form.inputGroup, "Confirm Password", { matchCase: false })
      .find(cs.form.input.password)
      .should("be.visible")
      .clear()
      .type(password)
      .should("have.value", password);
    return this;
  }

  private fillAddUserForm(): this {
    cy.get<User>("@userData").then((user) => {
      this.selectUserRole(user.role);
      this.selectStatus(user.status);
      this.typeUsername(user.username);
      this.typePassword(user.password);
      this.typeConfirmPassword(user.password);
    });
    cy.get<Employee>("@employeeData").then((employee) => {
      this.selectEmployeeName(employee.firstName, employee.lastName);
    });

    return this;
  }

  private fillUserSearchForm(): this {
    cy.get<User>("@userData").then((user) => {
      this.typeUsername(user.username);
      this.selectStatus(user.status);
      this.selectUserRole(user.role);
    });
    cy.get<Employee>("@employeeData").then((employee) => {
      this.selectEmployeeName(employee.firstName, employee.lastName);
    });
    return this;
  }

  private clickSearchButton(): this {
    cy.get(cs.button.submit)
      .contains("Search", { matchCase: false })
      .should("be.visible")
      .click();
    cy.wait(`@${intercept.admin.users.get.alias}`);
    return this;
  }

  // Get the record from the employee list table
  private getRecordFromTable = (
    user: User,
    employee: Employee
  ): Cypress.Chainable<JQuery<HTMLElement>> => {
    return cy
      .get(cs.table.body)
      .should("be.visible")
      .within(() => {
        return cy
          .get(cs.table.card)
          .should("have.length.greaterThan", 0)
          .first()
          .within(() => {
            cy.contains(`${user.username}`, { matchCase: false }).should(
              "be.visible"
            );
            cy.contains(`${employee.firstName} ${employee.lastName}`, {
              matchCase: false,
            }).should("be.visible");
            cy.contains(`${user.role}`, { matchCase: false }).should(
              "be.visible"
            );
            cy.contains(`${user.status}`, { matchCase: false }).should(
              "be.visible"
            );
          });
      });
  };

  private verifyRecordFound(): this {
    cy.get<User>("@userData").then((user) => {
      cy.get<Employee>("@employeeData").then((employee) => {
        this.getRecordFromTable(user, employee);
      });
    });
    return this;
  }
}
