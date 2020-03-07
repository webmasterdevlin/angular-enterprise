import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HeroesComponent } from "./containers/heroes/heroes.component";
import { HeroDetailComponent } from "./containers/hero-detail/hero-detail.component";
import { Routes, RouterModule } from "@angular/router";
const routes: Routes = [
  {
    path: "",
    component: HeroesComponent
  },
  {
    path: "hero-detail/:id",
    component: HeroDetailComponent
  }
];
@NgModule({
  declarations: [HeroesComponent, HeroDetailComponent],
  imports: [CommonModule, RouterModule.forChild(routes)]
})
export class HeroModule {}
