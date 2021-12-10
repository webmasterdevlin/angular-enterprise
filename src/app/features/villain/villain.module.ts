import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { VillainsComponent } from "./containers/villains/villains.component";
import { VillainDetailComponent } from "./containers/villain-detail/villain-detail.component";
import { Routes, RouterModule } from "@angular/router";
import { SharedModule } from "src/app/shared/shared.module";

const routes: Routes = [
  {
    path: "",
    component: VillainsComponent,
  },
  {
    path: "villain-detail/:bar",
    component: VillainDetailComponent,
  },
];

@NgModule({
  declarations: [VillainsComponent, VillainDetailComponent],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
})
export class VillainModule {}
