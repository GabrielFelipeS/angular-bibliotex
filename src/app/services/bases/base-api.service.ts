import { HttpClient, HttpHeaders } from '@angular/common/http';

import { catchError, Observable, throwError } from 'rxjs';

export abstract class BaseApiService<T> {

  constructor(protected http: HttpClient, protected baseUrl: string) { }

  findAll(headers?: HttpHeaders): Observable<T>  {
    return this.http.get<T>(`${this.baseUrl}/`, {headers}).pipe(
      catchError(this.handleError)
    );
  }

  find(id: number, headers?: HttpHeaders): Observable<T>  {
    return this.http.get<T>(`${this.baseUrl}/${id}`, {headers}).pipe(
      catchError(this.handleError)
    );
  }

  create(data: T, headers?: HttpHeaders): Observable<T>  {
    return this.http.post<T>(`${this.baseUrl}/`, {data}, {headers}).pipe(
      catchError(this.handleError)
    );
  }

  update(data: T, headers?: HttpHeaders): Observable<T>  {
    return this.http.put<T>(`${this.baseUrl}/`, {data}, {headers}).pipe(
      catchError(this.handleError)
    );
  }

  patch(data: T, headers?: HttpHeaders): Observable<T>  {
    return this.http.patch<T>(`${this.baseUrl}/`, {data}, {headers}).pipe(
      catchError(this.handleError)
    );
  }

  delete(id: number, headers?: HttpHeaders): Observable<void>  {
    return this.http.delete<void>(`${this.baseUrl}/${id}`, {headers}).pipe(
      catchError(this.handleError)
    );
  }

  protected handleError(error: any) {
    console.error(error)
    return throwError(() => new Error(error))
  }
}
