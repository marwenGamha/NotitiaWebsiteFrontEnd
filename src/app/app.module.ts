import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule } from "@angular/router";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { AppComponent } from "./app.component";

import { SidebarModule } from "./admin/sidebar/sidebar.module";
import { FixedPluginModule } from "./admin/shared/fixedplugin/fixedplugin.module";
import { FooterModule } from "./admin/shared/footer/footer.module";
import { NavbarModule } from "./admin/shared/navbar/navbar.module";
import { AdminLayoutComponent } from "./admin/layouts/admin/admin-layout.component";
import { AuthLayoutComponent } from "./admin/layouts/auth/auth-layout.component";
import { AppRoutes } from "./app.routing";
import { LandingComponent } from "./landing/landing/landing.component";
import { BlogComponent } from "./admin/blog/blog.component";
import { LoginComponent } from "./login/login/login.component";
import { ProfilComponent } from "./admin/profil/profil.component";
import { UserrComponent } from "./admin/userr/userr.component";
import { AuthInterceptor } from "./login/auth/auth.interceptor";
import { UserService } from "./login/user.service";
import { AuthGuard } from "./login/auth/auth.guard";
import { UserrGuard } from "./admin/userr/userr.guard";
import { ResetComponent } from "./reset/reset.component";
import { SetPasswordComponent } from "./set-password/set-password.component";
import { ValueComponent } from "./admin/value/value.component";
import { TeamComponent } from "./admin/team/team.component";
import { ContactComponent } from "./admin/contact/contact.component";
import { RoleComponent } from "./admin/role/role.component";
import { ServicesComponent } from './admin/services/services.component';
import { ClientComponent } from './admin/client/client.component';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(AppRoutes),
    NgbModule,
    HttpClientModule,
    SidebarModule,
    NavbarModule,
    FooterModule,
    FixedPluginModule,
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    LandingComponent,
    BlogComponent,
    LoginComponent,
    ProfilComponent,
    UserrComponent,
    ResetComponent,
    SetPasswordComponent,
    ValueComponent,
    TeamComponent,
    ContactComponent,
    RoleComponent,
    ServicesComponent,
    ClientComponent,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    AuthGuard,
    UserrGuard,
    UserService,
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}
