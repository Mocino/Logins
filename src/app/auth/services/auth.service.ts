import { computed, inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';
import { LoginResponse, User } from '../interfaces/login-response.interfaces';
import { AuthStatus } from '../interfaces/AuthStatus.enum';

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

  login(email:string,password: string): Observable<boolean>{
    const url = `${this.baseUrl}${this.api}/Auth/login`
    const body = {email, password};

    console.log(body)
    return this.http.post<LoginResponse>(url, body)
    .pipe(
      tap(({user, token}) => {
        this._currentUser.set(user);
        this._autStatus.set(AuthStatus.authenticated);
        localStorage.setItem('token', token)
        console.log({email, token})
      }),
      map(()=>true)
    )
  }
}
