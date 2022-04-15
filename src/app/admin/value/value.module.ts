import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ValueRoutes } from "./value.routing";

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(ValueRoutes), FormsModule],
})
export class ValueModule {}
