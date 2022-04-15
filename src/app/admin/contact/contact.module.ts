import { ContactRoutes } from "./contact.routing";
import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(ContactRoutes), FormsModule],
})
export class ContactModule {}
