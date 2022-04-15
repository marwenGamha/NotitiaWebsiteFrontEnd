import { Routes } from "@angular/router";

import { ClientComponent } from "./client.component";

export const ClientRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "",
        component: ClientComponent,
      },
    ],
  },
];
