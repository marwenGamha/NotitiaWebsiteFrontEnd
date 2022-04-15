import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ProfilRoutes } from "./profil.routing";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { AuthInterceptor } from "app/login/auth/auth.interceptor";
import { AuthGuard } from "app/login/auth/auth.guard";
import { UserService } from "app/login/user.service";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(ProfilRoutes),
    HttpClientModule,
    FormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    AuthGuard,
    UserService,
  ],
})
export class ProfilModule {}
