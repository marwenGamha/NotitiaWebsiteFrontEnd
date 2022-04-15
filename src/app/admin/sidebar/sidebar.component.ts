import { RoleService } from "./../../services/role.service";
import {
  Component,
  OnInit,
  AfterViewInit,
  AfterViewChecked,
  AfterContentInit,
  Input,
} from "@angular/core";
import { Router } from "@angular/router";
import { UserService } from "app/login/user.service";
import { Role } from "app/model/role.model";

//Metadata
export interface RouteInfo {
  path: string;
  title: string;
  type: string;
  collapse?: string;
  icontype: string;
  // icon: string;
  children?: ChildrenItems[];
}

export interface ChildrenItems {
  path: string;
  title: string;
  ab: string;
  type?: string;
}

//Menu Items
export const ROUTES: RouteInfo[] = [
  {
    path: "dashboard",
    title: "Dashboard",
    type: "link",
    icontype: "nc-icon nc-bank",
  },

  // {
  //   path: "blog",
  //   title: "blog",
  //   type: "link",
  //   icontype: "nc-icon nc-box",
  // },

  {
    path: "value",
    title: "Valeur",
    type: "link",
    icontype: "nc-icon nc-touch-id",
  },

  {
    path: "services",
    title: "services",
    type: "link",
    icontype: "nc-icon nc-money-coins",
  },
  {
    path: "team",
    title: "team",
    type: "link",
    icontype: "nc-icon nc-single-02",
  },
  {
    path: "client",
    title: "client",
    type: "link",
    icontype: "nc-icon nc-circle-10",
  },
  {
    path: "contact",
    title: "contact",
    type: "link",
    icontype: "nc-icon nc-email-85",
  },

  {
    path: "user",
    title: "user",
    type: "link",
    icontype: "nc-icon nc-badge",
  },

  {
    path: "role",
    title: "role",
    type: "link",
    icontype: "fa fa-lock",
  },

  // {
  //   path: "/components",
  //   title: "Components",
  //   type: "sub",
  //   collapse: "components",
  //   icontype: "nc-icon nc-layout-11",
  //   children: [
  //     { path: "buttons", title: "Buttons", ab: "B" },
  //     { path: "grid", title: "Grid System", ab: "GS" },
  //     { path: "panels", title: "Panels", ab: "P" },
  //     { path: "sweet-alert", title: "Sweet Alert", ab: "SA" },
  //     { path: "notifications", title: "Notifications", ab: "N" },
  //     { path: "icons", title: "Icons", ab: "I" },
  //     { path: "typography", title: "Typography", ab: "T" },
  //   ],
  // },
  // {
  //   path: "/forms",
  //   title: "Forms",
  //   type: "sub",
  //   collapse: "forms",
  //   icontype: "nc-icon nc-ruler-pencil",
  //   children: [
  //     { path: "regular", title: "Regular Forms", ab: "RF" },
  //     { path: "extended", title: "Extended Forms", ab: "EF" },
  //     { path: "validation", title: "Validation Forms", ab: "VF" },
  //     { path: "wizard", title: "Wizard", ab: "W" },
  //   ],
  // },
  // {
  //   path: "/tables",
  //   title: "Tables",
  //   type: "sub",
  //   collapse: "tables",
  //   icontype: "nc-icon nc-single-copy-04",
  //   children: [
  //     { path: "regular", title: "Regular Tables", ab: "RT" },
  //     { path: "extended", title: "Extended Tables", ab: "ET" },
  //     { path: "datatables.net", title: "Datatables.net", ab: "DT" },
  //   ],
  // },
  // {
  //   path: "/maps",
  //   title: "Maps",
  //   type: "sub",
  //   collapse: "maps",
  //   icontype: "nc-icon nc-pin-3",
  //   children: [
  //     { path: "google", title: "Google Maps", ab: "GM" },
  //     { path: "fullscreen", title: "Full Screen Map", ab: "FSM" },
  //     { path: "vector", title: "Vector Map", ab: "VM" },
  //   ],
  // },
  // {
  //   path: "/widgets",
  //   title: "Widgets",
  //   type: "link",
  //   icontype: "nc-icon nc-box",
  // },
  // {
  //   path: "/charts",
  //   title: "Charts",
  //   type: "link",
  //   icontype: "nc-icon nc-chart-bar-32",
  // },
  // {
  //   path: "/calendar",
  //   title: "Calendar",
  //   type: "link",
  //   icontype: "nc-icon nc-calendar-60",
  // },

  // {
  //   path: "/pages",
  //   title: "Pages",
  //   collapse: "pages",
  //   type: "sub",
  //   icontype: "nc-icon nc-book-bookmark",
  //   children: [
  //     { path: "timeline", title: "Timeline Page", ab: "T" },
  //     { path: "user", title: "User Page", ab: "UP" },
  //     { path: "login", title: "Login Page", ab: "LP" },
  //     { path: "register", title: "Register Page", ab: "RP" },
  //     { path: "lock", title: "Lock Screen Page", ab: "LSP" },
  //   ],
  // },
];

