import { Component, OnInit } from "@angular/core";
import { Villain } from "../../villain.model";
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
  selector: "app-villains",
  templateUrl: "./villains.component.html",
  styleUrls: ["./villains.component.css"],
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
export class VillainsComponent implements OnInit {
  endpoint = "villains";
  villains: Villain[];
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
    this.fetchVillains();
  }

  toggle() {
    this.isOpen = !this.isOpen;
  }

  fetchVillains() {
    this.isLoading = true;

    this.rxjsService
      .get<Villain[]>(this.endpoint)
      .pipe(
        map((data) => (this.villains = data)),
        catchError((err: HttpErrorResponse) => of(err.message)),
        tap(() => (this.isLoading = false)),
        untilDestroyed(this)
      )
      .subscribe();
  }

  /**Optimistic update */
  removeVillain(id: string) {
    const prevData: Villain[] = [...this.villains];
    this.villains = this.villains.filter((h) => h.id !== id);
    this.rxjsService
      .deleteById(this.endpoint, id)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          this.villains = prevData;
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
        map((data) => (this.villains = [...this.villains, data])),
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
    const villain = this.editedForm.value;
    this.isLoading = true;

    this.rxjsService
      .put<Villain>(this.endpoint, villain.id, villain)
      .pipe(
        map(() => {
          const index = this.villains.findIndex((h) => h.id === villain.id);
          this.villains[index] = villain;
        }),
        catchError((err: HttpErrorResponse) => of(err.message)),
        tap(() => (this.isLoading = false)),
        untilDestroyed(this)
      )
      .subscribe();
  }

  async goToVillainDetail(id: string) {
    await this.router.navigateByUrl("/villains/villain-detail/" + id);
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
