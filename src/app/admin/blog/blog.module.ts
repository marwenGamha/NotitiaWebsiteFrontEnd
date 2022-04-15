import { FormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { BlogRoutes } from "./blog.routing";

@NgModule({
  imports: [CommonModule, RouterModule.forChild(BlogRoutes), FormsModule],
  declarations: [],
})
export class BlogModule {}
