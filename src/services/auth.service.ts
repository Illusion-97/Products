import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentResponse: BehaviorSubject<LoginResponse | undefined> = new BehaviorSubject<LoginResponse | undefined>(undefined)
  useLocal: boolean = false;
  private readonly AUTH_KEY = 'AUTH_RESPONSE'

  get isLogged() {
    return !!this.currentResponse.value
  }

  get currentUser() {
    return this.currentResponse.value?.user
  }

  get isAdmin() {
    return this.currentUser?.admin
  }

  get currentName() {
    return this.currentUser?.username
  }

  get token() {
    return this.currentResponse.value?.accessToken
  }

  constructor(private http: HttpClient) {
    const authResponse = sessionStorage.getItem(this.AUTH_KEY) || localStorage.getItem(this.AUTH_KEY)
    if (authResponse) this.currentResponse.next(JSON.parse(authResponse))

    this.currentResponse.subscribe(response => {
        if(response)
          (this.useLocal ? localStorage : sessionStorage).setItem(this.AUTH_KEY, JSON.stringify(response))
        else {
          sessionStorage.clear()
          localStorage.clear()
        }
      }
    )
  }

  login(credentials: Credentials) {
    return this.http.post<LoginResponse>(`${environment.API_URL}login`, credentials)
    .pipe(tap(response => this.currentResponse.next(response)))
  }

  logout() {
    this.currentResponse.next(undefined)
  }

  register(user : User) {
    return this.http.post(`${environment.API_URL}register`, user)
  }
}

export interface Credentials {
  email: string,
  password: string
}

export interface User {
  id: number
  username: string
  email: string
  password: string
  admin?: boolean
}

export interface LoginResponse {
  accessToken: string,
  user: User
}
