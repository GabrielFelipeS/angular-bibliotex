import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BaseSearchService<T> {

  constructor(protected http: HttpClient, protected baseUrl: string ) { }

  search(query: string, headers?: HttpHeaders): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}?query=${query}`, { headers }).pipe(
      catchError(this.handleError)
    )
  }

  protected handleError(error: any) {
    console.error(error)
    return throwError(() => new Error(error))
  }
}
