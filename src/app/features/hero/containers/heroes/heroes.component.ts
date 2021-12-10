import { Component, OnInit } from "@angular/core";
import { Hero } from "../../hero.model";
import { HttpClientRxJSService } from "../../../../core/services/httpClientRxJS.service";
import { HttpErrorResponse } from "@angular/common/http";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { catchError, map, tap } from "rxjs/operators";
import { Router } from "@angular/router";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from "@angular/animations";
import { of } from "rxjs";

@UntilDestroy() // for unsubscribing from observables
@Component({
  selector: "app-heroes",
  templateUrl: "./heroes.component.html",
  styleUrls: ["./heroes.component.css"],
  animations: [
    trigger("openClose", [
      state(
        "open",
        style({
          transform: "scale(1)",
          opacity: 1,
        })
      ),
      state(
        "closed",
        style({
          transform: "scale(0.01)",
          opacity: 0.01,
        })
      ),
      transition("open => closed", [animate("1s")]),
      transition("closed => open", [animate("1s")]),
    ]),
  ],
})
export class HeroesComponent implements OnInit {
  endpoint = "heroes";
  heroes: Hero[];
  isLoading = false;
  editingTracker = "0";
  itemForm: FormGroup;
  editedForm: FormGroup;
  isOpen = false;

  constructor(
    private rxjsService: HttpClientRxJSService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formBuilderInit();
    this.fetchHeroes();
  }

  toggle() {
    this.isOpen = !this.isOpen;
  }

  fetchHeroes() {
    this.isLoading = true;

    this.rxjsService
      .get<Hero[]>(this.endpoint)
      .pipe(
        map((data) => (this.heroes = data)),
        catchError((err: HttpErrorResponse) => of(err.message)),
        tap(() => (this.isLoading = false)),
        untilDestroyed(this)
      )
      .subscribe();
  }

  /**Optimistic update */
  removeHero(id: string) {
    const prevData: Hero[] = [...this.heroes];
    this.heroes = this.heroes.filter((h) => h.id !== id);
    this.rxjsService
      .deleteById(this.endpoint, id)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          this.heroes = prevData;
          return of(err.message);
        }),
        untilDestroyed(this)
      )
      .subscribe();
  }

  onSave() {
    this.isLoading = true;

    this.rxjsService
      .post(this.endpoint, this.itemForm.value)
      .pipe(
        map((data) => (this.heroes = [...this.heroes, data])),
        catchError((err: HttpErrorResponse) => of(err.message)),
        tap(() => {
          this.isLoading = false;
          this.itemForm.reset();
        }),
        untilDestroyed(this)
      )
      .subscribe();
  }

  onUpdate() {
    const hero = this.editedForm.value;
    this.isLoading = true;

    this.rxjsService
      .put<Hero>(this.endpoint, hero.id, hero)
      .pipe(
        map(() => {
          const index = this.heroes.findIndex((h) => h.id === hero.id);
          this.heroes[index] = hero;
        }),
        catchError((err: HttpErrorResponse) => of(err.message)),
        tap(() => (this.isLoading = false)),
        untilDestroyed(this)
      )
      .subscribe();
  }

  async goToHeroDetail(id: string) {
    await this.router.navigateByUrl("/heroes/hero-detail/" + id);
  }

  private formBuilderInit(): void {
    this.itemForm = this.fb.group({
      firstName: ["", [Validators.required, Validators.minLength(4)]],
      lastName: ["", [Validators.required, Validators.minLength(4)]],
      house: [""],
      knownAs: [""],
    });

    this.editedForm = this.fb.group({
      id: [""],
      firstName: ["", [Validators.required, Validators.minLength(4)]],
      lastName: ["", [Validators.required, Validators.minLength(4)]],
      house: [""],
      knownAs: [""],
    });
  }
}