@Component({
  moduleId: module.id,
  selector: "sidebar-cmp",
  templateUrl: "sidebar.component.html",
})
export class SidebarComponent {
  @Input() item = <RouteInfo>null;

  itemm;

  public userAdmin = true;
  userDetails;
  roleAs: string;
  constructor(
    private userService: UserService,
    private roleService: RoleService,
    private router: Router
  ) {}
  public menuItems: any[];
  isNotMobileMenu() {
    if (window.outerWidth > 991) {
      return false;
    }
    return true;
  }

  ngOnInit() {
    this.listItem();
    this.refreshRoleList();
    this.userService.isAdmin();
    this.menuItems = ROUTES.filter((menuItem) => menuItem);
    this.userService.getUserProfile().subscribe(
      (res) => {
        this.userDetails = res["user"];
      },
      (err) => {
        console.log(err);
      }
    );

    if (this.isAdmin() === false && this.item?.title === "Dashboard") {
      //this.ROUTES.title ==true
      this.userAdmin = false;
    }
  }
  ngAfterViewInit() {}

  refreshRoleList() {
    this.roleService.getrole().subscribe((res) => {
      this.roleService.role = res as Role;
    });
  }

  listItem() {
    this.roleService.getrole().subscribe((res) => {
      // this.roleService.itemss = res as string[];
      this.itemm = res as Role;
      // console.log(this.itemm);

      // console.log(this.Itemms);
    });
  }

  isAdmin(): boolean {
    this.roleAs = localStorage.getItem("role");
    if (this.roleAs === "admin") {
      return false;
    }
    return true;
  }

  public condition(item: String) {
    if (
      this.isAdmin() === false &&
      item === "Dashboard" &&
      this.itemm?.dashboard === "false"
    ) {
      //this.ROUTES.title ==true
      this.userAdmin = false;
    } else if (
      this.isAdmin() === false &&
      item === "user" &&
      this.itemm?.user === "false"
    ) {
      this.userAdmin = false;
    } else if (
      this.isAdmin() === false &&
      item === "Valeur" &&
      this.itemm?.valeur === "false"
    ) {
      this.userAdmin = false;
    } else if (
      this.isAdmin() === false &&
      item === "team" &&
      this.itemm?.team === "false"
    ) {
      this.userAdmin = false;
    } else if (
      this.isAdmin() === false &&
      item === "contact" &&
      this.itemm?.contact === "false"
    ) {
      this.userAdmin = false;
    } else if (
      this.isAdmin() === false &&
      item === "services" &&
      this.itemm?.services === "false"
    ) {
      this.userAdmin = false;
    } else if (
      this.isAdmin() === false &&
      item === "client" &&
      this.itemm?.client === "false"
    ) {
      this.userAdmin = false;
    } else return (this.userAdmin = true);
  }
}
