import { AdminPage } from "../page-object/Admin/admin.page";

export type AdminPages = keyof typeof AdminPage.prototype.url.admin;
