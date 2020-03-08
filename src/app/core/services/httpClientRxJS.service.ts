import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { Observable } from "rxjs";
import { Hero } from "../../features/hero/hero.model";

@Injectable()
export class HttpClientRxJSService {
  heroPath = environment.apiUrlBase + "heroes";

  constructor(private http: HttpClient) {}

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroPath);
  }

  deleteHeroById(id: string): Observable<void> {
    return this.http
      .delete<void>(`${this.heroPath}/${id}`)
      .pipe
      // TODO: catchError()
      ();
  }

  postHero(createdHero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroPath, createdHero);
  }

  // TODO: put
}
