import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ServicesRoutes } from "./services.routing";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(ServicesRoutes), FormsModule],
})
export class ServicesModule {}
