import { LoginComponent } from "./login/login/login.component";
import { LandingComponent } from "./landing/landing/landing.component";
import { Routes } from "@angular/router";

import { AdminLayoutComponent } from "./admin/layouts/admin/admin-layout.component";
import { AuthLayoutComponent } from "./admin/layouts/auth/auth-layout.component";
import { AuthGuard } from "../app/login/auth/auth.guard";
import { UserrGuard } from "./admin/userr/userr.guard";
import { ResetComponent } from "./reset/reset.component";
import { SetPasswordComponent } from "./set-password/set-password.component";
import { TeamGuard } from "./guardd/team.guard";
import { ContactGuard } from "./guardd/contact.guard";
import { ValeurGuard } from "./guardd/valeur.guard";
import { UserGuard } from "./guardd/user.guard";
import { DashGuard } from "./guardd/dash.guard";
export const AppRoutes: Routes = [
  { path: "home", component: LandingComponent },
  { path: "login", component: LoginComponent },
  { path: "forget-password", component: ResetComponent },
  { path: "reset-password/:token", component: SetPasswordComponent },
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full",
  },
  {
    path: "admin",
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: "",
        loadChildren: "./admin/profil/profil.module#ProfilModule",
      },
      {
        path: "dashboard",
        loadChildren: "./admin/dashboard/dashboard.module#DashboardModule",
        canActivate: [DashGuard],
      },

      {
        path: "user",
        loadChildren: "./admin/userr/userr.module#UserrModule",
        canActivate: [UserGuard],
      },
      {
        path: "value",
        loadChildren: "./admin/value/value.module#ValueModule",
        canActivate: [ValeurGuard],
      },
      {
        path: "team",
        loadChildren: "./admin/team/team.module#TeamModule",
        canActivate: [TeamGuard],
      },

      {
        path: "profil",
        loadChildren: "./admin/profil/profil.module#ProfilModule",
      },
      {
        path: "contact",
        loadChildren: "./admin/contact/contact.module#ContactModule",
        canActivate: [ContactGuard],
      },
      {
        path: "role",
        loadChildren: "./admin/role/role.module#RoleModule",
        canActivate: [UserrGuard],
      },
      {
        path: "services",
        loadChildren: "./admin/services/services.module#ServicesModule",
      },
      {
        path: "client",
        loadChildren: "./admin/client/client.module#ClientModule",
      },

      // {
      //   path: "components",
      //   loadChildren: "./admin/components/components.module#ComponentsModule",
      // },
      // {
      //   path: "forms",
      //   loadChildren: "./admin/forms/forms.module#Forms",
      // },
      // {
      //   path: "tables",
      //   loadChildren: "./admin/tables/tables.module#TablesModule",
      // },
      // {
      //   path: "maps",
      //   loadChildren: "./admin/maps/maps.module#MapsModule",
      // },
      // {
      //   path: "charts",
      //   loadChildren: "./admin/charts/charts.module#ChartsModule",
      // },
      // {
      //   path: "calendar",
      //   loadChildren: "./admin/calendar/calendar.module#CalendarModule",
      // },

      // {
      //   path: "blog",
      //   loadChildren: "./admin/blog/blog.module#BlogModule",
      // },

      // {
      //   path: "",
      //   loadChildren: "./admin/userpage/user.module#UserModule",
      // },
      // {
      //   path: "",
      //   loadChildren: "./admin/timeline/timeline.module#TimelineModule",
      // },
      // {
      //   path: "",
      //   loadChildren: "./admin/widgets/widgets.module#WidgetsModule",
      // },
    ],
  },
  // {
  //   path: "",
  //   component: AuthLayoutComponent,
  //   children: [
  //     {
  //       path: "pages",
  //       loadChildren: "./admin/pages/pages.module#PagesModule",
  //     },
  //   ],
  // },
];
