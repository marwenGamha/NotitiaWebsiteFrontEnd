import { FormsModule } from "@angular/forms";
import { ClientRoutes } from "./client.routing";
import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(ClientRoutes), FormsModule],
})
export class ClientModule {}
