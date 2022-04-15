import { Routes } from "@angular/router";

import { UserrComponent } from "./userr.component";

export const UserrRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "",
        component: UserrComponent,
      },
    ],
  },
];
