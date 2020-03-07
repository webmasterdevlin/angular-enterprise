import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { NavBarComponent } from "./shared/components/nav-bar/nav-bar.component";
import { CoreModule } from "./core/core.module";

@NgModule({
  declarations: [AppComponent, NavBarComponent],
  imports: [BrowserModule, CoreModule, AppRoutingModule, NgbModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
