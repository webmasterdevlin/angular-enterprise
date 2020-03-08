import { Component, OnInit, OnDestroy } from "@angular/core";
import { Hero } from "../../hero.model";
import { HttpClientRxJSService } from "../../../../core/services/httpClientRxJS.service";
import { HttpErrorResponse } from "@angular/common/http";
import { Subscription } from "rxjs";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { catchError } from "rxjs/operators";

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
  itemForm: FormGroup;

  constructor(
    private rxjsService: HttpClientRxJSService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.formBuilderInit();
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

  removeHero(id: string) {
    this.isLoading = true;
    this.rxjsService.deleteHeroById(id).subscribe(
      () => (this.heroes = this.heroes.filter(h => h.id !== id)),
      (err: HttpErrorResponse) => {
        this.isLoading = false;
        console.log(err.message);
      },
      () => (this.isLoading = false)
    );
  }

  /**Optimistic update */
  // removeHero(id: string) {
  //   const prevData: Hero[] = [...this.heroes];

  //   this.heroes = this.heroes.filter(h => h.id !== id);
  //   this.rxjsService.deleteHeroById(id + 2312).pipe(
  //     catchError((err: HttpErrorResponse) => {
  //       console.log(err.statusText);
  //       alert("hello");
  //       return (this.heroes = prevData);
  //     })
  //   );
  // }

  onSave() {
    
  }

  onUpdate() {}

  goToHeroDetail(id: string) {}

  private formBuilderInit(): void {
    this.itemForm = this.fb.group({
      firstName: ["", [Validators.required, Validators.minLength(4)]],
      lastName: ["", [Validators.required, Validators.minLength(4)]],
      house: [""],
      knownAs: [""]
    });
  }
}
