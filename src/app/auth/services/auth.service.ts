import { computed, inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environments';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, of, tap, throwError } from 'rxjs';
import { LoginResponse, User } from '../interfaces/login-response.interfaces';
import { AuthStatus } from '../interfaces/AuthStatus.enum';
import { checkTokenResponse } from '../interfaces/check-token.response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private api = `/api`

  private readonly baseUrl: string = environment.baseUrl;
  private http = inject(HttpClient);

  private _currentUser = signal<User|null>(null);
  private _autStatus = signal<AuthStatus>(AuthStatus.cheking);

  public currentUser = computed(() => this._currentUser());
  public autStatus = computed(() => this._autStatus());

  constructor() { }

  private setAuthenticatetion(user: User, token:string): boolean {
    this._currentUser.set(user);
    this._autStatus.set(AuthStatus.authenticated);
    localStorage.setItem('token', token);

    return true;
  }

  login(email:string,password: string): Observable<boolean>{
    const url = `${this.baseUrl}${this.api}/Auth/login`
    const body = {email, password};

    return this.http.post<LoginResponse>(url, body)
    .pipe(
      map(({user, token}) => this.setAuthenticatetion(user, token)),
      catchError(err => throwError(() => err.error.message))
    )
  }

  checkAuthStatus(): Observable<boolean>{
    const url = `${this.baseUrl}/Auth/validate-token`;
    const token = localStorage.getItem('token');

    if(!token) return of(false);

    const headers = new HttpHeaders()
    .set('Authorization', `Bearer ${token}`);

    return this.http.get<checkTokenResponse>(url, {headers})
    .pipe(
      map(({user, token}) => this.setAuthenticatetion(user, token)),
      catchError(() => {
        this._autStatus.set(AuthStatus.noAuthenticated)
        return of(false)
      })
    )
  }
}
