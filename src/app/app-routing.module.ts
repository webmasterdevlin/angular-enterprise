import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    redirectTo: "heroes",
    pathMatch: "full"
  },
  {
    path: "heroes",
    loadChildren: () =>
      import("./features/hero/hero.module").then(m => m.HeroModule)
  },
  {
    path: "**",
    redirectTo: ""
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
