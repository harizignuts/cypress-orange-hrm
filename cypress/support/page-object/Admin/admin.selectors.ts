export const adminSelectors = {
  addBtn: "button[type='button']:contains('Add')",

  addUserForm: {
    formGroup: ".oxd-input-group",
    employeeNameInput: "input[placeholder='Type for hints...']",
    selectTextInput: "div.oxd-select-text-input",
    selectDropdown: "div.oxd-select-dropdown",
    selectAutocompleteDropdown: ".oxd-autocomplete-dropdown",
    selectAutocompleteOption: ".oxd-autocomplete-option",
    usernameInput: "input.oxd-input",
    saveBtn: "button[type='submit']",
  },

  searchBtn: 'button[type="submit"]:contains("Search")',
  recordFound: "span:contains('(1) Record Found')",
} as const;
