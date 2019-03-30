import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { User } from '../_models/user';
import { map } from 'rxjs/operators';

  @Injectable({
    providedIn: 'root'
  })

  export class AuthService {
    baseUrl = environment.apiUrl + 'api/auth/';
    user: User;
    loggedIn: boolean;


  constructor(private http: HttpClient) { }

  register(user: User) {
    return this.http.post(this.baseUrl + 'register', user);
  }

  login(model: any) {
    return this.http.post(this.baseUrl + 'login', model).pipe(
      map((response: any) => {
        const user = response;
        if (user) {
          this.loggedIn = true;
        }
      })
    );
  }
}
