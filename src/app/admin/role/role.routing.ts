import { Routes } from "@angular/router";

import { RoleComponent } from "./role.component";

export const RoleRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "",
        component: RoleComponent,
      },
    ],
  },
];
