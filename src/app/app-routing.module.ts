import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./pages/home/home.component";

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    component: HomeComponent,
  },
  {
    path: "heroes",
    loadChildren: () =>
      import("./features/hero/hero.module").then((m) => m.HeroModule),
  },
  {
    path: "villains",
    loadChildren: () =>
      import("./features/villain/villain.module").then((m) => m.VillainModule),
  },
  {
    path: "**",
    redirectTo: "",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
