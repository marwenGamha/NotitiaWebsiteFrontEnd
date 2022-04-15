import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TeamRoutes } from "./team.routing";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(TeamRoutes), FormsModule],
})
export class TeamModule {}
