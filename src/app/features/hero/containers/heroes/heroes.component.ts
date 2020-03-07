import { Component, OnInit, OnDestroy } from "@angular/core";
import { Hero } from "../../hero.model";
import { HttpClientRxJSService } from "../../../../core/services/httpClientRxJS.service";
import { HttpErrorResponse } from "@angular/common/http";
import { Subscription } from "rxjs";

@Component({
  selector: "app-heroes",
  templateUrl: "./heroes.component.html",
  styleUrls: ["./heroes.component.css"]
})
export class HeroesComponent implements OnInit, OnDestroy {
  heroes: Hero[];
  isLoading = false;
  sub: Subscription;
  editingTracker = "0";

  constructor(private rxjsService: HttpClientRxJSService) {}

  ngOnInit(): void {
    this.fetchHeroes();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  fetchHeroes() {
    this.isLoading = true;

    this.sub = this.rxjsService.getHeroes().subscribe(
      data => (this.heroes = data),
      (err: HttpErrorResponse) => {
        this.isLoading = false;
        console.log(err.statusText);
      },
      () => (this.isLoading = false)
    );
  }

  removeHero(id: string) {}
  onSave() {}
  onUpdate() {}

  goToHeroDetail(id: string) {}
}
