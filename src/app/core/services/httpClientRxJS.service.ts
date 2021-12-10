import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { Observable } from "rxjs";

@Injectable()
export class HttpClientRxJSService {
  path = environment.apiUrlBase;

  constructor(private http: HttpClient) {}

  get<T>(url: string): Observable<T> {
    return this.http.get<T>(this.path + url);
  }

  deleteById(url: string, id: string): Observable<void> {
    return this.http.delete<void>(`${this.path + url}/${id}`);
  }

  post<T>(url: string, object: T): Observable<T> {
    return this.http.post<T>(this.path + url, object);
  }

  put<T>(url: string, id: string, object: T): Observable<void> {
    return this.http.put<void>(`${this.path + url}/${id}`, object);
  }
}
