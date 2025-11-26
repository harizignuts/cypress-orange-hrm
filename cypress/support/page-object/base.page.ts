export class BasePage {
  timeout = {};
  url = {
    pim: {
      employeeList: "/web/index.php/pim/viewEmployeeList",
      addEmployee: "/web/index.php/pim/addEmployee",
      default: "/web/index.php/pim/viewEmployeeList",
      viewPersonalDetails: {
        empNumber: "/web/index.php/pim/viewPersonalDetails/empNumber",
      },
    },
    auth: {
      login: "/web/index.php/auth/login",
    },
    dashboard: {
      index: "/web/index.php/dashboard/index",
    },
    admin: {
      viewSystemUsers: "/web/index.php/admin/viewSystemUsers",
      saveSystemUser: "/web/index.php/admin/saveSystemUser",
      default: "/web/index.php/admin/viewSystemUsers",
    },
  };
}
