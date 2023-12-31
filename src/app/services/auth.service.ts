import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {tap} from "rxjs/operators";

import {environment} from "../../environments/environment";
import {Auth} from '../models/auth.model'
import {User} from "../models/user.model";
import {TokenService} from "./token.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = `${environment.API_URL}/api/v1/auth`

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) {
  }

  login(email: string, password: string) {
    return this.http.post<Auth>(`${this.apiUrl}/login`, {email, password})
    .pipe(
      tap((response => this.tokenService.saveToken(response.access_token)))
    )
  }

  // Sin interceptores
  // profile(token: string) {
  //   console.log(token)
  //   let headers = new HttpHeaders()
  //   headers = headers.set('Authorization', `Bearer ${token}`)
  //
  //   return this.http.get<User>(`https://api.escuelajs.co/api/v1/auth/profile`, {headers}
  //   )
  // }

  profile() {
    return this.http.get<User>(`${this.apiUrl}/profile`)
  }
}
