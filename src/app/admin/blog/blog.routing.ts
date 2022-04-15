import { Routes } from "@angular/router";

import { BlogComponent } from "./blog.component";

export const BlogRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "",
        component: BlogComponent,
      },
    ],
  },
];
