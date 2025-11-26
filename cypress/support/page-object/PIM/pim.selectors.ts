export const pimSelectors = {
  employeeList: {
    link: 'a:contains("Employee List")',
  },
  addEmployee: {
    container: ".orangehrm-card-container",
    firstNameInput: ".orangehrm-firstname",
    middleNameInput: ".orangehrm-middlename",
    lastNameInput: ".orangehrm-lastname",
    employeeIdInput:
      ".oxd-input-group:has(label:contains('Employee Id')) input", // Specific selector for ID input
    profilePictureInput: ".oxd-file-input",
    profileImage: ".employee-image",
    saveBtn: "button[type='submit']",

    // Generic selector to find an error message
    errorMessage: ".oxd-input-field-error-message",
    // Selector to find the specific group containing the ID
    idInputGroup: ".oxd-input-group:has(label:contains('Employee Id'))",
  },

  employeeInformationForm: {
    employeeNameInput: 'input[placeholder="Type for hints..."]',
    autocompleteDropdown: ".oxd-autocomplete-dropdown",
    autocompleteDropdownOption: 'div.oxd-autocomplete-option[role="option"]',
  },

  employeeListTable: {
    body: ".oxd-table-body",
    card: ".oxd-table-card",
    deleteIcon: ".oxd-icon.bi-trash",
  },
};
