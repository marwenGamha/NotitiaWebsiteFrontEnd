import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UserrRoutes } from "./userr.routing";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(UserrRoutes), FormsModule],
})
export class UserrModule {}
