import { Routes } from "@angular/router";

import { ValueComponent } from "./value.component";

export const ValueRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "",
        component: ValueComponent,
      },
    ],
  },
];
