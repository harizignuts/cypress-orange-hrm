export interface User {
  role: "Admin" | "ESS";
  username: string;
  EmployeeName: string;
  password: string;
  status: "Enabled" | "Disabled";
}
