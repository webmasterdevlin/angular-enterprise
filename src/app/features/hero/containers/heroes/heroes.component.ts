import { Component, OnInit } from "@angular/core";
import { Hero } from "../../hero.model";
import { HttpClientRxJSService } from "../../../../core/services/httpClientRxJS.service";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: "app-heroes",
  templateUrl: "./heroes.component.html",
  styleUrls: ["./heroes.component.css"]
})
export class HeroesComponent implements OnInit {
  heroes: Hero[];
  isLoading = false;

  constructor(private rxjsService: HttpClientRxJSService) {}

  ngOnInit(): void {
    this.fetchHeroes();
  }

  fetchHeroes() {
    this.isLoading = true;
    this.rxjsService.getHeroes().subscribe(
      data => (this.heroes = data),
      (err: HttpErrorResponse) => {
        this.isLoading = false;
        console.log(err.statusText);
      },
      () => (this.isLoading = false)
    );
  }
}
