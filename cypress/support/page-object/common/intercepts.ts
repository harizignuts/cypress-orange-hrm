const prfeix = "**/api/v2";

export const intercept = {
  i18nMessages: {
    url: `**/i18n/messages*`,
    alias: "getI18nMessages",
  },
  core: {
    validation: {
      unique: {
        url: `**/core/validation/unique*`,
        alias: "getCoreValidationUnique",
      },
    },
  },
  dashboard: {
    shortcuts: {
      url: `${prfeix}/dashboard/shortcuts`,
      alias: "getDashboardShortcuts",
    },
    employees: {
      timeAtWork: {
        url: `${prfeix}/dashboard/employees/time-at-work`,
        alias: "getTimeAtWork",
      },
      actionSummary: {
        url: `${prfeix}/dashboard/employees/action-summary`,
        alias: "getActionSummary",
      },
      leaves: {
        url: `${prfeix}/dashboard/employees/leaves`,
        alias: "getEmployeeLeaves",
      },
      subunits: {
        url: `${prfeix}/dashboard/employees/subunits`,
        alias: "getEmployeeSubunits",
      },
      locations: {
        url: `${prfeix}/dashboard/employees/locations`,
        alias: "getEmployeeLocations",
      },
    },
  },
  buzz: {
    feed: {
      url: `${prfeix}/buzz/feed*`,
      alias: "getBuzzFeed",
    },
  },
  pim: {
    employees: {
      get: {
        url: `${prfeix}/pim/employees*`,
        alias: "getPimEmployees",
      },
      post: {
        url: `${prfeix}/pim/employees`,
        alias: "postPimEmployees",
      },
      delete: {
        url: `${prfeix}/pim/employees`,
        alias: "deletePimEmployee",
      },
    },
  },
  admin: {
    employmentStatus: {
      url: `${prfeix}/admin/employment-status*`,
      alias: "getEmploymentStatus",
    },
    jobTitles: {
      url: `${prfeix}/admin/job-titles*`,
      alias: "getJobTitles",
    },
    subunits: {
      url: `${prfeix}/admin/subunits*`,
      alias: "getAdminSubunits",
    },
    users: {
      get: {
        url: `${prfeix}/admin/users*`,
        alias: "getAdminUsers",
      },
      post: {
        url: `${prfeix}/admin/users`,
        alias: "postAdminUsers",
      },
      delete: {
        url: `${prfeix}/admin/users*`,
        alias: "deleteAdminUser",
      },
    },
    validation: {
      usernName: {
        url: `${prfeix}/admin/validation/user-name*`,
        alias: "getAdminValidationUsername",
      },
    },
  },
  auth: {
    public: {
      validation: {
        password: {
          url: `**/auth/public/validation/password`,
          alias: "postAuthPublicValidationPassword",
        },
      },
    },
  },
};
