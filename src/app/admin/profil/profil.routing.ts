import { Routes } from "@angular/router";

import { ProfilComponent } from "./profil.component";

export const ProfilRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "",
        component: ProfilComponent,
      },
    ],
  },
];
