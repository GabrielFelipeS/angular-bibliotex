import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { catchError, map, of } from 'rxjs';

interface KeycloakToken  {
  access_token: string
  refresh_token: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  keycloakUrl = `${environment.keycloakUri}/realms/${environment.realms}/protocol/openid-connect/token`;
  clientId = environment.client_id

  constructor(private _http: HttpClient) { }

  get refreshToken() {
    return localStorage.getItem("bibliotex_refresh_token") || ""
  }

  get accessToken() {
    return localStorage.getItem("bibliotex_access_token") || ""
  }

  private setToken(response: KeycloakToken) {
    console.group(response)
    console.group(response.access_token)
    console.group(response.refresh_token)

    localStorage.setItem("bibliotex_refresh_token", response.refresh_token)
    localStorage.setItem("bibliotex_access_token", response.access_token)
  }

  clear() {
    localStorage.removeItem("bibliotex_refresh_token")
    localStorage.removeItem("bibliotex_access_token")
  }

  authTokenWithCode(code: string) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });

    const body = new URLSearchParams();
    body.set('grant_type', 'authorization_code');
    body.set('client_id', this.clientId);
    body.set('code', code);
    body.set('redirect_uri', 'http://localhost:4200/callback');

    console.table(body)
    console.table(this.keycloakUrl)

    return this._http
      .post<KeycloakToken>(this.keycloakUrl, body.toString(), {headers})
      .pipe(
        map(response => {
          console.group(response)
          this.setToken(response)
          return { success: true, message: "Sucesso ao realizar login" }
        })
        ,catchError((error) => {
          console.group(error)
          return of( { success: false, message: "Falha ao realizar login" })
        })
      )
  }

  login(username: string, password: string) {
    const body = new URLSearchParams();
    body.set('grant_type', 'password');
    body.set('client_id', this.clientId);
    body.set('username', username);
    body.set('password', password);

    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });

    return this._http.post<KeycloakToken>(this.keycloakUrl, body.toString(), { headers })
    .pipe(
      map(response => {
        this.setToken(response)
        return { success: true, message: "Sucesso ao realizar login" }
      })
      ,catchError((error) => {
        console.group(error)
        return of( { success: false, message: "Falha ao realizar login" })
      })
    )
  }
}
