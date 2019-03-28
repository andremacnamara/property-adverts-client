import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TestService {
baseUrl = environment.apiUrl;
constructor (private http: HttpClient) {}

dataService() {
  return this.http.get(this.baseUrl + 'api/test');
  }
}
