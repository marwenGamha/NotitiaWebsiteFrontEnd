import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from "@angular/router";
import { UserService } from "app/login/user.service";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class UserrGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.userService.isAdmin()) return true;
    else {
      this.router.navigateByUrl("/admin/profil");
      return false;
    }
  }
}
