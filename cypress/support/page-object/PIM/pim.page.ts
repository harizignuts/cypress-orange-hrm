import { BasePage } from "../base.page";
import { pimSelectors as selectors } from "./pim.selectors";
import { Employee } from "../../types/employee";
import { CommonSelectors as cs } from "../common/common.selector";
import { intercept } from "../common/intercepts";
export class PIMPage extends BasePage {
  // Public method to add a new employee
  addNewEmployee(): this {
    // Go to Employee List page
    this.visitEmployeeList();
    // click Add Employee button
    this.clickAddEmployeeButton();
    cy.location("pathname").should("eq", this.url.pim.addEmployee);

    // Fill and submit the Add Employee form
    cy.get<Employee>("@employeeData").then((employee) => {
      this.fillAddEmployeeForm(employee);
    });

    this.submitEmployeeForm().then((employee: Employee) => {
      cy.location("pathname").should(
        "eq",
        `${this.url.pim.viewPersonalDetails.empNumber}/${employee.empNumber}`
      );
      this.visitEmployeeList();
      this.searchEmployee(employee);
      this.verifyRecordFound(employee);
    });

    return this;
  }

  // Public method to delete an employee
  deleteEmployee(): this {
    // Go to Employee List page
    this.visitEmployeeList();

    // Search and delete the employee
    cy.get<Employee>("@employeeData").then((employee) => {
      this.searchEmployee(employee);
      this.getRecordFromTable(employee)
        .within(() => {
          cy.get(selectors.employeeListTable.deleteIcon)
            .should("be.visible")
            .click();
        })
        .then(() => {
          cy.get(cs.sheet)
            .contains("button", "Yes, Delete")
            .should("be.visible")
            .click();
        });
    });

    cy.wait([`@${intercept.pim.employees.delete.alias}`]);
    return this;
  }

  // Fill the Add Employee form with provided user data
  private fillAddEmployeeForm(user: Employee): this {
    // Fill in mandatory fields
    cy.get(selectors.addEmployee.firstNameInput)
      .first()
      .should("be.visible")
      .clear()
      .type(user.firstName)
      .should("have.value", user.firstName);
    cy.get(selectors.addEmployee.lastNameInput)
      .first()
      .should("be.visible")
      .clear()
      .type(user.lastName)
      .should("have.value", user.lastName);

    // Fill in optional fields if provided
    if (user.middleName) {
      cy.get(selectors.addEmployee.middleNameInput)
        .first()
        .should("be.visible")
        .clear()
        .type(user.middleName)
        .should("have.value", user.middleName);
    }
    if (user.employeeId) {
      cy.get(selectors.addEmployee.employeeIdInput)
        .first()
        .should("be.visible")
        .clear()
        .type(user.employeeId)
        .should("have.value", user.employeeId);
    }
    if (user.photograph) {
      cy.get(selectors.addEmployee.profilePictureInput)
        .should("exist")
        .first()
        .selectFile(user.photograph, { force: true });

      cy.get(selectors.addEmployee.profileImage)
        .should("be.visible")
        .should("have.attr", "src")
        .and("not.include", "default");
    }

    return this;
  }

  // Click the "Add" button to open the Add Employee form (PIM > Employee List > Add)
  private clickAddEmployeeButton(): this {
    cy.get(cs.button.button)
      .contains("Add", { matchCase: false })
      .first()
      .should("be.visible")
      .click();
    cy.wait([`@${intercept.pim.employees.get.alias}`]);
    return this;
  }

  // Submit the Add Employee form
  private submitEmployeeForm(): Cypress.Chainable<Employee> {
    cy.get(cs.button.submit)
      .contains("Save", { matchCase: false })
      .first()
      .should("be.visible")
      .click();
    cy.wait([`@${intercept.core.validation.unique.alias}`]);

    return cy
      .wait([`@${intercept.pim.employees.post.alias}`])
      .then((interception: any) => {
        cy.log(JSON.stringify(interception.response.body.data));

        return cy.get<Employee>("@employeeData").then((employee) => {
          // Set empNumber from response data
          (employee as any).empNumber =
            interception.response.body.data.empNumber;

          return employee;
        });
      });
  }

  // Navigate to Employee List page
  private visitEmployeeList(): this {
    // Navigate to Employee List page & assert URL
    cy.visit(this.url.pim.employeeList);
    cy.wait([
      `@${intercept.pim.employees.get.alias}`,
      `@${intercept.i18nMessages.alias}`,
      `@${intercept.admin.employmentStatus.alias}`,
      `@${intercept.admin.jobTitles.alias}`,
      `@${intercept.admin.subunits.alias}`,
    ]);
    cy.location("pathname").should("eq", this.url.pim.employeeList);
    return this;
  }

  // Click the "Search" button to perform employee search
  private clickSearchButton = () => {
    cy.get(cs.button.submit)
      .contains("Search", { matchCase: false })
      .should("be.visible")
      .click();

    cy.wait(`@${intercept.pim.employees.get.alias}`);
  };

  // Fill the Employee Information form in the Employee List page
  private fillEmployeeInformationForm = (employee: Employee) => {
    cy.get(cs.form.inputGroup)
      .contains("Employee Name")
      .parent()
      .parent()
      .find(selectors.employeeInformationForm.employeeNameInput)
      .first()
      .should("be.visible")
      .clear()
      .type(`${employee.firstName} ${employee.lastName}`)
      .should("have.value", `${employee.firstName} ${employee.lastName}`)
      .then(() => {
        cy.get(selectors.employeeInformationForm.autocompleteDropdown)
          .should("be.visible")
          .find(selectors.employeeInformationForm.autocompleteDropdownOption)
          .should("contain", employee.firstName, employee.lastName)
          .first()
          .click();
      });
    cy.wait(`@${intercept.pim.employees.get.alias}`);

    if (employee.employeeId) {
      cy.get(cs.form.inputGroup)
        .contains("Employee Id")
        .parent()
        .parent()
        .find(cs.form.input.input)
        .should("be.visible")
        .clear()
        .type(employee.employeeId)
        .should("have.value", employee.employeeId);
    }
  };

  // Search for an employee using the Employee Information form
  private searchEmployee = (employee: Employee) => {
    this.fillEmployeeInformationForm(employee);
    this.clickSearchButton();
  };

  // Get the record from the employee list table
  private getRecordFromTable = (employee: Employee) => {
    return cy
      .get(selectors.employeeListTable.body)
      .should("be.visible")
      .within(() => {
        return cy
          .get(selectors.employeeListTable.card)
          .should("have.length.greaterThan", 0)
          .first()
          .within(() => {
            cy.contains(`${employee.firstName}`, { matchCase: false }).should(
              "be.visible"
            );
            cy.contains(`${employee.lastName}`, { matchCase: false }).should(
              "be.visible"
            );
            if (employee.employeeId) {
              cy.contains(employee.employeeId).should("be.visible");
            }
          });
      });
  };

  // Verify that a record is found in the employee list table
  private verifyRecordFound = (employee: Employee): this => {
    this.getRecordFromTable(employee);
    return this;
  };
}
