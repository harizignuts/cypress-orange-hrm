export const CommonSelectors = {
  header: {
    topbar: "header.oxd-topbar",
    title: "header.oxd-topbar > .oxd-topbar-header-title > span > h6",

    dropdown: {
      button: "li.oxd-userdropdown",
      name: "p.oxd-userdropdown-name",
      icon: "i.oxd-userdropdown-icon",
      menu: ".oxd-dropdown-menu, ul[role='menu']",
      menuItem: ".oxd-dropdown-menu > li > a[role='menuitem']",
    },
  },
  mainMenu: {
    item: "ul.oxd-main-menu a.oxd-main-menu-item",
  },
  body: "body",
  formLoader: ".oxd-form-loader",
  spinner: ".oxd-loading-spinner",
  trashIcon: ".oxd-icon.bi-trash",
  sheet: ".oxd-sheet",
  button: {
    button: "button[type='button']",
    submit: "button[type='submit']",
    reset: "button[type='reset']",
    cancel: "button[type='button']",
  },
  form: {
    input: {
      input: "input.oxd-input",
      password: 'input[type="password"].oxd-input',
      text: 'input[type="text"].oxd-input',
      number: 'input[type="number"].oxd-input',
      email: 'input[type="email"].oxd-input',
    },
    inputGroup: ".oxd-input-group",
  },
  table: {
    body: ".oxd-table-body",
    card: ".oxd-table-card",
    deleteIcon: ".oxd-icon.bi-trash",
  },
} as const;
