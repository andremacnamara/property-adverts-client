import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { User } from '../_models/user';

  @Injectable({
    providedIn: 'root'
  })

  export class AuthService {
    baseUrl = environment.apiUrl + 'api/auth/';
    user: User;

  constructor(private http: HttpClient) { }

  register(user: User) {
    return this.http.post(this.baseUrl + 'register', user);
  }
}
