import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BaseApiService } from "./base-api.service";
import { catchError, Observable } from "rxjs";

export abstract class BasePaginationService<T> extends BaseApiService<T>{

 constructor(protected override http: HttpClient, protected override baseUrl: string) {
  super(http, baseUrl)
 }

 page(page: number = 0,size: number = 10, sort?: string ,headers?: HttpHeaders): Observable<T> {
  const sortParam = sort ? `&sort=${sort}` : ''

   return this.http.get<T>(`${this.baseUrl}?page=${page}&size=${size}${sortParam}`, {headers}).pipe(
      catchError(this.handleError)
    );
  }
}
