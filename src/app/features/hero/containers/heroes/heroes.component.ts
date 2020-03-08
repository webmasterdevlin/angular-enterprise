import { Component, OnInit, OnDestroy } from "@angular/core";
import { Hero } from "../../hero.model";
import { HttpClientRxJSService } from "../../../../core/services/httpClientRxJS.service";
import { HttpErrorResponse } from "@angular/common/http";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { catchError } from "rxjs/operators";
import { SubSink } from "subsink";
import { Router } from "@angular/router";
import {
  trigger,
  state,
  style,
  animate,
  transition
} from "@angular/animations";

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
          opacity: 1
        })
      ),
      state(
        "closed",
        style({
          transform: "scale(0.01)",
          opacity: 0.01
        })
      ),
      transition("open => closed", [animate("2s")]),
      transition("closed => open", [animate("2s")])
    ])
  ]
})
export class HeroesComponent implements OnInit, OnDestroy {
  heroes: Hero[];
  isLoading = false;
  editingTracker = "0";
  itemForm: FormGroup;
  editedForm: FormGroup;
  isOpen = false;

  private subs = new SubSink();

  constructor(
    private rxjsService: HttpClientRxJSService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formBuilderInit();
    this.fetchHeroes();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  toggle() {
    this.isOpen = !this.isOpen;
  }

  fetchHeroes() {
    this.isLoading = true;

    this.subs.sink = this.rxjsService.getHeroes().subscribe(
      data => (this.heroes = data),
      (err: HttpErrorResponse) => {
        this.isLoading = false;
        console.log(err.statusText);
      },
      () => (this.isLoading = false)
    );
  }

  /**Pessimistic update */
  // removeHero(id: string) {
  //   this.isLoading = true;
  //   this.subs.sink = this.rxjsService.deleteHeroById(id).subscribe(
  //     () => (this.heroes = this.heroes.filter(h => h.id !== id)),
  //     (err: HttpErrorResponse) => {
  //       this.isLoading = false;
  //       console.log(err.message);
  //     },
  //     () => (this.isLoading = false)
  //   );
  // }

  /**Optimistic update */
  removeHero(id: string) {
    const prevData: Hero[] = [...this.heroes];
    this.heroes = this.heroes.filter(h => h.id !== id);
    this.subs.sink = this.rxjsService
      .deleteHeroById(id)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          console.log(err.statusText);
          return (this.heroes = prevData);
        })
      )
      .subscribe();
  }

  onSave() {
    this.isLoading = true;

    this.subs.sink = this.rxjsService.postHero(this.itemForm.value).subscribe(
      data => this.heroes.push(data),
      (err: HttpErrorResponse) => {
        this.isLoading = false;
        console.log(err.message);
      },
      () => {
        this.isLoading = false;
        this.itemForm.reset();
      }
    );
  }

  onUpdate() {
    const hero = this.editedForm.value;
    this.isLoading = true;
    this.subs.sink = this.rxjsService.putHero(hero).subscribe(
      () => {
        const index = this.heroes.findIndex(h => h.id === hero.id);
        this.heroes[index] = hero;
      },
      (err: HttpErrorResponse) => {
        this.isLoading = false;
        console.log(err.statusText);
      },
      () => (this.isLoading = false)
    );
  }

  goToHeroDetail(id: string) {
    this.router.navigateByUrl("/heroes/hero-detail/" + id);
  }

  private formBuilderInit(): void {
    this.itemForm = this.fb.group({
      firstName: ["", [Validators.required, Validators.minLength(4)]],
      lastName: ["", [Validators.required, Validators.minLength(4)]],
      house: [""],
      knownAs: [""]
    });

    this.editedForm = this.fb.group({
      id: [""],
      firstName: ["", [Validators.required, Validators.minLength(4)]],
      lastName: ["", [Validators.required, Validators.minLength(4)]],
      house: [""],
      knownAs: [""]
    });
  }
}
