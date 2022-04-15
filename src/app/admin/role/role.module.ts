import { FormsModule } from "@angular/forms";
import { RoleRoutes } from "./role.routing";
import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(RoleRoutes), FormsModule],
})
export class RoleModule {}
