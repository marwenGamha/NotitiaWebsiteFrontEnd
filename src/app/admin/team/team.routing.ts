import { Routes } from "@angular/router";

import { TeamComponent } from "./team.component";

export const TeamRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "",
        component: TeamComponent,
      },
    ],
  },
];
